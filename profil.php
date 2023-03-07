<?php
session_start();
require_once 'resources/assests/Classes/Users.php';

if (isset($_POST['update'])) {
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);
    $passwordConfirm = htmlspecialchars($_POST['passwordConfirm']);

    $user = new Users();
    if (!empty($login)) {
        $user->updateLogin($login, $_SESSION['id']);
        $_SESSION['login'] = $login;
        header('Content-Type: application/json');
        echo json_encode(['status' => 'loginUp', 'message' => 'Votre login a bien été modifié']);
    }
    if (!empty($password) && !empty($passwordConfirm)) {
        if ($password == $passwordConfirm) {
            $user->updatePassword($password, $_SESSION['id']);
            header('Content-Type: application/json');
            echo json_encode(['status' => 'passwordUp', 'message' => 'Votre mot de passe a bien été modifié']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'error', 'message' => 'Les mots de passe ne correspondent pas']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Veuillez remplir tous les champs']);
    }
    die();
}
?>
<?php if (isset($_SESSION['login']) != null) :?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="resources/js/profil.js"></script>
    <link rel="stylesheet" href="resources/style/index.css">
    <title><?= $_SESSION['login']?> - Profil</title>
</head>
<body>
<header>
    <?php include_once 'resources/assests/import/header.php' ?>
</header>
<main>
    <div id="formProfil" class="flex justify-center w-1/2">
        <form action="" method="post" id="updateprofil-form">
            <div class="flex flex-col space-y-2">
                <label for="login">Login</label>
                <input type="text" name="login" id="login" value="<?= $_SESSION['login'] ?>" class="p-2 rounded-lg bg-slate-100">
            </div>
            <div class="flex flex-col space-y-2">
                <label for="password">Mot de passe</label>
                <input type="password" name="password" id="password" class="p-2 rounded-lg bg-slate-100">
            </div>
            <div class="flex flex-col space-y-2">
                <label for="passwordConfirm">Confirmation du mot de passe</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" class="p-2 rounded-lg bg-slate-100">
            </div>
            <div class="flex flex-col space-y-2">
                <label for="avatar">Avatar</label>
                <input type="file" name="avatar" id="avatar"  class="p-2 rounded-lg bg-slate-100">
            </div>
            <div class="flex flex-col space-y-2">
                <button type="submit" id="update" name="update">Update</button>
            </div>
        </form>
    </div>
</main>
</body>
</html>
<?php else : ?>
    <?php header('Location: index.php') ?>
<?php endif; ?>
