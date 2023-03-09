<?php
session_start();
require_once '../Classes/Articles.php';

if (isset($_GET['query'])) {
    $query = htmlspecialchars($_GET['query']);
    $article = new Articles();
    $articles = $article->searchArticle($query);
    header('Content-Type: application/json');
    if (empty($articles)) {
        echo json_encode(['status' => 'empty', 'message' => 'Aucun article trouvé']);
    } else {
        echo json_encode(['status' => 'success', 'articles' => $articles]);
    }
}

?>