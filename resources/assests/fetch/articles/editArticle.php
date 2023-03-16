<?php
session_start();
require_once '../../Classes/Articles.php';

if (isset($_POST['title'])) {
    $id = intval($_POST['id']);
    $title = htmlspecialchars($_POST['title']);
    $content = htmlspecialchars($_POST['content']);
    $category = htmlspecialchars($_POST['categoryFormEdit']);
    if (!empty($title) && !empty($content) && !empty($category)) {
        $article = new Articles();
        $articles = $article->editArticle($id, $title, $content, $category);
        header('Content-Type: application/json');
            echo json_encode(['status' => 'success', 'message' => 'Article modifié avec succès']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'empty', 'message' => 'Veuillez remplir tous les champs']);
}
?>