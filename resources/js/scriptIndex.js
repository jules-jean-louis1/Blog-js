// Declaration des variables pour les elements du DOM Register/ Login
// Varaiables presente dans le header de tous les pages
const BtnLogin = document.querySelector('#buttonLoginHeader');
const BtnRegister = document.querySelector('#buttonRegisterHeader');
const formDisplayer = document.querySelector('#formDisplayer');
const btnNoCompte = document.querySelector('#btnNoCompte');

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
function closeModal() {
    let dialog = document.querySelector("#dialog");
    dialog.close();
    dialog.remove();
}


// Evenement pour afficher le formulaire d'inscription
BtnRegister.addEventListener('click', async (ev) => {
    // Créer l'élément dialog
    const dialog = document.createElement('dialog');
    dialog.setAttribute('id', 'dialog');
    dialog.className = 'dialog_modal';
    formDisplayer.appendChild(dialog);
    dialog.innerHTML = '';
    // Affichage du formulaire d'inscription
   await fetch('resources/assests/fetch/register.php')
       .then(response => response.text())
         .then(data => {
            // Insérer le contenu de la réponse dans l'élément dialog
             dialog.innerHTML = data;

             // Afficher le dialog
             dialog.showModal();
             document.addEventListener('click', (ev) => {
                 if (ev.target.id === 'closeDialog') {
                     closeModal();
                 }
             });
         });
        const formRegister = document.querySelector('#resgister-form');
        formRegister.addEventListener('submit', (ev) => {
            ev.preventDefault();
            fetch('resources/assests/fetch/register.php', {
                method: 'POST',
                body: new FormData(formRegister)
            })
            .then(response => response.json())
            .then(data => {
                let message = document.querySelector('#errorMsg');
                if (data.status === 'success') {
                    message.innerHTML = data.message;
                    displaySuccess(message);
                }
                if (data.status === 'empty') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
                if (data.status === 'loginExist') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
                if (data.status === 'passwordInvalid') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
                if (data.status === 'passwordConfirm') {
                    message.innerHTML = data.message;
                    displayError(message);
                }
            });
        });
});

// Evenement pour afficher le formulaire de connexion
BtnLogin.addEventListener('click', async (ev) => {
    // Créer l'élément dialog
    const dialog = document.createElement('dialog');
    dialog.setAttribute('id', 'dialog');
    dialog.className = 'dialog_modal';
    formDisplayer.appendChild(dialog);
    dialog.innerHTML = '';
   await fetch('resources/assests/fetch/login.php')
         .then(response => response.text())
            .then(data => {
                dialog.innerHTML = data;

                // Afficher le dialog
                dialog.showModal();
                document.addEventListener('click', (ev) => {
                    if (ev.target.id === 'closeDialog') {
                        closeModal();
                    }
                });
            });
               const formLogin = document.querySelector('#login-form');
                formLogin.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    fetch('resources/assests/fetch/login.php', {
                        method: 'POST',
                        body: new FormData(formLogin)
                    })
                    .then(response => response.json())
                    .then(data => {
                        let message = document.querySelector('#errorMsg');
                        if (data.status === 'success') {
                            message.innerHTML = data.message;
                            displaySuccess(message);
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        }
                        if (data.status === 'empty') {
                            message.innerHTML = data.message;
                            displayError(message);
                        }
                        if (data.status === 'loginFail') {
                            message.innerHTML = data.message;
                            displayError(message);
                        }
                    });
                });
});


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

async function lastArticles() {
    const containerArticles = document.querySelector('#containerArticleLast');
    await fetch('resources/assests/fetch/index/lastArticles.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(article => {
                let articleElement = document.createElement('div');
                articleElement.className = 'flex w-1/3 p-2';
                articleElement.innerHTML = `
                    <div class="my-5 flex flex-col items-start justify-around bg-[#F5F8FC] rounded-lg ease-in duration-300 p-3 min-h-[20.5rem] border-[1px] border-[#52586633] hover:border-[#525866] hover:shadow-[0 0 10px 0 #525866] cursor-pointer">
                        <div class="flex flex-col items-start justify-between w-full">
                            <h2 class="text-[#525866] text-[1.2rem] font-bold">${article.title}</h2>
                            <p class="text-[#526866a3] text-sm">#${article.category_name}</p>
                            <div class="flex flex-row items-center justify-start space-x-2 py-2">
                                <img src="resources/images/avatar/${article.user_avatar}" alt="${article.login}" class="w-6 h-6 rounded-full">
                                <p class="text-sm">
                                    par <span class="text-[#525866] font-bold text-sm">${article.author_login}</span>
                                </p>
                            </div>
                            <div class="flex flex-col items-start justify-start w-full py-2">
                                <img src="resources/images/articles/${article.img_header}" alt="${article.title}" class="w-full h-[10rem] object-cover rounded-lg">
                            </div>
                        </div>
                        <div class="flex flex-col items-start justify-between w-full">
                            <div class="contentArticleLast">
                                <p>${article.content_preview}</p>
                               
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <a href="article.php?id=${article.id}" class="w-full">
                                <button class="border-[1px] border-[#ac1de4] rounded-lg w-full py-2" id="read-more">Lire la suite</button>
                            </a>
                        </div>
                    </div>
                `;
                containerArticles.appendChild(articleElement);
            });
        });
}
lastArticles();




