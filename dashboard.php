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
        <script defer src="resources/js/dashboard.js"></script>
        <link rel="stylesheet" href="resources/style/index.css">
        <title><?= $_SESSION['login']?> - Dashboard</title>
    </head>
    <body>
    <header>
        <?php include_once 'resources/assests/import/header.php' ?>
    </header>
        <main>
            <article>
                <section>
                    <div id="containerDash">
                        <div id="titleDashboard">
                            <h1 class="text-6xl text-center text-blue-400">
                                Dashboard
                            </h1>
                        </div>
                        <div id="tableauUser">
                            <div id="errorMsg"></div>
                            <table class="table-auto">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2">ID</th>
                                        <th class="px-4 py-2">Login</th>
                                        <th class="px-4 py-2">Droits</th>
                                        <th class="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tableauTbody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    </body>
    </html>

<?php else: header('Location: ../index.php');   exit; ?>

<?php endif; ?>
