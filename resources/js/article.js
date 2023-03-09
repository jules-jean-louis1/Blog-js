import { displayError, displaySuccess ,formatDate } from './function/function.js';

const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const formCreateArticle = document.querySelector('#form-modal-article');

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
        openModal(modal);
    });
});
closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

formCreateArticle.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('resources/assests/fetch/createArticle.php', {
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
            else if (data.status == 'empty') {
                message.innerHTML = data.message;
                displayError(message);
            }
        })
});

function  getCategory () {
    fetch('resources/assests/fetch/fetchCategory.php')
        .then(response => response.json())
        .then(data => {
            let category = document.querySelector('#category');
            let category2 = document.querySelector('#category2');
            data.forEach(element => {
                category.innerHTML += `<option value="${element.name}">${element.name}</option>`;
                category2.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });
        })
}
getCategory();