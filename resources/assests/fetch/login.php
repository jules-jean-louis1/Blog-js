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
        echo json_encode(["status" => "empty" , "message" => "Veuillez remplir tous les champs"]);
    }
    die();
}
?>


<form action="" method="post" id="login-form" class="rounded-lg h-full max-h-[calc(100vh-2.5rem)]
                mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)]
                w-[26.25rem] px-4 py-5 flex flex-col space-y-2">
    <div id="containerCloseDialog" class="flex flex-row justify-between items-center">
        <p>
            <span class="text-lg font-bold">Connectez-vous sur Blog</span>
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
    <div id="containerMessageProfil" class="h-[65px] w-full">
        <div id="errorMsg" class="w-full"></div>
    </div>
    <div id="containerSubmit">
        <button type="submit" name="submit" id="submit" class="p-2 rounded-lg bg-[#AC1DE4] font-semibold text-white">Connexion</button>
    </div>
</form>
