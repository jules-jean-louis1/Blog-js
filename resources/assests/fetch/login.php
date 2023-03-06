<?php
session_start();
require_once '../Classes/Users.php';

if (isset($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);

    if (!empty($login) && !empty($password)) {
        $user = new Users();
        if ($user->login($login, $password) === true) {
            header('Content-Type: application/json');
            echo json_encode(["status" => "success", "message" => "Vous êtes bien connecté"]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(["status" => "loginFail" , "message" => "Le login ou le mot de passe est incorrect"]);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(["status" => "emptyFields" , "message" => "Veuillez remplir tous les champs"]);
    }
    die();
}
?>

<form action="" method="post" id="login-form">
    <div class="flex flex-col">
        <label for="login">Email</label>
        <input type="text" name="login" id="login" placeholder="login" class="p-2 bg-slate-100">
    </div>
    <div class="flex flex-col">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" placeholder="password" class="p-2 bg-slate-100">
    </div>
    <div id="errorMsg"></div>
    <div id="containerSubmit">
        <button type="submit" name="submit" id="submit" class="p-2 bg-purple-200">Connexion</button>
    </div>
</form>
