<?php
require_once '../Classes/Users.php';

if (isset($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);
    $passwordConfirm = htmlspecialchars($_POST['passwordConfirm']);

    if (!empty($login) && !empty($password) && !empty($passwordConfirm)) {
        $user = new Users();
        if ($user->checkLogin($login) === true) {
            header('Content-Type: application/json');
            echo json_encode(["status" => "loginExist" , "message" => "Ce login existe déjà"]);
        } else {
            if ($user->checkPassword($password) === false) {
                header('Content-Type: application/json');
                echo json_encode(["status" => "passwordInvalid" , "message" => "Le mot de passe doit contenir au moins 5 caractères dont une lettre et un chiffre"]);
            } else {
                if ($password != $passwordConfirm) {
                    header('Content-Type: application/json');
                    echo json_encode(["status" => "passwordConfirm" , "message" => "Les mots de passe ne correspondent pas"]);
                } else {
                    $user->register($login, $password);
                    header('Content-Type: application/json');
                    echo json_encode(["status" => "success", "message" => "Vous êtes bien inscrit"]);
                }
            }
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(["status" => "emptyFields" , "message" => "Veuillez remplir tous les champs"]);
    }
    die();
}
?>

<form action="" method="post" id="resgister-form" class="p-2 flex flex-col space-y-2">
    <div class="flex flex-col">
        <label for="login">Login</label>
        <input type="text" name="login" id="login" placeholder="login" class="p-2 bg-slate-100">
    </div>
    <div class="flex flex-col">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" placeholder="password" class="p-2 bg-slate-100">
    </div>
    <div class="flex flex-col">
        <label for="passwordConfirm">Confirmer le mot de passe</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" class="p-2 bg-slate-100">
    </div>
    <div id="errorMsg"></div>
    <div id="containerSubmit">
        <button type="submit" name="submit" id="submit" class="p-2 bg-slate-200">Inscription</button>
    </div>
</form>
