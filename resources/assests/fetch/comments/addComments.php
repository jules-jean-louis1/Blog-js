<?php
session_start();
require_once '../../Classes/Comments.php';


if (isset($_POST['comment'])) {
    $comment_id = intval($_POST['comment_id']);
    $comment = htmlspecialchars($_POST['comment']);
    $idArticle = intval($_GET['id']);
    $user_id = $_SESSION['id'];

    if (!empty($comment)) {
        $comment = new Comments();
        $comments = $comment->addComment($comment_id, $comment, $idArticle, $user_id);
        header('Content-Type: application/json');
        if ($comments) {
            echo json_encode(['status' => 'success', 'message' => 'Commentaire ajouté avec succès']);
        } else {
            echo json_encode(['status' => 'error', 'comments' => 'Une erreur est survenue']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'empty', 'message' => 'Veuillez remplir tous les champs']);
    }
    die();
}
?>

<!--<form action="" method="post" id="FormForAddComments" class="border-2">
    <div id="containerFormAddComments">
        <div class="flex flex-col">
            <input type="hidden" name="comment_id" id="commentId">
            <div>
                <textarea name="comment" id="comment" cols="30" rows="10"
                            placeholder="Publier un Commentaire"></textarea>
            </div>
            <div>
                <button type="submit" class="border-2">Publier</button>
            </div>
        </div>
    </div>
</form>-->
