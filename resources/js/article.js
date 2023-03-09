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
        getCategory(category);
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
                let artTitle = document.createElement("h4");
                artTitle.setAttribute("id", "artTitle");
                artTitle.textContent = "Titre : " + element.title;

                let Qcate = document.createElement("p");
                Qcate.setAttribute("id", "Qcate");
                Qcate.textContent = "Catégorie : " + element.category_name;

                let author = document.createElement("p");
                author.setAttribute("id", "author");
                author.textContent = "Auteur : " + element.author_login;

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
search.addEventListener("input", getElement);
//La fonction getElement commence par récupérer la valeur actuelle de l'input en utilisant search.value.