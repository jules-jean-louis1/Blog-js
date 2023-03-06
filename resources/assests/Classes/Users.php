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
        $req = $bdd->prepare('INSERT INTO utilisateurs (login, password, droits) VALUES (:login, :password , 0)');
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->execute(['login' => $login, 'password' => $password]);
    }
}