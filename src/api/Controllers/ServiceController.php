<?php
declare(strict_types=1);

namespace Controllers;

use PDO;
use Utils\Response;

#[AllowDynamicProperties]
class ServiceController {
    public function __construct(private PDO $db) {}

    public function getSlots(): void {
        $stmt = $this->db->query("SELECT * FROM ac_service_slot ORDER BY service_date DESC");
        Response::json($stmt->fetchAll(), 200, 'Service slots fetched successfully.');
    }

    public function createSlot(array $input): void {
        $stmt = $this->db->prepare("INSERT INTO ac_service_slot (technician_id, customer_id, service_date, day_of_week, start_time, end_time, service_type) VALUES (:t, :c, :sd, :dow, :st, :et, :stype)");
        $stmt->execute([
            't'     => $input['technician_id'] ?? 1,
            'c'     => $input['customer_id'] ?? 1,
            'sd'    => $input['service_date'] ?? date('Y-m-d'),
            'dow'   => $input['day_of_week'] ?? 'Monday',
            'st'    => $input['start_time'] ?? '10:00:00',
            'et'    => $input['end_time'] ?? '11:00:00',
            'stype' => $input['service_type'] ?? 'Maintenance'
        ]);
        Response::json(['slot_id' => $this->db->lastInsertId()], 201, 'Service slot booked successfully.');
    }
}