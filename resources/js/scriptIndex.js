// Declaration des variables pour les elements du DOM Register/ Login
// Varaiables presente dans le header de tous les pages
const BtnLogin = document.querySelector('#buttonLoginHeader');
const formDisplayer = document.querySelector('#formDisplayer');
const BtnRegister = document.querySelector('#buttonRegisterHeader');


BtnRegister.addEventListener('click', async (ev) => {
    // Affichage du formulaire d'inscription
   await fetch('resources/assests/fetch/register.php')
       .then(response => response.text())
         .then(data => {
             formDisplayer.innerHTML = data;
             // Ajouter le formulaire au dialog
             const dialog = formDisplayer.parentNode;
             const registerForm = formDisplayer.querySelector('#registerForm');
             dialog.appendChild(registerForm);
             dialog.showModal();
         });
});