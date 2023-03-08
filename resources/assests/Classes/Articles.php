<?php

require_once 'Database.php';

class Articles
{
    public function __construct()
    {

    }
    public function createArticle($title, $content, $author, $date)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('INSERT INTO articles (title, content, author, date) VALUES (:title, :content, :author, :date)');
        $req->execute(['title' => $title, 'content' => $content, 'author' => $author, 'date' => $date]);
    }
}