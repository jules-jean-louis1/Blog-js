<?php
require_once 'Database.php';
 class Comments
 {
     public function __construct()
     {

     }
     public function addComment($parent_comment_id, $content, $article_id, $user_id)
     {
         $db = new Database();
         $bdd = $db->getBdd();
         $req = $bdd->prepare('INSERT INTO comments (parent_comment_id, content, article_id, user_id, created_at) 
                                    VALUES (:parent_comment_id, :content, :article_id, :user_id, NOW())');
         $req->execute(['parent_comment_id' => $parent_comment_id, 'content' => $content, 'article_id' => $article_id, 'user_id' => $user_id]);
     }
        public function getComments($article_id)
        {
            $db = new Database();
            $bdd = $db->getBdd();
            $req = $bdd->prepare('SELECT comments.id, comments.parent_comment_id, comments.content, utilisateurs.login, utilisateurs.user_avatar, comments.created_at
                                        FROM comments
                                        INNER JOIN utilisateurs ON comments.user_id = utilisateurs.id
                                        WHERE comments.article_id = :article_id
                                        ORDER BY comments.created_at DESC
                                        ');
            $req->execute(['article_id' => $article_id]);
            $comments = $req->fetchAll(PDO::FETCH_ASSOC);
            return $comments;
        }
 }