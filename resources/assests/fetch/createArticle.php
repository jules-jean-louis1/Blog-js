<?php
session_start();
require_once '../Classes/Articles.php';


if (isset($_POST['title'])) {
    $title = htmlspecialchars($_POST['title']);
    $content = htmlspecialchars($_POST['content']);
    $category = intval($_POST['category']);
    $id = $_SESSION['id'];

    if ($_SESSION['droits'] === 'administrateur' || $_SESSION['droits'] === 'modérateur') {
        if (!empty($title) && !empty($content) && !empty($category)) {
            $article = new Articles();
            $article->createArticle($title, $content, $category, $id);
            header('Content-Type: application/json');
            echo json_encode(['status' => 'success', 'message' => 'Article créé avec succès']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'empty', 'message' => 'Veuillez remplir tous les champs']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Vous n\'avez pas les droits pour créer un article']);
    }
}
?>
