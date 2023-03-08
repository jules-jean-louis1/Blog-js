const TableDisplay = document.querySelector('#tableauTbody');

// Fonction pour supprimer un utilisateur
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
                        <button class="bg-red-500 p-2 rounded-lg text-white" id="deleteUser" data-id="${user.id}" onclick="deleteUser(${user.id})">
                            Supprimer
                        </button>
                    </td>
                </tr>
                `;
            });
        });
};
GetUsers();