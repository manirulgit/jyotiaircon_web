<?php
$password = 'Admin@123'; // Replace with your desired plain text password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

echo "Plain Password: " . $password . "\n";
echo "Bcrypt Hash:     " . $hashedPassword . "\n";