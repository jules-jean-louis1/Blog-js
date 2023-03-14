<?php
session_start();
require_once '../../Classes/Users.php';

$id = $_SESSION['id'];
$users = new Users();
$row = $users->getUsersInfos($id);
header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'message' => 'Utilisateur trouvé', 'infos' => $row]);


?>