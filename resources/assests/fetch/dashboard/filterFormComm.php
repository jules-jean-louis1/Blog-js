<?php
session_start();
require_once '../../Classes/Comments.php';


if (isset($_GET['login'])) {
    $login = $_GET['login'];
    $titre = $_GET['article'];

    $comment = new Comments();
    $comments = $comment->filterComment($login, $titre);
    if (empty($comments)) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Aucun commentaire trouvé']);
    } else {
        header('Content-Type: application/json');
        echo json_encode($comments);
    }

}
