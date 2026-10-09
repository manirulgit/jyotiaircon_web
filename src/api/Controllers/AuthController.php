<?php
declare(strict_types=1);

namespace Controllers;

use PDO;
use Utils\JWT;
use Utils\Response;

#[AllowDynamicProperties]
class AuthController {
    public function __construct(private PDO $db) {}

    public function register(array $input): void {
        $username = trim((string)($input['username'] ?? ''));
        $password = trim((string)($input['password'] ?? ''));
        $firstName = trim((string)($input['first_name'] ?? ''));
        $lastName = trim((string)($input['last_name'] ?? ''));
        $mobileNumber = trim((string)($input['mobile_number'] ?? ''));

        if (empty($username) || empty($password) || empty($firstName) || empty($lastName) || empty($mobileNumber)) {
            Response::json(null, 400, 'All registration fields are required.');
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $this->db->prepare("INSERT INTO ac_register (username, password, first_name, last_name, mobile_number) VALUES (:u, :p, :f, :l, :m)");
        try {
            $stmt->execute(['u' => $username, 'p' => $hashedPassword, 'f' => $firstName, 'l' => $lastName, 'm' => $mobileNumber]);
            Response::json(['user_id' => $this->db->lastInsertId()], 201, 'User registered successfully.');
        } catch (\PDOException $e) {
            Response::json(null, 400, 'Username already exists.');
        }
    }

    public function login(array $input): void {
        $username = trim((string)($input['username'] ?? ''));
        $password = trim((string)($input['password'] ?? ''));

        if (empty($username) || empty($password)) {
            Response::json(null, 400, 'Username and password are required.');
        }

        $stmt = $this->db->prepare("SELECT * FROM ac_register WHERE username = :username LIMIT 1");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'] ?? '')) {
            $userId = (int)$user['user_id'];

            $accessToken  = JWT::generate(['user_id' => $userId, 'type' => 'access'], 900);
            $refreshToken = JWT::generate(['user_id' => $userId, 'type' => 'refresh'], 604800);

            $expiresAt = date('Y-m-d H:i:s', time() + 604800);
            $saveStmt = $this->db->prepare("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (:u, :t, :e)");
            $saveStmt->execute(['u' => $userId, 't' => $refreshToken, 'e' => $expiresAt]);

            Response::json([
                'access_token'  => $accessToken,
                'refresh_token' => $refreshToken,
                'expires_in'    => 900,
                'user'          => ['id' => $userId, 'username' => $user['username']]
            ], 200, 'Login successful.');
        }

        Response::json(null, 401, 'Invalid credentials.');
    }

    public function refresh(array $input): void {
        $refreshToken = trim((string)($input['refresh_token'] ?? ''));

        if (empty($refreshToken)) {
            Response::json(null, 400, 'Refresh Token is required.');
        }

        $tokenData = JWT::verify($refreshToken);
        if (!$tokenData || ($tokenData['type'] ?? '') !== 'refresh') {
            Response::json(null, 401, 'Invalid or expired refresh token.');
        }

        $stmt = $this->db->prepare("SELECT * FROM refresh_tokens WHERE token = :t AND expires_at > NOW() LIMIT 1");
        $stmt->execute(['t' => $refreshToken]);
        if (!$stmt->fetch()) {
            Response::json(null, 401, 'Refresh token revoked or expired.');
        }

        $newAccessToken = JWT::generate(['user_id' => $tokenData['user_id'], 'type' => 'access'], 900);

        Response::json(['access_token' => $newAccessToken, 'expires_in' => 900], 200, 'Token refreshed successfully.');
    }

    public function logout(array $input): void {
        $refreshToken = trim((string)($input['refresh_token'] ?? ''));

        if (!empty($refreshToken)) {
            $stmt = $this->db->prepare("DELETE FROM refresh_tokens WHERE token = :t");
            $stmt->execute(['t' => $refreshToken]);
        }

        Response::json(null, 200, 'Logged out successfully.');
    }
}