<?php
// api/test_db.php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

try {
    $dsn = "mysql:host=localhost;port=3306;dbname=jyotiairconditioning_new;charset=utf8mb4";
    $username = "jyotiairconditioning_new";
    $password = "Mz6~@P_WP57d_h$!";

    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    header('Content-Type: application/json');
    echo json_encode([
        "success" => true,
        "message" => "Database connection successful!",
        "server_info" => $pdo->getAttribute(PDO::ATTR_SERVER_INFO)
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        "success" => false,
        "message" => "Database Connection Failed: " . $e->getMessage()
    ]);
}