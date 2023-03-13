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
<header class="border-b-[1px] border-[#52586633] bg-white fixed top-0 w-full">
    <?php include_once 'resources/assests/import/header.php' ?>
</header>
<main class="lg:pt-[4%]">
    <div class="flex justify-center">
        <div id="article" class="w-[98%] lg:w-[65%]"></div>
    </div>
    <div id="commentContainer" class="flex flex-col items-center">
        <div class="w-[98%] lg:w-[65%]">
            <div id="commentForm"></div>
<!--            <button id="commentForm" class="lg:my-2 lg:mx-5 p-2 border-[1px] border-[#ac1de4] rounded-lg w-full font-bold text-lg">Ajouter un commentaire</button>-->
            <div id="commentFormDisplay" class="py-2 lg:mx-5"></div>
            <div id="containerMessageProfil" class="h-[65px] w-full">
                <div id="errorMsg" class="w-full"></div>
            </div>
        </div>
    </div>
    <div class="flex justify-center">
        <div id="commentsOfArticles" class="w-[98%] lg:w-[65%]"></div>
    </div>
</main>
</body>
</html>
