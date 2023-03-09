<?php
session_start();
require_once '../Classes/Articles.php';

if (isset($_POST['category'])) {
    $category = htmlspecialchars($_POST['category']);
    $page = intval($_POST['page']);
    $limit = intval($_POST['limit']);

    if (!empty($category) && !empty($page) && !empty($limit)) {
        $article = new Articles();
        $articles = $article->getArticles($page, $limit, $category);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'articles' => $articles]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'empty', 'message' => 'Veuillez remplir tous les champs']);
    }
}
