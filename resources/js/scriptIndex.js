// Declaration des variables pour les elements du DOM Register/ Login
// Varaiables presente dans le header de tous les pages
const BtnLogin = document.querySelector('#buttonLoginHeader');
const BtnRegister = document.querySelector('#buttonRegisterHeader');

BtnRegister.addEventListener('click', async (ev) => {
    // Affichage du formulaire d'inscription
   await fetch('resources/assests/fetch/register.php')
       .then(response => response.text())
         .then(data => {
            document.querySelector('#formDisplayer').innerHTML = data;
         });
});