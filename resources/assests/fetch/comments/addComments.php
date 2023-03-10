<?php
session_start();
require_once '../../Classes/Comments.php';

if (isset($_POST['comment'])) {
    $comment_id = intval($_POST['comment_id']);
    $comment = htmlspecialchars($_POST['comment']);
    $idArticle = intval($_POST['idArticle']);
    $user_id = $_SESSION['id'];

    if (!empty($comment)) {

    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'empty', 'message' => 'Veuillez remplir tous les champs']);
    }

}