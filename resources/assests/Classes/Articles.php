<?php

require_once 'Database.php';

class Articles
{
    public function __construct()
    {

    }
    public function createArticle($title, $content, $category_id, $author_id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('INSERT INTO articles (title, content, category_id, author_id, created_at) VALUES (:title, :content, :category_id, :author_id, NOW())');
        $req->execute(['title' => $title, 'content' => $content, 'category_id' => $category_id, 'author_id' => $author_id]);
    }
    public function getCategory()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT * FROM categories');
        $req->execute();
        $categories = $req->fetchAll(PDO::FETCH_ASSOC);
        $categories = json_encode($categories);
        return $categories;
    }
    public function getArticles($page, $limit, $category = null) {
        $db = new Database();
        $bdd = $db->getBdd();
        $offset = ($page - 1) * $limit;

        $req = 'SELECT articles.title, articles.content, categories.name AS category_name, utilisateurs.login AS author_login, articles.created_at
                FROM articles
                INNER JOIN categories ON articles.category_id = categories.id
                INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id';

        if ($category) {
            $req .= ' WHERE categories.name = :category';
        }

        $req .= ' LIMIT :limit OFFSET :offset';

        $stmt = $bdd->prepare($req);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);

        if ($category) {
            $stmt->bindParam(':category', $category, PDO::PARAM_STR);
        }

        $stmt->execute();
        $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $articles;
    }
    public function searchArticle($search)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT articles.title, articles.content, categories.name AS category_name, utilisateurs.login AS author_login, articles.created_at
                              FROM articles
                              INNER JOIN categories ON articles.category_id = categories.id
                              INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id
                              WHERE articles.title LIKE :search OR articles.content LIKE :search');
        $req->execute(['search' => '%' . $search . '%']);
        $articles = $req->fetchAll(PDO::FETCH_ASSOC);
        return $articles;
    }
}