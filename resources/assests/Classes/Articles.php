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
    public function updateCategories($categories, $id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('UPDATE categories SET name = :category_id WHERE id = :id');
        $req->execute(['category_id' => $categories, 'id' => $id]);
    }
    public function numberPage()
    {
        $db = new Database();
        $bdd = $db->getBdd();

        // Compter le nombre total d'articles
        $countQuery = "SELECT COUNT(*) as count FROM articles";
        $countResult = $bdd->query($countQuery)->fetch(PDO::FETCH_ASSOC);
        $count = $countResult['count'];

        // Calculer le nombre total de pages
        $pages = ceil($count / 9); // 9 est le nombre d'articles par page que vous souhaitez afficher

        return $pages;
    }
    public function getArticles($page, $category, $order)
    {
        $db = new Database();
        $bdd = $db->getBdd();
// Vérifier si le numéro de page est valide
        if (!$page || $page < 1) {
            $page = 1;
        }


        // Nombre d'articles par page
        $limit = 9;

// Calcul de l'offset en fonction de la page demandée
        $offset = ($page - 1) * $limit;

// Définir l'offset à 0 si le numéro de page est inférieur à 1
        if ($offset < 0) {
            $offset = 0;
        }

        $req = "SELECT articles.id ,articles.title, SUBSTRING_INDEX(articles.content, ' ', 18) AS content_preview, 
                categories.name AS category_name, utilisateurs.login AS author_login, articles.created_at, articles.updated_at
                FROM articles
                INNER JOIN categories ON articles.category_id = categories.id
                INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id";


        if ($category && $category != "all") {
            $req .= ' WHERE categories.name = :category';
        }

        $req .= " ORDER BY articles.created_at $order LIMIT :limit OFFSET :offset";

        $stmt = $bdd->prepare($req);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);


        if ($category && $category != "all") {
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
        $req = $bdd->prepare('SELECT articles.id, articles.title, articles.content, categories.name AS category_name, utilisateurs.login AS author_login, articles.created_at
                              FROM articles
                              INNER JOIN categories ON articles.category_id = categories.id
                              INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id
                              WHERE articles.title LIKE :search OR articles.content LIKE :search');
        $req->execute(['search' => '%' . $search . '%']);
        $articles = $req->fetchAll(PDO::FETCH_ASSOC);
        return $articles;
    }
    public function getSpecificArticle($id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT articles.id, articles.title, articles.content, categories.name AS category_name, utilisateurs.login AS author_login, articles.created_at, articles.updated_at
                              FROM articles
                              INNER JOIN categories ON articles.category_id = categories.id
                              INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id
                              WHERE articles.id = :id');
        $req->execute(['id' => $id]);
        $article = $req->fetch(PDO::FETCH_ASSOC);
        return $article;
    }
}