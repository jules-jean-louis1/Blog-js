import { displayError, displaySuccess ,formatDate } from './function/function.js';

const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const formCreateArticle = document.querySelector('#form-modal-article');
const category2 = document.querySelector('#category2');
const search = document.querySelector("#searchInput");

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
                let result = document.createElement("div");
                result.setAttribute("id", "result");
                result.setAttribute("class", "hover:bg-gray-100 cursor-pointer p-2 my-[2px] rounded-lg border-[1px] border-[#52586633]");
                let artTitle = document.createElement("h4");
                artTitle.setAttribute("id", "artTitle");
                artTitle.textContent = "Titre : " + element.title;

                let Qcate = document.createElement("p");
                Qcate.setAttribute("id", "Qcate");
                Qcate.textContent = "Catégorie : " + element.category_name;

                let author = document.createElement("p");
                author.setAttribute("id", "author");
                author.textContent = "Auteur : " + element.author_login;

                result.addEventListener("click", () => {
                    window.location.href = "search.php?id=" + element.id;
                });
                // Ajouter les éléments HTML créés à la page
                results.appendChild(result);
                result.appendChild(artTitle);
                result.appendChild(Qcate);
                result.appendChild(author);

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


