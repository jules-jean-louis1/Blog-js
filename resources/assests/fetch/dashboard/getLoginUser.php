<?php
session_start();
require_once '../../Classes/Users.php';

$user = new Users();
$login = $user->getLoginUser();
echo $login;
?>
