<?php
session_start();
require_once '../../Classes/Articles.php';

if (isset($_GET['category2'])) {
    $category = htmlspecialchars($_GET['category2']);
}

if (isset($_GET['order'])) {
    $order = htmlspecialchars($_GET['order']);
}
$page = new Articles();
$pages = $page->numberPage($category, $order);
$data = ['pages' => range(1, $pages)];
$json = json_encode($data);
header('Content-Type: application/json');
echo $json;

?>