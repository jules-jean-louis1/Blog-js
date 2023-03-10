<?php
session_start();
require_once '../../Classes/Comments.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $comment = new Comments();
    $comments = $comment->getComments($id);
    header('Content-Type: application/json');
    if (empty($comments)) {
        echo json_encode(['status' => 'empty', 'message' => 'Aucun Commentaire n\'a était trouvé']);
    } else {
        echo json_encode(['status' => 'success', 'comments' => $comments]);
    }
}
?>