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
    <script defer type="module" src="resources/js/article.js"></script>
    <link rel="stylesheet" href="resources/style/articles.css">
    <title>Article</title>
</head>
<body>
<header>
    <?php include_once 'resources/assests/import/header.php' ?>
</header>
<main>
    <section>
        <div id="containerCreateArticle">
            <?php if (isset($_SESSION['droits']) && ($_SESSION['droits'] == 'administrateur' || $_SESSION['droits'] == 'moderateur')) { ?>
            <!-- Le code pour afficher l'interface d'écriture d'article -->
                <div id="titleArticlePage">
                    <h1 class="text-xl font-bold">Ecrire un article</h1>
                </div>
            <div id="btncreeArticle">
                <button data-modal-target="#modal" type="button" id="buttonCreateArticle"
                        class="p-2 bg-blue-400 rounded-lg">Ecrire un article
                </button>
            </div>
            <div id="containerFormArticle">
                <div class="modal px-4 py-5 rounded-lg bg-[#fff] w-[85%] border-2 border-slate-200" id="modal">
                    <div id="modal-header" class="flex justify-between items-center">
                        <div id="modal-title">
                            <h3 class="text-2xl font-bold">
                                <span>Créer un article</span>
                            </h3>
                        </div>
                        <button data-close-button type="button" id="closeModal"
                                class="text-slate-600 hover:bg-slate-200 rounded-lg font-semibold p-2"><!--&times;-->
                            Fermer
                        </button>
                    </div>
                    <div class="modal-content">
                        <form action="resources/assests/fetch/createArticle.php" method="post" id="form-modal-article">
                            <div id="warpperArticleDialog">
                                <div class="flex flex-col">
                                    <input type="text" name="title" id="title"
                                           class="bg-slate-100 p-2 rounded-t-lg" placeholder="Titre">
                                </div>
                                <div class="flex flex-col">
                                    <textarea name="content" id="content" cols="30" rows="10"
                                              class="bg-slate-100 p-2 rounded-b-lg"
                                              placeholder="Contenu de l'article"></textarea>
                                </div>
                                <div class="flex flex-col">
                                    <label for="category" class="font-semibold text-lg">Catégorie</label>
                                    <select name="category" id="category" class="bg-slate-100 p-2 rounded-lg">
                                    </select>
                                </div>
                                <div class="py-2">
                                    <div id="errorMsg"></div>
                                </div>
                                <div class="flex flex-col py-2">
                                    <button type="submit" id="buttonCreateArticle"
                                            class="p-2 bg-blue-400 rounded-lg text-white">Poster cette Article
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="overlay"></div>
        </div>
        <?php } elseif (isset($_SESSION['droits']) && $_SESSION['droits'] == 'utilisateur') { ?>
            <!-- Le code pour afficher un message indiquant que l'utilisateur n'a pas les droits pour écrire un article -->
        <?php } else { ?>
        <?php } ?>
    </section>
    <section>
        <div id="containerArticle">
            <div id="containerSelectCategory" class="flex justify-center items-center">
                <div class="flex items-center border-2 rounded-lg p-2">
                    <form action="" method="post">
                        <input type="search" name="search" id="searchInput" placeholder="Rechecher un article" autofocus
                               autocomplete="off" required
                               class="rounded-lg bg-slate-100 p-2 py-3">
                        <button type="submit" class="p-2 bg-blue-400 rounded-lg text-white">
                            &rArr;
                        </button>
                        <div id="results"></div>
                    </form>
                    <form action="resources/assests/fetch/getArticles.php" method="post">
                        <div class="flex space-x-2">
                            <div class="py-2">
                                <label for="category2" class="font-semibold text-lg">Filtrer :</label>
                                <select name="category2" id="category2" class="bg-slate-100 p-2 rounded-lg">
                                </select>
                            </div>
                            <div class="py-2">
                                <label for="order" class="font-semibold text-lg">Date :</label>
                                <select name="order" id="order" class="bg-slate-100 p-2 rounded-lg">
                                    <option value="ASC">+ récents</option>
                                    <option value="DESC">+ anciens</option>
                                </select>
                            </div>
                            <div class="py-2">
                                <button type="submit" id="buttonCreateArticle"
                                        class="p-2 bg-blue-400 rounded-lg text-white">
                                    Filtrer
                                </button>
                            </div>
                        </div>
                    </form>
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
