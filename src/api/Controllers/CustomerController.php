<?php
declare(strict_types=1);

namespace Controllers;

use PDO;
use Utils\Response;

#[AllowDynamicProperties]
class CustomerController {
    public function __construct(private PDO $db) {}

    public function getAll(): void {
        $stmt = $this->db->query("SELECT * FROM ac_customer ORDER BY customer_id DESC");
        Response::json($stmt->fetchAll(), 200, 'Customers fetched successfully.');
    }

    public function create(array $input): void {
        $stmt = $this->db->prepare("INSERT INTO ac_customer (full_name, email, phone, address, purchase_date, ac_model, total_price) VALUES (:f, :e, :p, :a, :pd, :m, :tp)");
        $stmt->execute([
            'f'  => $input['full_name'] ?? '',
            'e'  => $input['email'] ?? '',
            'p'  => $input['phone'] ?? '',
            'a'  => $input['address'] ?? '',
            'pd' => $input['purchase_date'] ?? date('Y-m-d'),
            'm'  => $input['ac_model'] ?? '',
            'tp' => $input['total_price'] ?? 0.00
        ]);
        Response::json(['customer_id' => $this->db->lastInsertId()], 201, 'Customer added successfully.');
    }
}