<?php
session_start();
require_once '../Classes/Articles.php';

$article = new Articles();
$articles = $article->getCategory();
echo $articles;

?>