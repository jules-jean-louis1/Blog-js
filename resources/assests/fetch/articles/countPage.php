<?php
session_start();
require_once '../../Classes/Articles.php';

$page = new Articles();
$pages = $page->numberPage();
$data = ['pages' => range(1, $pages)];
$json = json_encode($data);
header('Content-Type: application/json');
echo $json;
?>