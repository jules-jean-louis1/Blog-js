<?php
require_once '../Classes/Users.php';
$users = new Users();
/*$row2 = $users->getAllUsers();
print_r($row2);*/
$row = $users->getAllUsersInfos();
print_r($row);
?>
