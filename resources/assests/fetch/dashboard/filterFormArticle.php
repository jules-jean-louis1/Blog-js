<?php
session_start();
require_once '../../Classes/Articles.php';


if (isset($_GET['login'])) {
    $login = $_GET['login'];
    $category = $_GET['category'];

    $article = new Articles();
    $articles = $article->articlesDashboard($login, $category);
    if (empty($articles)) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Aucun article ecrit par cette utilisateur dans cette catégorie']);
    } else {
        header('Content-Type: application/json');
        echo $articles;
    }
}