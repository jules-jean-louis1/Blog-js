<?php

?>

<div class="modal">
    <div class="modal-content">
        <form action="" method="post" id="form-dialog-article">
            <div id="warpperArticleDialog">
                <div class="flex flex-col">
                    <h3 class="text-2xl font-bold">
                        <span>Créer un article</span>
                    </h3>
                </div>
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