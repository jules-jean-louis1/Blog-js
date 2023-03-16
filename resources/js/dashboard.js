import { formatDate } from './function/function.js';
function toggleMenu() {
    let menuItems = document.getElementById("menuItems");
    if (menuItems.classList.contains("hidden")) {
        menuItems.classList.remove("hidden");
    } else {
        menuItems.classList.add("hidden");
    }
}

const BtnBurgerMenu = document.querySelector('#BtnBurgerMenu');
BtnBurgerMenu.addEventListener('click', toggleMenu);

const TableDisplay = document.querySelector('#tableauTbody');
const Message = document.querySelector('#errorMsg');
const container = document.querySelector('#containerUsers');


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
                <tr class="border-[1px]">
                    <td class="px-4 py-2 text-center border-[1px] hover:bg-[#F5F8FC]">${user.id}</td>
                    <td class="px-4 py-2 text-center border-[1px] hover:bg-[#F5F8FC]">${user.login}</td>
                    <td class="px-4 py-2 border-[1px] hover:bg-[#F5F8FC]">
                        <form action="resources/assests/fetch/updateDroits.php" method="post" id="updateDroits_${user.id}" data-id="${user.id}" class="flex justify-between">
                            <select name="droits" id="droits" class="p-2 bg-slate-100 rounded-lg">
                                <option value="${user.droits}">${user.droits}</option>
                                ${optionHtml}
                            </select>
                            <div id="btnSubmit">
                                <button type="submit" class="border-2 border-green-500 hover:bg-green-500 p-2 rounded-lg hover:text-white duration-100 ease-in"
                                        name="btnUpdateDroits" id="btnUpdateDroits">
                                       Modifier
                                </button>
                            </div>
                        </form>
                    <td class="px-4 py-2 flex justify-center  hover:bg-[#F5F8FC]">
                        ${
                    (user.droits === 'administrateur')
                        ? ''
                        : `<button class="border-2 border-red-500 hover:bg-red-500 p-2 rounded-lg hover:text-white duration-100 ease-in" 
                                    id="deleteUser" data-id="${user.id}" onclick="deleteUsers(${user.id})">
                        Supprimer
                        </button>`
                }
                    </td>
                    <td class="px-4 py-2 text-center border-[1px] hover:bg-[#F5F8FC]">
                        <p>
                            <span>${user.nb_articles}</span>
                        </p>
                    </td>
                    <td class="px-4 py-2 text-center border-[1px] hover:bg-[#F5F8FC]">
                        <p>
                            <span>${user.nb_comments}</span>
                        </p>
                    </td>
                </tr>
                `;
            });
            // Ajouter un gestionnaire d'événements de formulaire pour la mise à jour des droits d'utilisateur
            data.forEach(user => {
                const formUpdate = document.getElementById(`updateDroits_${user.id}`);
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
            });
        });

};
const modifyCategory = async() => {
    const containerCategory = document.querySelector('#containerCategory');
    await fetch('resources/assests/fetch/fetchCategory.php')
        .then(response => response.json())
        .then(data => {
            let optionHtml = '';
            data.forEach(category => {
                optionHtml += `
                    <div class="flex justify-between items-center p-2 rounded-lg">
                        <form action="" method="post" class="flex space-x-2" id="update_${category.id}"  data-id-cat="${category.id}">
                            <input type="text" name="nom" id="nom" placeholder="${category.name}" class="bg-slate-100 rounded-lg p-2">
                            <button type="submit" class="bg-green-500 p-2 rounded-lg text-white" name="btnUpdateCategory" id="btnUpdateCategory_${category.id}">
                                Modifier
                            </button>
                        </form>
                    </div>
            `})
            containerCategory.innerHTML = optionHtml;
            data.forEach(category => {
                const formUpdate = document.getElementById(`update_${category.id}`);
                formUpdate.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    let categoryId = ev.target.closest('form').getAttribute('data-id-cat');
                    let name = ev.target.querySelector('#nom').value;
                    fetch(`resources/assests/fetch/updateCategory.php?id=${categoryId}&name=${name}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'success') {
                                Message.innerHTML = data.message;
                                displaySuccess(Message);
                                modifyCategory();
                            }
                            if (data.status === 'error') {
                                Message.innerHTML = data.message;
                                displayError(Message);
                            }
                        });
                });
            });
        });
}

// filter les utilisateurs par login /Article /Commentaires

const article = document.querySelector('#article');
const comment = document.querySelector('#comment');
const categoryForm = document.querySelector('#categoryForm');

// fonction pour afficher les différentes catégories
function  getCategoryForForm(category) {
    fetch('resources/assests/fetch/fetchCategory.php')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                category.innerHTML += `<option value="${data[i].id}">${data[i].name}</option>`;
            }
        })
}
const login = document.querySelector('#loginFormComment');
function loginSelect(optionLogin) {
    fetch('resources/assests/fetch/dashboard/getLoginUser.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(infos => {
                optionLogin.innerHTML += `<option value="${infos.id}">${infos.login}</option>`;
            });
        })
}

function getArticleForForm(article) {
    fetch('resources/assests/fetch/dashboard/getTitleArticle.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                article.innerHTML += `<option value="${element.id}">${element.title}</option>`;
            });
        })
}
function getCommentForForm(comment) {
fetch('resources/assests/fetch/dashboard/getAllComment.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                comment.innerHTML += `<option value="${element.id}">${element.content}</option>`;
            });
        })
}

async function filterUsers() {
    const formFilter = document.getElementById('containerFiltreUsers');
    const formFilterContainer = document.createElement('div');
    formFilterContainer.classList.add('flex', 'justify-between', 'items-center', 'space-x-2', 'p-2', 'rounded-lg', 'bg-slate-100');
    formFilterContainer.setAttribute('id', 'formFilterContainer');
    formFilterContainer.innerHTML = `
        <form action="" method="post" class="flex flex-col space-y-2" id="formFilter">
            <select name="loginFormComment" id="loginFormComment" class="bg-slate-100 rounded-lg p-2">
            </select>
            <select name="articleFormComment" id="articleFormComment" class="bg-slate-100 rounded-lg p-2">
            </select>
        </form>
    `;
    formFilter.appendChild(formFilterContainer);
    const article = document.querySelector('#articleFormComment');
    const login = document.querySelector('#loginFormComment');
    await loginSelect(login);
    await getArticleForForm(article);
}
async function filterComment(login, article) {
    const params = new URLSearchParams();
    params.append('login', login);
    params.append('article', article);
    await fetch(`resources/assests/fetch/dashboard/filterFormComm.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            container.innerHTML = '';
            if (data.status === 'error') {
                container.innerHTML = `
                    <div class="flex justify-between items-center p-2 rounded-lg">
                        <p>Aucun résultat</p>
                    </div>
                `;
            } else {
                data.forEach(element => {
                    container.innerHTML += `
                        <div class="flex justify-around items-center p-2 rounded-lg w-full py-2 hover:bg-slate-100">
                            <div class="flex justify-between w-full">
                                <div class="flex flex-col">
                                <small><span class="text-slate-400 text-sm">Commentaires :</span></small>
                                    <p>${element.content}</p>
                                </div>
                                <p class="text-slate-400 text-sm pr-2">${formatDate(element.created_at)}</p>
                            </div>
                            <form action="" method="post" id="formForDeleteComments">
                                <input type="hidden" name="comments_id" value="${element.comments_id}">
                                <button type="submit" class="bg-red-500 p-2 rounded-lg text-white" name="btnDeleteComment">
                                    Supprimer
                                </button>
                            </form>
                        </div>
                    `;
                    const deleteCommentForms = document.querySelectorAll('#formForDeleteComments');
                    deleteCommentForms.forEach(form => {
                        form.addEventListener('submit', async (event) => {
                            event.preventDefault();
                            const commentId = event.target.elements.comments_id.value;
                            await fetch(`resources/assests/fetch/dashboard/deleteComment.php?id=${commentId}`, {method: 'DELETE'})
                                .then(response => response.json())
                                .then(data => {
                                    if (data.status === 'success') {
                                        Message.innerHTML = data.message;
                                        displaySuccess(Message);
                                        filterComment();
                                    }
                                    if (data.status === 'error') {
                                        Message.innerHTML = data.message;
                                        displayError(Message);
                                    }
                                })
                        })
                    });
                });
            }
        })
}


filterUsers();
const formFilter = document.getElementById('formFilter');
formFilter.addEventListener('change', (ev) => {
    const login = document.querySelector('#loginFormComment').value;
    const article = document.querySelector('#articleFormComment').value;
    filterComment(login, article)
})

modifyCategory();


GetUsers();