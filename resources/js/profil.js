
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
function formatDateSansh(timestamp) {
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year}`;
}
async function getInfosUser() {
    await fetch('resources/assests/fetch/profil/userInfos.php')
        .then(response => response.json())
        .then(data => {
            let profil = document.querySelector('#formProfil');
            let infos = JSON.parse(data.infos); // convertir la chaîne JSON en un objet JavaScript

            profil.innerHTML = `
        <div>
            <div class="flex flex-col lg:flex-row space-y-2 lg:justify-around lg:space-x-8">
                <div id="containerFormUpdateProfil" class="pt-4">
                    <form action="resources/assests/fetch/profil/updateProfil.php" method="post" id="profilForm"
                          class="flex flex-col space-y-2">
                        <div class="flex flex-col space-y-2">
                            <label for="login">Login</label>
                            <input type="text" name="login" id="login" value="${infos[0].login}"
                                   class="p-2 rounded-lg bg-[#E9E9E9] hover:bg-[#e0e0e0]">
                        </div>
                        <div class="flex flex-col space-y-2">
                            <label for="password">Mot de passe</label>
                            <input type="password" name="password" id="password" class="p-2 rounded-lg bg-[#E9E9E9] hover:bg-[#e0e0e0]">
                        </div>
                        <div class="flex flex-col space-y-2">
                            <label for="passwordConfirm">Confirmation du mot de passe</label>
                            <input type="password" name="passwordConfirm" id="passwordConfirm"
                                   class="p-2 rounded-lg bg-[#E9E9E9] hover:bg-[#e0e0e0]">
                        </div>
                        <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                            <div id="errorMsg"></div>
                        </div>
                        <div class="flex flex-col space-y-2">
                            <button type="submit" id="update" name="update" class="p-2 rounded-xl bg-[#9E15D9] text-white">
                                Update
                            </button>
                        </div>
                    </form>
                </div> 
                <div id="containerFormUpdateAvatar" class="pt-4">
                    <form action="resources/assests/fetch/profil/updateAvatar.php" method="post" id="formUpdateAvatar" class="flex flex-col items-center justify-around h-full" enctype="multipart/form-data">
                        <div id="containerProfilAvatar">
                            <img src="resources/images/avatar/${infos[0].user_avatar}" alt="avatar" class="w-24 h-24 rounded-full">
                        </div>
                        <div class="flex flex-col border-[1px] border-slate-300 p-2 rounded-lg">
                            <label for="avatar">Changer votre avatar</label>
                            <input class="form-control" type="file" name="uploadfile" class="p-2 rounded-xl bg-[#E9E9E9]"/>
                        </div>
                        <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                            <div id="errorMsgAvatar"></div>
                        </div>
                        <div class="w-full">
                            <button type="submit" id="upload" name="upload" class="p-2 rounded-xl bg-[#9E15D9] text-white w-full">
                                Update Avatar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="containerFormDeleteCompte" class="pt-4">
            <div class="border-[1px] border-[#F10606CE] bg-[#DC110128] rounded-2xl p-4">
                <div>
                    <h2 class="text-lg font-normal">La suppression de votre compte entraînera :</h2>
                    <ul class="font-light">
                        <li>1. Suppression définitive de votre compte ainsi que de vos données.</li>
                        <li>2. Suppression définitive de vos commentaires et articles.</li>
                        <li>3. Votre login sera accessible pour les autres utilisateurs.</li>                 
                    </ul> 
                </div>
                <form action="" method="post" id="deleteCompteForm">
                    <div class="flex flex-col space-y-2">
                        <button type="submit" id="deleteCompte" name="deleteCompte" class="p-2 rounded-xl bg-[#c72017] hover:bg-[#bd1911] text-white font-bold ease-in duration-25">
                            Supprimer Votre Compte
                        </button>
                    </div>
                </form>
            </div>
        </div>
            `;
            // Fonction pour supprimer le compte
            const deleteCompteForm = document.querySelector('#deleteCompteForm');
            deleteCompteForm.addEventListener('submit', async (ev) => {
                ev.preventDefault();
                await fetch('resources/assests/fetch/profil/deleteCompte.php', {
                    method: 'POST',
                    body: new FormData(deleteCompteForm)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        let message = document.querySelector('#errorMsg');
                        if (data.status === 'success') {
                            message.innerHTML = data.message;
                            displaySuccess(message);
                            setTimeout(() => {
                                window.location.href = 'index.php';
                            }, 3000);
                        }
                        if (data.status === 'error') {
                            message.innerHTML = data.message;
                            displayError(message);
                        }
                    });
            });
            // fonction pour changer l'avatar
            const profilForm = document.querySelector('#profilForm');
            profilForm.addEventListener('submit', async (ev) => {
                ev.preventDefault();
                await fetch('resources/assests/fetch/profil/updateProfil.php', {
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
                            getInfosUser();
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
            // fonction pour changer l'avatar
            const btnProfilAvatar = document.querySelector('#formUpdateAvatar');
            btnProfilAvatar.addEventListener('submit',  async (ev) => {
                ev.preventDefault();
                await fetch('resources/images/avatar/updateAvatar.php', {
                    method: 'POST',
                    body: new FormData(btnProfilAvatar)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        let message = document.querySelector('#errorMsgAvatar');
                        if (data.status === 'avatarUp') {
                            message.innerHTML = data.message;
                            displaySuccess(message);
                            getInfosUser();
                        }
                        if (data.status === 'error') {
                            message.innerHTML = data.message;
                            displayError(message);
                        }
                    });
            });

        });
}

async function infosDisplay() {
    const containerInfos = document.querySelector('#containerProfileInfo');
    await fetch('resources/assests/fetch/profil/fetchInfosCom.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
           let container = document.createElement('div');
              container.classList.add('flex', 'flex-col', 'space-y-2', 'items-center');
                container.innerHTML = `
              <div id="containerProfilINfo">
                <div class="flex space-x-24">
                    <div class="bg-[#E9E9E9] flex flex-col  space-y-3 items-center p-2 rounded-lg">
                        <img src="resources/images/avatar/${data[0].user_avatar}" alt="avatar" class="w-16 h-16 rounded-full">
                        <div class="flex flex-col">
                            <p class="text-sm font-light text-gray-500">Commentaires</p>
                            <div class="flex justify-center space-x-2">                  
                                 ${data[0].total_comments > 0 ?
                                `<p class="text-lg font-bold">${data[0].total_comments}</p>` :
                                `<p class="text-lg font-bold">0</p>`
                                    }
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start justify-around">
                        <h4 class="text-lg font-bold">${data[0].login}</h4>
                        <p class="p-0.5 px-1 bg-[#E9E9E9] rounded-lg capitalize">${data[0].droits}</p>
                        <h4 class="text-sm font-light text-gray-500">Membre depuis ${formatDateSansh(data[0].member_since)}</h4>
                        <button id="displayFormModif" class="border-[1px] border-black px-4 py-2 rounded-lg font-bold">Modifier vos informations</button>
                    </div>
                </div>
              </div> 
                `;
                const containerComLast = document.querySelector('#lastCommentaires');
                data.forEach(comments =>{

                    let containerCom = document.createElement('li');
                    containerCom.classList.add('flex', 'flex-col', 'space-y-2', 'items-center', 'p-3');
                    if(comments.title !== null) {
                        containerCom.innerHTML += `
                        <div class="flex justify-between px-2 py-2 rounded-lg bg-[#E9E9E9] w-4/5">
                            <div class="flex flex-col">
                                <small>
                                   Titre de l'article :${comments.title}
                                </small>
                                <p>${comments.content}</p>
                            </div>
                            <p class="text-sm font-light text-gray-500 flex items-end">le ${formatDateSansh(comments.created_at)}</p>
                        </div>
                                            `;
                    }else{
                        containerCom.innerHTML += `
                        <div class="flex justify-between px-2 py-2 rounded-lg bg-[#E9E9E9] w-4/5">
                            <div class="flex flex-col items-center justify-center">
                                <p class="p-2">Vous n'avez pas encore posté de commentaire.</p>
                            </div>
                        </div>`;
                    }
                    containerComLast.appendChild(containerCom);
                });

            containerInfos.appendChild(container);

            const btnToggleForm = document.querySelector('#displayFormModif');
            btnToggleForm.addEventListener('click', () => {
                containerComLast.classList.toggle('hidden');
                let profil = document.querySelector('#formProfil');
                if (containerComLast.classList.contains('hidden')) {
                    getInfosUser();
                } else {
                    profil.innerHTML = '';
                }
            });

        });
}
infosDisplay();





