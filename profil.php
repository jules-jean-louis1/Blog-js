<?php
session_start();

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
        </form>
    </div>
</main>
</body>
</html>
<?php else : ?>
    <?php header('Location: index.php') ?>
<?php endif; ?>
