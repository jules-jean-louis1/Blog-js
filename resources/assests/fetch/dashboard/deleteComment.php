<?php
session_start();
require_once '../../Classes/Comments.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $comment = new Comments();
    $comments = $comment->deleteComment($id);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Commentaire supprimé']);

}
?>