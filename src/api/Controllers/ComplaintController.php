<?php
declare(strict_types=1);

namespace Controllers;

use PDO;
use Utils\Response;

#[AllowDynamicProperties]
class ComplaintController {
    public function __construct(private PDO $db) {}

    public function getAll(): void {
        $stmt = $this->db->query("SELECT * FROM ac_complaint ORDER BY complaint_id DESC");
        Response::json($stmt->fetchAll(), 200, 'Complaints fetched successfully.');
    }

    public function create(array $input): void {
        $stmt = $this->db->prepare("INSERT INTO ac_complaint (customer_id, complaint_date, complaint_type, description) VALUES (:c, :cd, :ct, :d)");
        $stmt->execute([
            'c'  => $input['customer_id'] ?? 1,
            'cd' => $input['complaint_date'] ?? date('Y-m-d'),
            'ct' => $input['complaint_type'] ?? 'Product',
            'd'  => $input['description'] ?? ''
        ]);
        Response::json(['complaint_id' => $this->db->lastInsertId()], 201, 'Complaint registered successfully.');
    }
}