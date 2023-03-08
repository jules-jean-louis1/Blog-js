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
// Fonction pour modifier les droits d'un utilisateur


const GetUsers = async () => {
    await fetch('resources/assests/fetch/fetchUserDashboard.php')
        .then(response => response.json())
        .then(data => {
            TableDisplay.innerHTML = '';
            data.forEach(user => {
                let optionHtml = '';
                if (user.droits === 'administrateur') {
                    optionHtml = `
                        <option value="moderateur">moderateur</option>
                        <option value="utilisateur">utilisateur</option>
                    `;
                } else if (user.droits === 'moderateur') {
                    optionHtml = `
                        <option value="administrateur">administrateur</option>
                        <option value="utilisateur">utilisateur</option>
                    `;
                } else if (user.droits === 'utilisateur') {
                    optionHtml = `
                        <option value="administrateur">administrateur</option>
                        <option value="moderateur">moderateur</option>
                    `;
                }
                TableDisplay.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.login}</td>
                    <td>
                        <form action="" method="post" id="updateDroits"  data-id="${user.id}" class="flex">
                            <select name="droits" id="droits" class="p-2 bg-slate-100 rounded-lg">
                                <option value="${user.droits}">${user.droits}</option>
                                ${optionHtml}
                            </select>
                            <div id="btnSubmit">
                                <button type="submit" class="bg-green-500 p-2 rounded-lg text-white" name="btnUpdateDroits" id="btnUpdateDroits">
                                       Modifier
                                </button>
                            </div>
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
    // Ajouter un gestionnaire d'événements de formulaire pour la mise à jour des droits d'utilisateur
    const formUpdate = document.querySelector('#updateDroits');
    formUpdate.addEventListener('submit', (ev) => {
        ev.preventDefault();
        let userId = ev.target.closest('form').getAttribute('data-id');
        let droits = ev.target.querySelector('#droits').value;
        fetch(`resources/assests/fetch/updateDroits.php?id=${userId}&droits=${droits}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    Message.innerHTML = data.message;
                    displaySuccess(Message);
                    GetUsers();
                }
                if (data.status === 'error') {
                    Message.innerHTML = data.message;
                    displayError(Message);
                }
            });
    });
};

GetUsers();