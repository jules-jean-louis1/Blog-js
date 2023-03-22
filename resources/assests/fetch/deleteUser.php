<?php
session_start();
require_once '../Classes/Users.php';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    if ($id == 2) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Vous ne pouvez pas supprimer l\'administrateur']);
        die();
    }
    $users = new Users();
    $users->deleteUser($id);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'L\'utilisateur a bien été supprimé']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
}
?>
