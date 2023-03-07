<?php

?>

<div id="containerHeader">
    <div id="wapperHeader" class="flex justify-between items-center p-2">
        <div id="logo" class="p-2 rounded-lg bg-slate-100">
            <h1>Blog</h1>
        </div>
        <div id="linksHeader">
            <div id="navbar">
                <?php if (isset($_SESSION['login']) != null) : ?>
                <nav>
                    <ul class="flex space-x-2">
                        <li>
                            <button type="button" id="buttonRegisterHeader" class="p-2 bg-blue-400">
                                <a href="pages/profil.php"><?= $_SESSION['login'] ?></a>
                            </button>
                        </li>
                        <li>
                            <button type="button" id="buttonLoginHeader" class="p-2 bg-blue-200">Connexion</button>
                        </li>
                    </ul>
                </nav>
                <?php else : ?>
                    <nav>
                        <ul class="flex space-x-2">
                            <li>
                                <button type="button" id="buttonRegisterHeader" class="p-2 bg-blue-400">Inscription</button>
                            </li>
                            <li>
                                <button type="button" id="buttonLoginHeader" class="p-2 bg-blue-200">Connexion</button>
                            </li>
                        </ul>
                    </nav>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
