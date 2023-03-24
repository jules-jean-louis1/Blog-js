<?php

require_once 'Database.php';

class Articles
{
    public function __construct()
    {

    }
    public function createArticle($title, $content, $category_id, $author_id, $img_header)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('INSERT INTO articles (title, content, img_header, category_id, author_id, created_at) 
                                    VALUES (:title, :content, :img_header, :category_id, :author_id, NOW())');
        $req->execute(['title' => $title, 'content' => $content, 'img_header' => $img_header ,'category_id' => $category_id, 'author_id' => $author_id]);
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
    public function numberPage($category = null, $order = 'DESC')
    {
        $db = new Database();
        $bdd = $db->getBdd();

        // Construire la requête en fonction de la catégorie et de l'ordre
        $countQuery = "SELECT COUNT(*) as count FROM articles";
        if ($category && $category !== "all") {
            $countQuery .= " INNER JOIN categories ON articles.category_id = categories.id WHERE categories.name = :category";
        }
        $countQuery .= " ORDER BY articles.created_at $order";

        // Préparer et exécuter la requête
        $stmt = $bdd->prepare($countQuery);
        if ($category && $category !== "all") {
            $stmt->bindParam(':category', $category, PDO::PARAM_STR);
        }
        $stmt->execute();
        $countResult = $stmt->fetch(PDO::FETCH_ASSOC);
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

        $req = "SELECT articles.id,
           articles.title,
           SUBSTRING_INDEX(articles.content, ' ', 18) AS content_preview,
           categories.name AS category_name,
           utilisateurs.user_avatar,
           utilisateurs.login AS author_login,
           articles.img_header,
           articles.created_at,
           articles.updated_at,
           COUNT(comments.id) AS comment_count
    FROM articles
    INNER JOIN categories ON articles.category_id = categories.id
    INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id
    LEFT JOIN comments ON articles.id = comments.article_id
    GROUP BY articles.id";

        if ($category && $category != "all") {
            $req .= ' HAVING category_name = :category';
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
        $req = $bdd->prepare('SELECT articles.id, articles.title, articles.content, utilisateurs.user_avatar, categories.id AS category_id, categories.name AS category_name, utilisateurs.login AS author_login, articles.created_at, articles.img_header, articles.updated_at
                              FROM articles
                              INNER JOIN categories ON articles.category_id = categories.id
                              INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id
                              WHERE articles.id = :id');
        $req->execute(['id' => $id]);
        $article = $req->fetch(PDO::FETCH_ASSOC);
        return $article;
    }
    public function editArticle($id, $titre, $content, $categories)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('UPDATE articles SET title = :title, content = :content, category_id = :category_id, updated_at = NOW() WHERE id = :id');
        $req->execute(['title' => $titre, 'content' => $content, 'category_id' => $categories, 'id' => $id]);
    }
    public function gettitleArticles()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT articles.id, articles.title, categories.id, categories.name
                                    FROM articles
                                    INNER JOIN categories ON categories.id = articles.category_id;');
        $req->execute();
        $title = $req->fetchAll(PDO::FETCH_ASSOC);
        $title = json_encode($title);
        return $title;
    }
    public function articlesDashboard($id, $categories)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT articles.id AS articles_id, articles.title, articles.created_at, categories.name AS category_name, utilisateurs.login AS author_login, articles.created_at
                              FROM articles
                              INNER JOIN categories ON articles.category_id = categories.id
                              INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id
                              WHERE articles.author_id = :id AND articles.category_id = :category_id');
        $req->execute(['id' => $id, 'category_id' => $categories]);
        $articles = $req->fetchAll(PDO::FETCH_ASSOC);
        $articles = json_encode($articles);
        return $articles;
    }
    public function deleteArticle($id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('DELETE articles, comments
                                    FROM articles
                                    LEFT JOIN comments ON comments.article_id = articles.id
                                    WHERE articles.id = :id');
        $result = $req->execute(['id' => $id]);
        return $result;
    }
    public function checkCategories()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT categories.id, categories.name
                                    FROM categories');
        $req->execute();
        $categories = $req->fetchAll(PDO::FETCH_ASSOC);
        return $categories;
    }
    public function lastestArticles()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare("SELECT articles.id, articles.title, SUBSTRING_INDEX(articles.content, ' ', 18) AS content_preview, articles.img_header, categories.name AS category_name, utilisateurs.user_avatar, utilisateurs.login AS author_login, articles.created_at
                              FROM articles
                              INNER JOIN categories ON articles.category_id = categories.id
                              INNER JOIN utilisateurs ON articles.author_id = utilisateurs.id
                              ORDER BY articles.created_at DESC LIMIT 3");
        $req->execute();
        $articles = $req->fetchAll(PDO::FETCH_ASSOC);
        $articles = json_encode($articles);
        return $articles;
    }
    public function countCategories()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT COUNT(*) as count FROM categories');
        $req->execute();
        $count = $req->fetch(PDO::FETCH_ASSOC);
        if ($count['count'] <= 5) {
            return json_encode(['status' => '5']);
        } else if ($count['count'] >= 8) {
            return json_encode(['status' => '8']);
        } else {
            return json_encode(['status' => false]);
        }
    }
    public function addCategory($name)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('INSERT INTO categories (name) VALUES (:name)');
        $req->execute(['name' => $name]);
    }
    public function deleteCategory($id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('DELETE categories
                                    FROM categories
                                    WHERE categories.id = :id');
        $result = $req->execute(['id' => $id]);
        return $result;
    }
}