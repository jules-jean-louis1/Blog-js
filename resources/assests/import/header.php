<div id="containerHeader" class="mx-4">
    <div id="wapperHeader" class="flex justify-between items-center p-2">
        <div id="logo" class="p-2 rounded-lg bg-slate-100 font-bold">
            <a href="index.php" class="flex space-x-2">
                <img src="resources/images/icon/LC.png" class="h-[1.5em] ">
                <h1>Option 13</h1>
            </a>
        </div>
        <div id="linksHeader" class="hidden md:block">
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
                                    <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 rounded-lg bg-[#F5F8FC] flex items-center ease-in duration-300 border-[1px] border-[#52586633] hover:border-[#525866] hover:shadow-[0 0 10px 0 #525866]">
                                        <img src="resources/images/icon/user1.svg" class="h-[1.2em] px-[1px]">
                                        <?= $_SESSION['login'] ?>
                                    </button>
                                </a>
                            </li>
                        <?php else: ?>
                            <li>
                                <a href="profil.php">
                                    <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 rounded-lg bg-[#F5F8FC] flex items-center ease-in duration-300 border-[1px] border-[#52586633] hover:border-[#525866] hover:shadow-[0 0 10px 0 #525866]">
                                        <img src="resources/images/icon/user1.svg" class="h-[1.2em] px-[1px]">
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
        <div id="menuButton" class="md:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-black border-black" id="BtnBurgerMenu">
                    <svg class="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z"/>
                    </svg>
                </button>
        </div>
    </div>
    <div id="menuItems" class="lg:hidden md:block">
        <?php if (isset($_SESSION['login']) != null) : ?>
            <nav>
                <ul class="flex flex-col items-center space-y-2 justify-center">
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
                                <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 rounded-lg bg-[#F5F8FC] flex">
                                    <img src="resources/images/icon/user1.svg" class="h-[1.2em]">
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
                <ul class="flex flex-col items-center space-y-2">
                    <li class="w-full">
                        <a href="article.php">
                            <button type="button" id="buttonArticle" class="py-[5px] px-2 rounded-lg bg-[#0e1217] ease-in duration-100 w-full hover:bg-[#2d313a] font-semibold text-white">
                                <span>Tous les articles</span>
                            </button>
                        </a>
                    </li>
                    <li class="w-full">
                        <button type="button" id="buttonRegisterHeader" class="py-[5px] px-2 bg-[#ce3df3] text-white font-semibold rounded-lg w-full">Inscription</button>
                    </li>
                    <li class="w-full">
                        <button type="button" id="buttonLoginHeader" class="py-[5px] px-2 border-[1px] border-[#ce3df3] rounded-lg w-full">Connexion</button>
                    </li>
                </ul>
            </nav>
        <?php endif; ?>
    </div>
</div>

