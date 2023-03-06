// Declaration des variables pour les elements du DOM Register/ Login
// Varaiables presente dans le header de tous les pages
const BtnLogin = document.querySelector('#buttonLoginHeader');
const BtnRegister = document.querySelector('#buttonRegisterHeader');
const formDisplayer = document.querySelector('#formDisplayer');

// Fonction pour la gestion des messages d'erreurs
function displayError(message) {
    message.classList.add('alert-danger');
    message.classList.remove('alert-success');
}
// Fonction pour la gestion des messages de success
function displaySuccess(message) {
    message.classList.add('alert-success');
    message.classList.remove('alert-danger');
}
// Evenement pour afficher le formulaire d'inscription
BtnRegister.addEventListener('click', async (ev) => {
    // Affichage du formulaire d'inscription
   await fetch('resources/assests/fetch/register.php')
       .then(response => response.text())
         .then(data => {
            formDisplayer.innerHTML = data;
         });
        const formRegister = document.querySelector('#resgister-form');
        formRegister.addEventListener('submit', (ev) => {
            ev.preventDefault();
            fetch('resources/assests/fetch/register.php', {
                method: 'POST',
                body: new FormData(formRegister)
            })
            .then(response => response.json())
            .then(data => {
                let message = document.querySelector('#errorMsg');
                if (data.status === 'success') {
                    message.innerHTML = data.message;
                    displaySuccess(message);
                }
                if (data.status === 'emptyFlieds') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
                if (data.status === 'loginExist') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
                if (data.status === 'passwordInvalid') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
                if (data.status === 'passwordConfirm') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
            });
        });
});