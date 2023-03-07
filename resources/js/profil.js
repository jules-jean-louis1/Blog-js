const profilForm = document.querySelector('#updateprofil-form');

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
profilForm.addEventListener('submit', (ev) => {
   ev.preventDefault();
   fetch('profil.php', {
       method: 'POST',
       body: new FormData(profilForm)
   })
    .then(response => response.json())
    .then(data => {
        let message = document.querySelector('#errorMsg');
        if (data.status === 'loginUp') {
            message.innerHTML = data.message;
            displaySuccess(message);
        }
        if (data.status === 'passwordUp') {
            message.innerHTML = data.message;
            displayError(message);
        }
        if (data.status === 'error') {
            message.innerHTML = data.message;
            displayError(message);
        }
    });
});