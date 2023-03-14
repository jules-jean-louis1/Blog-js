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
        echo json_encode(["status" => "empty" , "message" => "Veuillez remplir tous les champs"]);
    }
    die();
}
?>

<form action="" method="post" id="resgister-form" class="rounded-lg h-full max-h-[calc(100vh-2.5rem)]
                mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)]
                w-[26.25rem] px-4 py-5 flex flex-col space-y-2">
    <div id="containerCloseDialog" class="flex flex-row justify-between items-center">
        <p>
            <span class="text-lg font-bold">Inscrivez-vous sur Blog</span>
        </p>
        <button type="button" id="closeDialog" class="py-2 px-4 hover:bg-slate-200 rounded-full">&times;</button>
    </div>
    <div class="flex flex-col">
        <label for="login" class="px-[4px] py-[3px]">Login</label>
        <input type="text" name="login" id="login" placeholder="login" class="p-2 bg-[#52586633] rounded-[14px]">
    </div>
    <div class="flex flex-col">
        <label for="password" class="px-[4px] py-[3px]">Mot de passe</label>
        <input type="password" name="password" id="password" placeholder="password" class="p-2 bg-[#52586633] rounded-[14px]">
    </div>
    <div class="flex flex-col">
        <label for="passwordConfirm" class="px-[4px] py-[3px]">Confirmer le mot de passe</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" class="p-2 bg-[#52586633] rounded-[14px]">
    </div>
    <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
        <div id="errorMsg"></div>
    </div>
    <div id="containerSubmit">
        <button type="submit" name="submit" id="submit" class="p-2 rounded-lg bg-[#AC1DE4] font-semibold text-white">Inscription</button>
    </div>
</form>
