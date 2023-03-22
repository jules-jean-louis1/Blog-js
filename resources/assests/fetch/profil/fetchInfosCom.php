<?php
session_start();
require_once '../../Classes/Users.php';

$id = $_SESSION['id'];

$users = new Users();
$infos = $users->displayInfosUser($id);

print_r($infos);
?>
