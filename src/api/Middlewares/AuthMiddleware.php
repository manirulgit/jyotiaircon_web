<?php
declare(strict_types=1);

namespace Middlewares;

use Utils\JWT;
use Utils\Response;

#[AllowDynamicProperties]
class AuthMiddleware {
    public static function authenticate(): array {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            Response::json(null, 401, 'Unauthorized: Access token missing or malformed.');
        }

        $userData = JWT::verify($matches[1] ?? '');

        if (!$userData || ($userData['type'] ?? '') !== 'access') {
            Response::json(null, 401, 'Unauthorized: Invalid or expired access token.');
        }

        return $userData;
    }
}