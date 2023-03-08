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
    <script defer src="resources/js/article.js"></script>
    <link rel="stylesheet" href="resources/style/index.css">
    <title>Article</title>
</head>
<body>
<header>
    <?php include_once 'resources/assests/import/header.php' ?>
</header>
<main>
    <div id="containerCreateArticle">
        <div id="btncreearticle">
            <button type="button" id="buttonCreateArticle" class="p-2 bg-blue-400 rounded-lg">Ecrire un article</button>
        </div>
        <div id="containerFormArticle">
            <div class="modal" id="modal">
                <div id="modal-header" class="flex justify-between">
                    <div id="modal-title">
                        <h3 class="text-2xl font-bold">
                            <span>Créer un article</span>
                        </h3>
                    </div>
                    <button type="button" id="closeModal" class="p-2 bg-red-400">&times;</button>
                </div>
                <div class="modal-content">
                    <form action="" method="post" id="form-dialog-article">
                        <div id="warpperArticleDialog">
                            <div class="flex flex-col">
                                <label for="title" class="font-semibold text-lg">Titre</label>
                                <input type="text" name="title" id="title"
                                       class="border-2 border-gray-300 bg-slate-100 p-2 rounded-lg">
                            </div>
                            <div class="flex flex-col">
                                <label for="content" class="font-semibold text-lg">Contenu</label>
                                <textarea name="content" id="content" cols="30" rows="10"
                                          class="border-2 border-gray-300 bg-slate-100 p-2 rounded-lg"></textarea>
                            </div>
                            <div class="flex flex-col">
                                <label for="category" class="font-semibold text-lg">Catégorie</label>
                                <select name="category" id="category" class="border-2 border-gray-300 bg-slate-100 p-2 rounded-lg">
                                    <option value="1">PHP</option>
                                    <option value="2">JavaScript</option>
                                    <option value="3">HTML</option>
                                    <option value="4">CSS</option>
                                    <option value="5">SQL</option>
                                </select>
                            </div>
                            <div class="flex flex-col">
                                <button type="submit" id="buttonCreateArticle" class="p-2 bg-blue-400">Poster cette Article</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="overlay"></div>
    </div>
</main>
<footer>
    <?php include_once 'resources/assests/import/footer.php' ?>
</footer>
</body>
</html>
