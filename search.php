<?php
session_start();
require_once 'resources/assests/Classes/Comments.php';


if (isset($_POST['comment'])) {
    $comment_id = intval($_POST['comment_id']);
    $content = htmlspecialchars($_POST['comment']);
    $idArticle = intval($_POST['article_id']);
    $user_id = $_SESSION['id'];

    if (!empty($content)) {
        $comment = new Comments();
        $comments = $comment->addComment($comment_id, $content, $idArticle, $user_id);
        header('Content-Type: application/json');
        if ($comments) {
            echo json_encode(['status' => 'error', 'comments' => 'Une erreur est survenue']);
        } else {
            echo json_encode(['status' => 'success', 'message' => 'Commentaire ajouté avec succès']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'empty', 'message' => 'Veuillez remplir tous les champs']);
    }
    die();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="resources/js/searchArticle.js"></script>
    <link rel="stylesheet" href="resources/style/articles.css">
    <title>Article</title>
</head>
<body>
<header>
    <?php include_once 'resources/assests/import/header.php' ?>
</header>
<main>
    <div id="article"></div>
    <div id="commentContainer" class="flex flex-col items-center">
        <div class="w-[80%]">
            <button id="commentForm" class="p-2 bg-purple-400">Ajouter un commentaire</button>
            <div id="commentFormDisplay"></div>
        </div>
    </div>
    <div id="commentsOfArticles"></div>
</main>
</body>
</html>
