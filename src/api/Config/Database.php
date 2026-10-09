<?php
declare(strict_types=1);

namespace Config;

use PDO;
use PDOException;
use Utils\Response;

#[AllowDynamicProperties]
class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            try {
                self::$instance = new PDO(
                    "mysql:host=localhost;port=3306;dbname=jyotiairconditioning_new;charset=utf8mb4",
                    "jyotiairconditioning_new",
                    "Mz6~@P_WP57d_h$!",
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false
                    ]
                );
            } catch (PDOException $e) {
                Response::json(null, 500, "Database connection failed: " . $e->getMessage());
            }
        }
        return self::$instance;
    }
}