
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
    return `${month} ${day}, ${year}`;
}
async function getInfosUser() {
    await fetch('resources/assests/fetch/profil/userInfos.php')
        .then(response => response.json())
        .then(data => {
            let profil = document.querySelector('#formProfil');
            let infos = JSON.parse(data.infos); // convertir la chaîne JSON en un objet JavaScript

            profil.innerHTML = `

            <div id="containerFormUpdateProfil">
                <form action="resources/assests/fetch/profil/updateProfil.php" method="post" id="profilForm"
                      class="flex flex-col space-y-2">
                    <div class="flex flex-col space-y-2">
                        <label for="login">Login</label>
                        <input type="text" name="login" id="login" value="${infos[0].login}"
                               class="p-2 rounded-lg bg-[#E9E9E9]">
                    </div>
                    <div class="flex flex-col space-y-2">
                        <label for="password">Mot de passe</label>
                        <input type="password" name="password" id="password" class="p-2 rounded-lg bg-[#E9E9E9]">
                    </div>
                    <div class="flex flex-col space-y-2">
                        <label for="passwordConfirm">Confirmation du mot de passe</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm"
                               class="p-2 rounded-lg bg-[#E9E9E9]">
                    </div>
                    <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                        <div id="errorMsg"></div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button type="submit" id="update" name="update" class="p-2 rounded-lg bg-green-500 text-white">
                            Update
                        </button>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button type="submit" id="delete" name="delete" class="p-2 rounded-lg bg-red-500 text-white">
                            Supprimer Compte
                        </button>
                    </div>
                </form>
            </div> 
            <div id="containerFormUpdateAvatar" class="border-[1px] border-slate-300 p-4 rounded-lg">
                <form action="resources/assests/fetch/profil/updateAvatar.php" method="post" id="formUpdateAvatar" class="flex flex-col space-y-2 items-center" enctype="multipart/form-data">
                    <div id="containerProfilAvatar">
                        <img src="resources/images/avatar/${infos[0].user_avatar}" alt="avatar" class="w-24 h-24 rounded-full">
                    </div>
                    <div class="flex flex-col border-[1px] border-slate-300 p-2 rounded-lg">
                        <label for="avatar">Changer votre avatar</label>
                        <input class="form-control" type="file" name="uploadfile" class="p-2 rounded-lg bg-[#E9E9E9]"/>
                    </div>
                    <div id="containerMessageProfil" class="h-[65px] max-w-[330px]">
                        <div id="errorMsgAvatar"></div>
                    </div>
                    <div>
                        <button type="submit" id="upload" name="upload" class="p-2 rounded-lg bg-green-500 text-white">
                            Update Avatar
                        </button>
                    </div>
                </form>
            </div>
            `;
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
                <div class="flex space-x-4">
                    <div class="bg-[#E9E9E9] flex flex-col  space-y-3 items-center p-2 rounded-lg">
                        <img src="resources/images/avatar/${data[0].user_avatar}" alt="avatar" class="w-16 h-16 rounded-full">
                        <div class="flex flex-col">
                            <p class="text-sm font-light text-gray-500">Commentaires</p>
                            <div class="flex justify-center space-x-2">
                                <p class="text-lg font-bold">
                                    ${data[0].total_comments}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start justify-around">
                        <h4 class="text-lg font-bold">${data[0].login}</h4>
                        <h4 class="text-sm font-light text-gray-500">Membre depuis ${formatDateSansh(data[0].member_since)}</h4>
                        <button id="displayFormModif" class="border-[1px] border-black px-4 py-2 rounded-lg font-bold">Modifier vos informations</button>
                    </div>
                </div>
                <div id="lastCommentaires">
                
                </div>
              </div> 
                `;
                data.forEach(comments =>{

                })
            containerInfos.appendChild(container);
        });
}
infosDisplay();

getInfosUser();




