<?php
session_start();
require_once '../../Classes/Articles.php';

$title = new Articles();
$titles = $title->gettitleArticles();
echo $titles;
?>
