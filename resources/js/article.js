import { displayError, displaySuccess ,formatDate } from './function/function.js';

const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const formCreateArticle = document.querySelector('#form-modal-article');
const category2 = document.querySelector('#category2');

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