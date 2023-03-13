<div id="containerHeader">
    <div id="wapperHeader" class="flex justify-between items-center p-2">
        <div id="logo" class="p-2 rounded-lg bg-slate-100 font-bold">
            <a href="index.php">
                <h1>Blog</h1>
            </a>
        </div>
        <div id="linksHeader">
            <div id="navbar">
                <?php if (isset($_SESSION['login']) != null) : ?>
                <nav>
                    <ul class="flex space-x-2">
                        <li  class="flex flex-row">
                            <a href="article.php">
                                <button type="button" id="buttonArticle" class="py-[5px] px-2 rounded-lg bg-[#0e1217] ease-in duration-100
                                                                                hover:bg-[#2d313a] font-semibold text-white">
                                    <span>Tous les articles</span>
                                </button>
                            </a>
                        </li>
                        <li>
                            <?php if ($_SESSION['droits'] == 'administrateur') : ?>
                                <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 bg-green-500">
                                    <a href="dashboard.php"><?= $_SESSION['login'] ?></a>
                                </button>
                            <?php else: ?>
                            <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 rounded-lg bg-[#F5F8FC]">
                                <a href="profil.php"><?= $_SESSION['login'] ?></a>
                            </button>
                            <?php endif; ?>
                        </li>
                        <li>
                            <button type="button" id="buttonLoginHeader" class="py-[4px] px-2 rounded-lg border-[1px] border-red-500 ease-in duration-100
                                                                                hover:bg-red-500 hover:text-white">
                                <a href="deconnect.php">Deconnexion</a>
                            </button>
                        </li>
                    </ul>
                </nav>
                <?php else : ?>
                    <nav>
                        <ul class="flex space-x-2">
                            <li>
                                <a href="article.php">
                                    <button type="button" id="buttonArticle" class="py-[5px] px-2 rounded-lg bg-[#0e1217] ease-in duration-100
                                                                                hover:bg-[#2d313a] font-semibold text-white">
                                        <span>Tous les articles</span>
                                    </button>
                                </a>
                            </li>
                            <li>
                                <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 bg-[#ce3df3] text-white font-semibold rounded-lg">Inscription</button>
                            </li>
                            <li>
                                <button type="button" id="buttonLoginHeader" class="py-[5px] px-2 border-[1px] border-[#ce3df3] rounded-lg">Connexion</button>
                            </li>
                        </ul>
                    </nav>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

