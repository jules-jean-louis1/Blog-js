<?php
session_start();

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="resources/js/scriptIndex.js"></script>
    <link rel="stylesheet" href="resources/style/index.css">
    <title>Blog</title>
</head>
<body>
<header class="border-b-[1px] border-[#52586633] bg-white fixed top-0 w-full">
    <?php include_once 'resources/assests/import/header.php' ?>
</header>
    <main>
        <div id="formDisplayer"></div>
        <section class="pt-[7%] flex justify-center">
            <div class="w-[90%]">
                <div class="rounded-xl">
                    <div class=" flex justify-center border-b-[1px] border-[#52586633] py-6">
                        <div class="lg:w-[90%] flex justify-around">
                            <div class="flex justify-center items-center rounded-xl bg-[#F1F5F9] p-3 w-[45%]">
                                <img src="resources/images/icon/LC.png" alt="Logo Option 13" class="w-[25%]">
                                <h2 class="text-7xl text-center font-bold" id="option13">
                                    Option 13
                                </h2>
                            </div>
                            <div class="flex flex-col w-[32%]">
                                <p class="">Le blog de référence pour les développeurs web ! Vous y
                                    trouverez
                                    des
                                    articles complets et pratiques sur des sujets tels que Javascript, CSS, HTML, SQL et
                                    PHP.
                                    Que
                                    vous soyez débutant ou confirmé, vous découvrirez des astuces et des conseils pour
                                    améliorer
                                    vos
                                    compétences et vous tenir au courant des dernières tendances en matière de
                                    développement
                                    web.
                                </p>
                                <a href="article.php">
                                    <button class="border-[1px] border-[#ac1de4] px-3 py-2 rounded-lg" id="viewMore">Tous les artcicles  &gt;</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="lg:w-[90%] flex justify-around">
                            <div id="containerArticleLast" class="flex flex-wrap"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
<footer>
    <?php include_once 'resources/assests/import/footer.php' ?>
</footer>
</body>
</html>