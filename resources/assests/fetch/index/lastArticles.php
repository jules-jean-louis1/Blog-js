<?php
session_start();
require_once '../../Classes/Articles.php';

$articles = new Articles();
$last = $articles->lastestArticles();

print_r($last);