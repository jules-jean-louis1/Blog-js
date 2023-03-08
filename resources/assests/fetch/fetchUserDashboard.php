<?php
require_once '../Classes/Users.php';
$users = new Users();
$row = $users->getAllUsers();
print_r($row);
?>
