<?php
session_start();
require_once '../../Classes/Users.php';


$id = $_SESSION['id'];
$avatar = $_SESSION['user_avatar'];
$users = new Users();
$users->deleteUser($id);

if ($id == 2) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Vous ne pouvez pas supprimer l\'administrateur']);
    die();
}

if ($avatar != 'default_avatar.png') {
    unlink('../../../images/avatar/' . $avatar);
}
session_destroy();
header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'message' => 'Votre compte a bien été supprimé']);