<?php
session_start();
require_once '../Classes/Users.php';

$id = $_SESSION['id'];
$users = new Users();
$users->deleteUser($id);