<?php
session_start();
require_once 'resources/assests/Classes/Users.php';



?>
<?php if (isset($_SESSION['droits']) == 'administrateur') : ?>
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="https://cdn.tailwindcss.com"></script>
        <script defer type="module" src="resources/js/dashboard.js"></script>
        <link rel="stylesheet" href="resources/style/index.css">
        <title><?= $_SESSION['login']?> - Dashboard</title>
    </head>
    <body>
    <header class="border-b-[1px] border-[#52586633] bg-white fixed top-0 w-full">
        <?php include_once 'resources/assests/import/header.php' ?>
    </header>
        <main class="mt-[10%] lg:mt-[6%]">
            <article>
                <section>
                    <div id="containerDash">
                        <div id="titleDashboard">
                            <h1 class="text-4xl text-center font-semibold">
                                Dashboard
                            </h1>
                        </div>
                        <div id="containerMessage" class="h-[40px]">
                            <div id="errorMsg"></div>
                        </div>
                        <div id="tableauUser" class="flex justify-center">
                            <div class="w-[80%] flex flex-col items-center justify-center">
                                <table class="w-full border-[1px]">
                                    <thead class="rounded-t-lg">
                                    <tr>
                                        <th class="px-4 py-2 border-[1px]">ID</th>
                                        <th class="px-4 py-2 border-[1px]">Login</th>
                                        <th class="px-4 py-2 border-[1px]">Droits</th>
                                        <th class="px-4 py-2 border-[1px]">Action</th>
                                        <th class="px-4 py-2 border-[1px]">Articles</th>
                                        <th class="px-4 py-2 border-[1px]">Commentaires</th>
                                    </tr>
                                    </thead>
                                    <tbody id="tableauTbody" class="w-full border-[1px]"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="flex justify-around pt-[3%] lg:pt-[4%]">
                        <div id="categoriesWarp" class="flex flex-col ">
                            <div id="titleCategories" class="flex flex-col items-center space-x-2">
                                <h1 class="text-4xl text-semibold">
                                    Catégories
                                </h1>
                                <p>
                                    <span class="w-[130px]">Ici, vous pouvez renommer les catégories.</span>
                                </p>
                            </div>
                            <div id="containerCategory" class="flex flex-col space-y-3"></div>
                        </div>
                        <div class="flex flex-col">
                            <div id="titleFiltre" class="flex flex-col items-center space-x-2">
                                <h1 class="text-4xl text-semibold">
                                    Commentaires
                                </h1>
                                <p>
                                    <span class="w-[130px]">Ici, vous pouvez filtrer les articles.</span>
                                </p>
                            </div>
                            <div id="containerFiltreUsers"></div>
                            <div class="h-[250px] overflow-scroll ">
                                <div id="containerUsers" class="w-full pt-2"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div id="divContainerArticles">
                        <div id="titleArticles" class="flex flex-col items-center space-x-2">
                            <h1 class="text-4xl text-semibold">
                                Articles
                            </h1>
                            <p>
                                <span class="w-[130px]">Ici, vous pouvez supprimer les articles.</span>
                            </p>
                        </div>
                        <div class="flex flex-col item-center">
                            <div id="containerArticles"></div>
                            <div id="DisplayerArticles"></div>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    </body>
    </html>

<?php else: header('Location: ../index.php');   exit; ?>

<?php endif; ?>
