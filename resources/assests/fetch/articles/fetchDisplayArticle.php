<?php

session_start();
require_once '../../Classes/Articles.php';


if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $article = new Articles();
    $articles = $article->getSpecificArticle($id);
    header('Content-Type: application/json');
    if (empty($articles)) {
        echo json_encode(['status' => 'empty', 'message' => 'Aucun article trouvé']);
    } else {
        echo json_encode(['status' => 'success', 'articles' => $articles]);
    }
}