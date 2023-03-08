<?php
require_once '../Classes/Users.php';

if (isset($_GET['id']) && isset($_GET['droits'])) {
    $id = intval($_GET['id']);
    $droits = htmlspecialchars($_GET['droits']);

    $users = new Users();
    $users->updateDroits($id, $droits);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'Les droits ont bien été modifiés']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
}

?>