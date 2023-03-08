const TableDisplay = document.querySelector('#tableauTbody');
const Message = document.querySelector('#errorMsg');
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
// Fonction pour supprimer un utilisateur
function deleteUsers(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        fetch(`resources/assests/fetch/deleteUser.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    Message.innerHTML = data.message;
                    displaySuccess(Message);
                    GetUsers();
                }
                if (data.status === 'error') {
                    displayError(Message);
                    Message.innerHTML = data.message;
                }
            });
    }
}

const GetUsers = async () => {
    await fetch('resources/assests/fetch/fetchUserDashboard.php')
        .then(response => response.json())
        .then(data => {
          TableDisplay.innerHTML = '';
            data.forEach(user => {
                TableDisplay.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.login}</td>
                    <td>
                        <form action="" method="post">
                            <input type="hidden" name="id" value="${user.id}">
                            <select name="droits" id="droits" class="p-2 bg-slate-100 rounded-lg">
                                <option value="">${user.droits}</option>
                                <option value="administrateur">administrateur</option>
                                <option value="utilisateur">utilisateur</option>
                        </form>
                    </td>
                    <td>
                        <button class="bg-red-500 p-2 rounded-lg text-white" id="deleteUser" data-id="${user.id}" onclick="deleteUsers(${user.id})">
                            Supprimer
                        </button>
                    </td>
                </tr>
                `;
            });
        });
};
GetUsers();