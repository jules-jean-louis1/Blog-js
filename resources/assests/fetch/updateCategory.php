<?php
session_start();
require_once '../Classes/Articles.php';


if (isset($_GET['name'])) {
    $name = htmlspecialchars($_GET['name']);
    $id = intval($_GET['id']);

    $article = new Articles();
    $article->updateCategories($name, $id);

    if ($article) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'La catégorie a bien été modifiée']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
    }
}
?>