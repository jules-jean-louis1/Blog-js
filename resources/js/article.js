import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import { formatDate } from './function/function.js';
import { loginFormHeader } from './function/function.js';
import { registerHeader } from './function/function.js';
import { toggleMenu } from './function/function.js';
import { closeModalDialog } from './function/function.js';

// Varaiables presente dans le header de tous les pages
const BtnLogin = document.querySelector('#buttonLoginHeader');
const BtnRegister = document.querySelector('#buttonRegisterHeader');
const formDisplayer = document.querySelector('#formDisplayer');

// Récupérer l'ID à partir de la query string
const searchParams = new URLSearchParams(window.location.search);
const page = searchParams.get("page");

const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const formCreateArticle = document.querySelector('#form-modal-article');
const category2 = document.querySelector('#category2');
const search = document.querySelector("#searchInput");
const BtnFilter = document.querySelector("#buttonFilterArticle");
const formFilterArticles = document.querySelector("#FormFilterArticles");


const BtnBurgerMenu = document.querySelector('#BtnBurgerMenu');
BtnBurgerMenu.addEventListener('click', toggleMenu);

const openModal = (modal) => {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

const closeModal = (modal) => {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
openModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        let category = document.querySelector('#category');
        getCategoryForForm (category);
        openModal(modal);
    });
});
closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

if (formCreateArticle) {
    formCreateArticle.addEventListener('submit', async (e) => {
        e.preventDefault();
        await fetch('resources/assests/fetch/createArticle.php', {
            method: 'POST',
            body: new FormData(formCreateArticle)
        })
            .then(response => response.json())
            .then(data => {
                let message = document.querySelector('#errorMsg');
                if (data.status == 'success') {
                    message.innerHTML = data.message;
                    displaySuccess(message);
                    const modal = document.querySelector('#modal-article');
                    closeModal(modal);
                }
                if (data.status == 'empty') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
                if (data.status == 'error') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
            })
    });
}

// Fonction pour la récupération des catégories
function  getCategory (category) {
    fetch('resources/assests/fetch/fetchCategory.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                category.innerHTML += `<option value="${element.name}">${element.name}</option>`;
            });
        })
}
function  getCategoryForForm (category) {
    fetch('resources/assests/fetch/fetchCategory.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                category.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });
        })
}

getCategory(category2);

// Fonction pour la recherche d'article
async function getElement() {
    let query = search.value;
    await fetch('resources/assests/fetch/searchArticle.php?query='+query)
    .then(response => response.json())
    .then(data => {
        let results = document.querySelector("#results");
        results.innerHTML = "";
        if (data.status == "empty") {
            let result = document.createElement("div");
            result.setAttribute("id", "results");
            result.innerHTML = data.message;
            results.appendChild(result);
        } else {
            for (const element of data.articles) {
                // Créer les éléments HTML avec les informations de l'article
                let result = document.createElement("li");
                result.setAttribute("id", "result");
                result.setAttribute("class", "hover:bg-gray-100 cursor-pointer p-2 my-[2px] rounded-lg border-[1px] border-[#52586633]");
                let artTitle = document.createElement("h4");
                artTitle.setAttribute("id", "artTitle");
                artTitle.setAttribute("class", "font-bold");
                artTitle.textContent = element.title;

                // Div pour les catégories + auteur
                let divCate = document.createElement("div");
                divCate.setAttribute("class", "flex flex-row space-x-2 items-center mt-2");

                let Qcate = document.createElement("p");
                Qcate.setAttribute("id", "Qcate");
                Qcate.setAttribute("class", "text-[#525866] text-sm");
                Qcate.textContent = "#" + element.category_name;

                let author = document.createElement("p");
                author.setAttribute("id", "author");
                author.textContent = "Par " + element.author_login;

                result.addEventListener("click", () => {
                    window.location.href = "search.php?id=" + element.id;
                });
                // Ajouter les éléments HTML créés à la page
                results.appendChild(result);
                result.appendChild(artTitle);
                result.appendChild(divCate);
                divCate.appendChild(author);
                divCate.appendChild(Qcate);

            }
        }
        if (query == "") {
            results.innerHTML = "";
        }
    })
}
//La fonction getElement commence par récupérer la valeur actuelle de l'input en utilisant search.value.
search.addEventListener("input", getElement);

// Fonction pour la récupération des articles quand on clique dessus
async function getArticle(id) {
    await fetch('resources/assests/fetch/articles/fetchDisplayArticle.php?id=' + id)
        .then(response => response.json())
        .then(data => {
          let article = document.querySelector("#article");
          if (data.status === 'empty') {
            article.innerHTML = data.message;
          } else {
              let articleHTML = "";
              for (const art of data.articles) {
                  // Créer le contenu HTML pour l'article
                  articleHTML += `
                    <div id="containerDarticles" class="flex">
                      <div id="iconeMoreSearch">
                        <div id="comentaireArticleMoreSearch"></div>
                      </div>
                      <div id="articlesMoreSearch" class="flex flex-col">
                        <div id="infoPost" class="flex flex-col">
                          <h2>${art.author_login}</h2>
                          <p class="flex flex-row">
                            Poster le <time class="date">${art.created_at}</time>
                            MaJ le <time class="date">${art.updated_at}</time>
                          </p>
                        </div>
                        <div id="title_articleMoreSearch">
                          <h1>${art.title}</h1>
                        </div>
                        <div id="content_articleMoreSearch">
                          <p>${art.content}</p>
                        </div>
                        <div id="commentsOfArticles"></div>
                      </div>
                      <div id="infoMoreSearch"></div>
                    </div>
                  `;
              }
                article.innerHTML = articleHTML;
          }
        })
}

// Fonction pour afficher le nombre de pages
async function getPages(category, order) {
    const params = new URLSearchParams();
    params.append("category2", category);
    params.append("order", order);
    await fetch(`resources/assests/fetch/articles/countPage.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            let pages = document.querySelector("#pages");
            let pagesHTML = "";
            for (let i = 0; i < data.pages.length; i++) {
                const page = data.pages[i];
                if(page > 0) {
                    pagesHTML += `
                            <li class="page-item border-[1px] p-2 rounded-lg">
                                <!--Penser a changer le href pour la page pour index-->
                                <a class="page-link" href="article.php?page=${page}">${page}</a>
                            </li>
                          `;
                }

                pages.innerHTML = pagesHTML;
                }

        })
}

let category = 'all';
let order = 'DESC';
async function getArticles(page, category, order) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("category2", category);
    params.append("order", order);

    const response = await fetch(`resources/assests/fetch/articles/getArticles.php?${params.toString()}`);
    const data = await response.json();

    let articlesDisplay = document.querySelector("#articlesContainerDisplay");
    articlesDisplay.innerHTML = "";
    if (data.status === 'find') {
        for (const articles of data.articles) {
            // Créer le contenu HTML pour l'article
            let articleContainer = document.createElement("div");
            articleContainer.setAttribute("class", "my-5 flex flex-col items-start justify-around bg-[#F5F8FC] rounded-lg ease-in duration-300 lg:w-[30%] p-3 min-h-[20.5rem]" +
                " border-[1px] border-[#52586633] hover:border-[#525866] hover:shadow-[0 0 10px 0 #525866] cursor-pointer");
            //Conteneur de l'article
            let articleContainerInfos = document.createElement("div");
            articleContainerInfos.setAttribute("class", "flex flex-col items-start justify-between w-full");

                // Titre de l'article
                let articleTitle = document.createElement("h2");
                articleTitle.setAttribute("class", "font-bold text-xl");
                articleTitle.textContent = articles.title;
                // Catégorie de l'article
                let articleCategory = document.createElement("p");
                articleCategory.setAttribute("class", "text-[#526866a3] text-sm");
                articleCategory.textContent = "#" + articles.category_name;
                // Conteneur de l'auteur de l'article
                    let containerLoginAvatar = document.createElement("div");
                    containerLoginAvatar.setAttribute("class", "flex flex-row items-center justify-start space-x-2 py-2");
                        // Avatar de l'auteur de l'article
                        let articleAvatar = document.createElement("img");
                        articleAvatar.setAttribute("class", "w-6 h-6 rounded-full");
                        articleAvatar.setAttribute("src", "resources/images/avatar/" + articles.user_avatar);
                        // Auteur de l'article
                        let articleAuthor = document.createElement("p");
                        articleAuthor.setAttribute("class", "text-[#525866] text-sm");
                        articleAuthor.textContent = articles.author_login;
                // Date de création de l'article
                let articleCreatedAt = document.createElement("p");
                articleCreatedAt.setAttribute("class", "text-[#525866] text-sm py-2");
                articleCreatedAt.textContent = formatDate(articles.created_at);
            // Date de mise à jour de l'article
            /*let articleUpdatedAt = document.createElement("p");
            articleUpdatedAt.setAttribute("class", "text-[#525866] text-sm");
            articleUpdatedAt.textContent = "Mise à jour le " + articles.updated_at;*/
            // Contenu de l'article (preview)
                let articleContent = document.createElement("div");
                articleContent.setAttribute("class", "flex flex-col items-start justify-start w-full py-2");
                // Image de l'article
                let articleImg = document.createElement("img");
                articleImg.setAttribute("class", "w-full h-[10rem] object-cover rounded-lg");
                articleImg.setAttribute("src", "resources/images/articles/" + articles.img_header);

            // Bouton pour lire l'article
            let articleRead = document.createElement("a");
            articleRead.setAttribute("class", "rounded-lg bg-[#0e1217] ease-in duration-100"+
                                                               "hover:bg-[#2d313a] font-semibold text-white py-[5px] px-2");
            articleRead.setAttribute("href", "search.php?id=" + articles.id);
            articleRead.textContent = "Lire l'article";

            // Ajouter le contenu HTML à la page
            articlesDisplay.appendChild(articleContainer);
            articleContainer.appendChild(articleContainerInfos);
            articleContainerInfos.appendChild(articleTitle);
            articleContainerInfos.appendChild(articleCategory);
            articleContainerInfos.appendChild(containerLoginAvatar);
            containerLoginAvatar.appendChild(articleAvatar);
            containerLoginAvatar.appendChild(articleAuthor);
            articleContainerInfos.appendChild(articleCreatedAt);
            // articleContainer.appendChild(articleUpdatedAt);
            articleContainer.appendChild(articleContent);
            articleContent.appendChild(articleImg);
            articleContainer.appendChild(articleRead);
        }
    } else {
        let articleContainer = document.createElement("div");
        articleContainer.setAttribute("class", "flex flex-col items-center");
        articleContainer.textContent = data.message;

        // Ajouter le contenu HTML à la page
        articlesDisplay.appendChild(articleContainer);
    }
    getPages(category, order);
}

getArticles(page, category, order);

formFilterArticles.addEventListener("change", (ev) => {
    ev.preventDefault();
    const formData = new FormData(formFilterArticles);
    const category = formFilterArticles.querySelector("#category2").value;
    const order = formFilterArticles.querySelector("#order").value;
    getArticles(page, category, order);
});

loginFormHeader(BtnLogin);
registerHeader(BtnRegister);
