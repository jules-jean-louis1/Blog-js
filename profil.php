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
    <script defer type="module" src="resources/js/profil.js"></script>
    <link rel="stylesheet" href="resources/style/index.css">
    <title><?= $_SESSION['login']?> - Profil</title>
</head>
<body>
<header class="border-b-[1px] border-[#52586633] bg-white fixed top-0 w-full">
    <?php include_once 'resources/assests/import/header.php' ?>
</header>
<main>
    <section class="flex flex-col items-center justify-center lg:pt-[5%]">
        <div id="containerProfile" class="py-8">
            <h2 class="text-2xl font-bold text-center">Profil</h2>
        </div>
        <div id="containerProfileInfo"></div>
        <div id="formProfil" class="flex justify-around lg:w-[70%]"></div>
    </section>
</main>
</body>
</html>
<?php else : ?>
    <?php header('Location: index.php') ?>
<?php endif; ?>
