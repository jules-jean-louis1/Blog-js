<?php

require_once 'Database.php';
class Users
{
    public function __construct()
    {

    }

    public function checkLogin($login)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT COUNT(*) as total FROM utilisateurs WHERE login = :login');
        $req->execute(['login' => $login]);
        $result = $req->fetch();
        if ($result['total'] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function checkPassword($password)
    {
        if (preg_match('/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/', $password)) {
            return true;
        } else {
            return false;
        }
    }
    public function register($login, $password)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('INSERT INTO utilisateurs (login, password, droits, user_avatar,  member_since) 
                                    VALUES (:login, :password , "utilisateur", "default_avatar.png", NOW())');
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->execute(['login' => $login, 'password' => $password]);
    }
    public function login($login, $password)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT * FROM utilisateurs WHERE login = :login');
        $req->execute(['login' => $login]);
        $result = $req->fetch();
        if ($result) {
            if (password_verify($password, $result['password'])) {
                $_SESSION['id'] = $result['id'];
                $_SESSION['login'] = $result['login'];
                /*$_SESSION['user_avatar'] = $result['user_avatar'];*/
                $_SESSION['droits'] = $result['droits'];
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function updateLogin($login, $id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('UPDATE utilisateurs SET login = :login WHERE id = :id');
        $req->execute(['login' => $login, 'id' => $id]);
        $_SESSION['login'] = $login;
    }
    public function updatePassword($password, $id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('UPDATE utilisateurs SET password = :password WHERE id = :id');
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->execute(['password' => $password, 'id' => $id]);
    }
    public function deleteUser($id)
    {
        $db = new Database();
        $bdd = $db->getBdd();

        // Début de la transaction
        $bdd->beginTransaction();

        // Supprimer les commentaires de l'utilisateur
        $req1 = $bdd->prepare('DELETE FROM comments WHERE user_id = :id');
        $req1->execute(['id' => $id]);

        // Supprimer les articles de l'utilisateur
        $req2 = $bdd->prepare('DELETE FROM articles WHERE author_id = :id');
        $req2->execute(['id' => $id]);

        // Supprimer l'utilisateur
        $req3 = $bdd->prepare('DELETE FROM utilisateurs WHERE id = :id');
        $req3->execute(['id' => $id]);

        // Validation de la transaction
        $bdd->commit();
    }

    public function getLoginUser()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT id, login FROM utilisateurs');
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $result = json_encode($result);
        return $result;
    }
    public function getAllUsersInfos()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT 
            utilisateurs.id, utilisateurs.login, utilisateurs.droits, utilisateurs.member_since, utilisateurs.user_avatar, 
            COUNT(DISTINCT articles.id) AS nb_articles, COUNT(DISTINCT comments.id) AS nb_comments 
            FROM utilisateurs 
            LEFT JOIN articles ON utilisateurs.id = articles.author_id 
            LEFT JOIN comments ON utilisateurs.id = comments.user_id 
            GROUP BY utilisateurs.id, utilisateurs.login, utilisateurs.droits; ');
        $req->execute();
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $result = json_encode($result);
        return $result;
    }
    public function getUsersInfos($id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT 
            utilisateurs.id, utilisateurs.login, utilisateurs.droits, utilisateurs.member_since, utilisateurs.user_avatar, 
            COUNT(DISTINCT articles.id) AS nb_articles, COUNT(DISTINCT comments.id) AS nb_comments 
            FROM utilisateurs 
            LEFT JOIN articles ON utilisateurs.id = articles.author_id 
            LEFT JOIN comments ON utilisateurs.id = comments.user_id 
            WHERE utilisateurs.id = :id
            GROUP BY utilisateurs.id, utilisateurs.login, utilisateurs.droits; ');
        $req->execute(['id' => $id]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $result = json_encode($result);
        return $result;
    }
    public function updateDroits($id, $droits)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('UPDATE `utilisateurs` SET `droits` = :droits WHERE `utilisateurs`.`id` = :id');
        $req->execute(['droits' => $droits, 'id' => $id]);
    }
    public function updateAvatar($id, $user_avatar)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('UPDATE `utilisateurs` SET `user_avatar` = :user_avatar WHERE `utilisateurs`.`id` = :id');
        $req->execute(['user_avatar' => $user_avatar, 'id' => $id]);
    }
    public function displayInfosUser($id)
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT c.id, c.content, c.created_at, a.title, u.*, tc.total_comments
                                    FROM utilisateurs u
                                    LEFT JOIN comments c ON c.user_id = u.id
                                    LEFT JOIN articles a ON c.article_id = a.id
                                    LEFT JOIN (
                                      SELECT user_id, COUNT(*) as total_comments
                                      FROM comments
                                      GROUP BY user_id
                                    ) tc ON u.id = tc.user_id
                                    WHERE u.id = :user_id
                                    ORDER BY c.created_at DESC
                                    LIMIT 4;
                                    ;
                                    ');
        $req->execute(['user_id' => $id]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $result = json_encode($result);
        return $result;
    }
}