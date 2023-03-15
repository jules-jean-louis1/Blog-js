<?php
session_start();
require_once '../../Classes/Articles.php';

if (isset($_GET['page'])) {
    $page = intval($_GET['page']);
}

if (isset($_GET['category2'])) {
    $category = htmlspecialchars($_GET['category2']);
}

if (isset($_GET['order'])) {
    $order = htmlspecialchars($_GET['order']);
}

$article = new Articles();
$articles = $article->getArticles($page, $category, $order);

if ($articles) {
    header("Content-Type: application/json"); // indique que la réponse est au format JSON
    echo json_encode(['status' => 'find', 'articles' => $articles]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Aucun article trouvé']);
}


?>