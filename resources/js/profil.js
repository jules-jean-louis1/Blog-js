const profilForm = document.querySelector('#updateprofil-form');
const btnProfilAvatar = document.querySelector('#formUpdateAvatar');

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
   fetch('resources/assests/fetch/profil/updateProfil.php', {
       method: 'POST',
       body: new FormData(profilForm)
   })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let message = document.querySelector('#errorMsg');
        if (data.status === 'loginUp') {
            message.innerHTML = data.message;
            displaySuccess(message);
        }
        if (data.status === 'passwordUp') {
            message.innerHTML = data.message;
            displaySuccess(message);
        }
        if (data.status === 'error') {
            message.innerHTML = data.message;
            displayError(message);
        }
        if (data.status === 'empty') {
            message.innerHTML = data.message;
            displayError(message);
        }
        if (data.status === 'delete') {
            message.innerHTML = data.message;
            displaySuccess(message);
            window.location.href = 'index.php';
        }
    });
});

btnProfilAvatar.addEventListener('submit',  async (ev) => {
    ev.preventDefault();
    await fetch('resources/assests/fetch/profil/updateAvatar.php', {
        method: 'POST',
        body: new FormData(btnProfilAvatar)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let message = document.querySelector('#errorMsg');
        if (data.status === 'success') {
            message.innerHTML = data.message;
            displaySuccess(message);
            window.location.href = 'index.php';
        }
        if (data.status === 'error') {
            message.innerHTML = data.message;
            displayError(message);
        }
    });
});