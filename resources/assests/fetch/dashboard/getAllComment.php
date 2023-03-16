<?php
session_start();
require_once '../../Classes/Comments.php';

$comment = new Comments();
$comments = $comment->getAllComment();
echo $comments;
?>
