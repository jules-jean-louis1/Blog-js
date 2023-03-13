<div id="containerHeader" class="mx-4">
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
                        <?php if ($_SESSION['droits'] == 'administrateur') : ?>
                            <li>
                                <a href="dashboard.php">
                                    <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 bg-green-500 flex items-center rounded-lg text-white">
                                        <img src="resources/images/icon/settings.svg" class="h-[1.2em] filter-white">
                                        <span>Dashboard</span>
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a href="profil.php">
                                    <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 rounded-lg bg-[#F5F8FC]">
                                        <?= $_SESSION['login'] ?>
                                    </button>
                                </a>
                            </li>
                        <?php else: ?>
                            <li>
                                <a href="profil.php">
                                    <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 rounded-lg bg-[#F5F8FC]">
                                        <?= $_SESSION['login'] ?>
                                    </button>
                                </a>
                            </li>
                        <?php endif; ?>
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

