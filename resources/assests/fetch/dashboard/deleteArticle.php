<?php
session_start();
require_once '../../Classes/Articles.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $article = new Articles();
    $delete = $article->deleteArticle($id);
    if ($delete) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Article supprimé']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la suppression de l\'article']);
    }
}