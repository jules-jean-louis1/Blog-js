<?php

require_once '../Classes/Users.php';
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $users = new Users();

    if ($users->deleteUser($id)) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'L\'utilisateur a bien été supprimé']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
    }
}
?>
