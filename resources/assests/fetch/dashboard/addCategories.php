<?php
session_start();
require_once '../../Classes/Articles.php';

$article = new Articles();
$articles = $article->countCategories();
var_dump($articles);
