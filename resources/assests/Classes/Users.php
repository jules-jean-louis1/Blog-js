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
        $req = $bdd->prepare('INSERT INTO utilisateurs (login, password, droits, member_since) VALUES (:login, :password , "utilisateur", NOW())');
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
        $req = $bdd->prepare('DELETE FROM utilisateurs WHERE id = :id');
        $req->execute(['id' => $id]);
    }
    public function getAllUsers()
    {
        $db = new Database();
        $bdd = $db->getBdd();
        $req = $bdd->prepare('SELECT * FROM utilisateurs');
        $req->execute();
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
}