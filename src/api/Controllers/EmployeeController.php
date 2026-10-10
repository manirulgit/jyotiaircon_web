<?php
declare(strict_types=1);

namespace Controllers;

use PDO;
use PDOException;
use Utils\Response;

#[AllowDynamicProperties]
class EmployeeController {
    public function __construct(private PDO $db) {}

    public function getAll(): void {
        $page = max(1, (int)($_GET['page'] ?? 1));
        $size = min(100, max(1, (int)($_GET['size'] ?? $_GET['limit'] ?? 10)));
        $offset = ($page - 1) * $size;

        $totalRecords = (int)$this->db->query("SELECT COUNT(*) FROM ac_employee")->fetchColumn();
        $stmt = $this->db->prepare(
            "SELECT employee_id, first_name, last_name, email, phone, designation, created_at
             FROM ac_employee
             ORDER BY employee_id DESC
             LIMIT :size OFFSET :offset"
        );
        $stmt->bindValue(':size', $size, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        Response::json([
            'employees' => $stmt->fetchAll(),
            'total_count' => $totalRecords,
            'page' => $page,
            'size' => $size
        ], 200, 'Employees fetched successfully here by manirul here');
    }

    public function getById(int $id): void {
        if ($id < 1) {
            Response::json(null, 400, 'A valid employees1111 ID is required for validation.');
        }

        $stmt = $this->db->prepare(
            "SELECT employee_id, first_name, last_name, email, phone, designation, created_at
             FROM ac_employee
             WHERE employee_id = :employee_id
             LIMIT 1"
        );
        $stmt->execute(['employee_id' => $id]);
        $employee = $stmt->fetch();

        if (!$employee) {
            Response::json(null, 404, 'Employee not found.');
        }

        Response::json($employee, 200, 'Employee fetched successfully.');
    }

    public function create(array $input): void {
        $firstName = trim((string)($input['first_name'] ?? ''));
        $lastName = trim((string)($input['last_name'] ?? ''));
        $email = trim((string)($input['email'] ?? ''));
        $phone = trim((string)($input['phone'] ?? ''));
        $designation = trim((string)($input['designation'] ?? ''));

        if ($firstName === '' || $email === '' || $phone === '' || $designation === '') {
            Response::json(null, 400, 'First name, email, phone, and designation are required.');
        }

        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            Response::json(null, 400, 'Please provide a valid email address.');
        }

        try {
            $stmt = $this->db->prepare(
                "INSERT INTO ac_employee (first_name, last_name, email, phone, designation)
                 VALUES (:first_name, :last_name, :email, :phone, :designation)"
            );
            $stmt->execute([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'phone' => $phone,
                'designation' => $designation
            ]);

            Response::json([
                'employee_id' => $this->db->lastInsertId()
            ], 201, 'Employee added successfully.');
        } catch (PDOException $e) {
            $driverErrorCode = (int)($e->errorInfo[1] ?? 0);
            $sqlState = (string)($e->errorInfo[0] ?? $e->getCode());

            if ($driverErrorCode === 1062) {
                Response::json(null, 409, 'An employee with this email or another unique field already exists.');
            }

            error_log('Employee creation failed: ' . $e->getMessage());

            if ($driverErrorCode === 1048) {
                Response::json(null, 400, 'A required employee field is missing.');
            }

            if ($driverErrorCode === 1264 || $driverErrorCode === 1406) {
                Response::json(null, 422, 'One or more employee fields exceed the allowed length or value.');
            }

            if ($driverErrorCode === 1054 || $driverErrorCode === 1146) {
                Response::json(null, 500, 'Employee data could not be saved because the database schema is not configured correctly.');
            }

            Response::json(
                ['error_code' => $sqlState],
                500,
                'Unable to create employee because of a database error. Please contact support with the error code.'
            );
        }
    }

    public function update(int $id, array $input): void {
        if ($id < 1) {
            Response::json(null, 400, 'A valid employee ID is required.');
        }

        $firstName = trim((string)($input['first_name'] ?? ''));
        $lastName = trim((string)($input['last_name'] ?? ''));
        $email = trim((string)($input['email'] ?? ''));
        $phone = trim((string)($input['phone'] ?? ''));
        $designation = trim((string)($input['designation'] ?? ''));

        if ($firstName === '' || $email === '' || $phone === '' || $designation === '') {
            Response::json(null, 400, 'First name, email, phone, and designation are required.');
        }

        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            Response::json(null, 400, 'Please provide a valid email address.');
        }

        try {
            $stmt = $this->db->prepare(
                "UPDATE ac_employee
                 SET first_name = :first_name,
                     last_name = :last_name,
                     email = :email,
                     phone = :phone,
                     designation = :designation
                 WHERE employee_id = :employee_id"
            );
            $stmt->execute([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'phone' => $phone,
                'designation' => $designation,
                'employee_id' => $id
            ]);

            if ($stmt->rowCount() === 0) {
                $check = $this->db->prepare('SELECT 1 FROM ac_employee WHERE employee_id = :employee_id');
                $check->execute(['employee_id' => $id]);
                if (!$check->fetchColumn()) {
                    Response::json(null, 404, 'Employee not found.');
                }
            }

            Response::json(['employee_id' => $id], 200, 'Employee updated successfully.');
        } catch (PDOException $e) {
            $driverErrorCode = (int)($e->errorInfo[1] ?? 0);
            $sqlState = (string)($e->errorInfo[0] ?? $e->getCode());
            error_log('Employee update failed: ' . $e->getMessage());

            if ($driverErrorCode === 1062) {
                Response::json(null, 409, 'An employee with this email or another unique field already exists.');
            }

            if ($driverErrorCode === 1048) {
                Response::json(null, 400, 'A required employee field is missing.');
            }

            if ($driverErrorCode === 1264 || $driverErrorCode === 1406) {
                Response::json(null, 422, 'One or more employee fields exceed the allowed length or value.');
            }

            if ($driverErrorCode === 1054 || $driverErrorCode === 1146) {
                Response::json(null, 500, 'Employee data could not be updated because the database schema is not configured correctly.');
            }

            Response::json(
                ['error_code' => $sqlState],
                500,
                'Unable to update employee because of a database error. Please contact support with the error code.'
            );
        }
    }
}