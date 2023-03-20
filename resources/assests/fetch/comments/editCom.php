<?php
session_start();
require_once '../../Classes/Comments.php';

if (isset($_SESSION['login'])) {
    echo $_SESSION['login'];
}