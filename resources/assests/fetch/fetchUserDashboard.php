<?php
require_once '../Classes/Users.php';
$users = new Users();
$row = $users->getAllUsersInfos();
print_r($row);
?>
