import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import { formatDate } from './function/function.js';
import { loginFormHeader } from './function/function.js';
import { registerHeader } from './function/function.js';
import { toggleMenu } from './function/function.js';



const formCommentDisplay = document.querySelector("#commentFormDisplay");
const BtnLogin = document.querySelector('#buttonLoginHeader');
const BtnRegister = document.querySelector('#buttonRegisterHeader');
const btnNoConnect = document.querySelector('#NotConnected');
const btnEdit = document.querySelector('#editArticleBtn');


const BtnBurgerMenu = document.querySelector('#BtnBurgerMenu');
BtnBurgerMenu.addEventListener('click', toggleMenu);

// Récupérer l'ID à partir de la query string
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");


// Fonction pour verifier si l'utilisateur est connecté
if (btnNoConnect) {
    loginFormHeader(btnNoConnect);
}
if (BtnLogin) {
    loginFormHeader(BtnLogin);
}
if (BtnRegister) {
    registerHeader(BtnRegister);
}

// Fonction qui recupère l'id du commentaire pour répondre
function  replyComment(commentId) {
    document.querySelector("#commentId").value = commentId;
    document.getElementById("comment").focus();
}
// Fonction pour recupérer si l'utilisateur a des droits pour modifier ou supprimer un commentaire
async function getRights() {
    await fetch('resources/assests/fetch/articles/get_droits.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                return true;
            } else {
                return false;
            }
        });
}


// Fonction pour la récupération des articles quand on clique dessus
async function getArticle(id) {
    await fetch('resources/assests/fetch/articles/fetchDisplayArticle.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            let articleHTML = "";
            let article = document.querySelector("#article");
            if (data.status === 'empty') {
                article.innerHTML = data.message;
            } else {
                let art = data.articles;
                // accéder directement à l'objet article
                let formattedDateC = formatDate(art.created_at);
                let formattedDateU = formatDate(art.updated_at);
                articleHTML = `
          <div id="containerDarticles" class="flex justify-center">
                <div class="p-2 h-full">
                    <div id="iconeMoreSearch" class="h-[41%] pb-2 ">
                        <div id="comentaireArticleMoreSearch" class="w-full h-full">
                            <img src="resources/images/articles/${art.img_header}" alt="img_${art.img_header}" class="w-full h-full object-cover rounded-t-2">
                        </div>
                    </div>
                    <div id="articlesMoreSearch" class="flex flex-col">
                      <div id="infoPost" class="flex flex-col">
                        <div id="loginInfoContainer" class="flex items-center space-x-2">
                            <img src="resources/images/avatar/${art.user_avatar}" alt="avatar" class="w-9 h-9 rounded-full">
                            <h2 class="text-xl font-bold">${art.author_login}</h2>
                        </div>
                        
                        <p class="flex flex-row space-x-2">
                          <span class="text-sm text-slate-400">Poster · <time class="date">${formattedDateC}</time></span>`
                        if (art.updated_at != null) {
                            articleHTML += `
                          <span class="text-sm text-slate-400">- MaJ le <time class="date">${formattedDateU}</time></span>
                            `;
                        }
                        articleHTML += `
                        </p>
                        <p class="flex flex-row">
                            <span class="bg-[#EAEBEC] rounded-lg p-[1px] text-[#526866a3] font-bold">#${art.category_name}</span>
                        </p>
                      </div>
                      <div id="title_articleMoreSearch" class="my-2 p-2 rounded-lg">
                            <h1 class="text-4xl font-bold">${art.title}</h1>
                      </div>
                      <div id="content_articleMoreSearch" class="m-2 p-2 rounded-lg">
                            <p>${art.content}</p>
                      </div>
                    </div>
                    <div id="infoMoreSearch"></div>
                </div>
          </div>
        `;
                article.innerHTML = articleHTML;
            }
        })
}

// fonction pour afficher le button modifier et supprimer si l'utilisateur est connecté
function displayEditBtn() {
    fetch('resources/assests/fetch/comments/editCom.php')
        .then(response => response.text())
        .then(data => {
            if (data === comment.login) {
                return true;
            } else {
                return false;
            }
        })
}



// Fonction de récupération des commentaires quand le parent_id = 0
async function getComments(id) {
    let commentaires = document.querySelector("#commentsOfArticles");
    await fetch('resources/assests/fetch/comments/listComments.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            commentaires.innerHTML = "";
            if(data.status === 'empty') {
                 let emptyComment = document.createElement("div");
                    emptyComment.classList.add("flex", "flex-col", "border-[1px]", "border-[#a8b3cf]", "rounded-lg", "shadow-md", "bg-[#fff]", "hover:bg-[#EAEBEC]", "p-4", "m-4");
                    emptyComment.setAttribute("id", "commentRow");
                    emptyComment.innerHTML = data.message;
                    commentaires.appendChild(emptyComment);
            } else {
                console.log(data);
                let comments = data.comments;
                comments.forEach(comment => {
                    // vérifier si le commentaire est un commentaire parent
                    if (comment.parent_comment_id == 0) {
                        const commentDiv = document.createElement('div');
                        commentDiv.classList.add("flex", "flex-col", "border-[1px]", "border-[#a8b3cf]", "rounded-lg", "shadow-md", "bg-[#fff]", "hover:bg-[#f3f3f3]", "p-4", "m-4");
                        commentDiv.setAttribute("id", "commentRow");
                        commentDiv.innerHTML = `
                          <div class="flex flex-col space-x-2 justify-start" id="commentInfo">
                            <div class="flex flex-row items-center space-x-2">
                                <img src="resources/images/avatar/${comment.user_avatar}" class="h-7 w-7 rounded-full object-cover object-center" alt="">
                                <span class="font-bold text-[#000]" id="commentAuthor">${comment.login}</span>
                            </div>
                            <span class="text-sm text-[#526866a3]" id="commentDate">${formatDate(comment.created_at)}</span>
                          </div>
                          <div class="m-2 p-2 rounded-lg" id="commentContent">
                            <p class="font-sm text-[#000]" id="commentContentP">${comment.content}</p>
                          </div>
                          <div id="commentButtons" class="flex flex-row justify-end">
                                <button class="hover:bg-[#1ddc6f3d] text-white font-bold p-2 rounded-lg" id="commentReplyButton">
                                  <img src="resources/images/icon/comments.svg" class="green-reply" alt="commentIcon">
                                </button>
                                <!--<button class="hover:bg-[#0dcfdc3d] text-white font-bold p-2 rounded-lg" id="commentEditButton">
                                  <img src="resources/images/icon/edit1.svg" class="blue-edit" alt="editBtn">
                                </button>
                                <button class="hover:bg-[#5E0700] text-white font-bold p-2 rounded-lg" id="commentDeleteButton">
                                  <img src="resources/images/icon/trashcan.svg" alt="delete" class="red-delete">
                                </button>-->
                          </div>
                          <ul id="replyList" class="ml-8 mb-4"></ul>
                        `;
                        // Ajout fonction sur les boutons
                        const commentReplyButton = commentDiv.querySelector('#commentReplyButton');
                        commentReplyButton.addEventListener('click', function () {
                            replyComment(comment.id);
                        });
                        // parcourir les commentaires en réponse pour trouver les réponses à ce commentaire parent
                        comments.forEach(reply => {
                            if (reply.parent_comment_id === comment.id) {
                                const responseDiv = document.createElement('li');
                                responseDiv.classList.add("flex", "flex-col", "border-l-[1px]", "border-[#a8b3cf]", "bg-[#fff]", "hover:bg-[#EAEBEC]", "p-4", "m-2");
                                responseDiv.setAttribute("id", "subComment_" + reply.id);

                                responseDiv.innerHTML = `
                                <div class="flex flex-col" id="commentRow">
                                    <div class="flex flex-col space-x-2 justify-start" id="commentInfo">
                                        <div class="flex flex-row items-center space-x-2">
                                            <img src="resources/images/avatar/${reply.user_avatar}" class="h-7 w-7 rounded-full object-cover object-center" alt="">
                                            <span class="font-bold text-[#000]" id="commentAuthor">${reply.login}</span>
                                        </div>
                                        <span class="text-sm text-[#526866a3]" id="commentDate">${formatDate(reply.created_at)}</span>
                                    </div>
                                    <div class="m-2 p-0.5 rounded-lg" id="commentContent">
                                        <div class="inline-block bg-purple-200 rounded-lg p-0.5">
                                            <p class="font-bold text-black" id="loginofreply">@${comment.login}</p>
                                        </div>
                                        <p class="font-sm text-[#000]" id="commentContentP">${reply.content}</p>
                                    </div>
                                    <div id="commentButtons" class="flex flex-row justify-end">
                                        <button class="hover:bg-[#1ddc6f3d] text-white font-bold p-2 rounded-lg" id="commentRepliesButton">
                                            <img src="resources/images/icon/comments.svg" class="green-reply" alt="commentIcon">
                                        </button>
                                        <!--<button class="hover:bg-[#0dcfdc3d] text-white font-bold p-2 rounded-lg" id="commentEditButton">
                                            <img src="resources/images/icon/edit1.svg" class="blue-edit" alt="editBtn">
                                        </button>
                                        <button class="hover:bg-[#5E0700] text-white font-bold p-2 rounded-lg" id="commentDeleteButton">
                                            <img src="resources/images/icon/trashcan.svg" alt="delete" class="red-delete">
                                        </button>-->
                                    </div>
                                </div>
                                `;
                                const commentReplyButton = responseDiv.querySelector('#commentRepliesButton');
                                commentReplyButton.addEventListener('click', function () {
                                    replyComment(comment.id);
                                });
                                commentDiv.querySelector('#replyList').appendChild(responseDiv);
                        }
                    });
                commentaires.appendChild(commentDiv);
                }

            });

        }
    });
}


// Fonction de récupération des réponses aux commentaires quand le parent_id != 0
//resources/assests/fetch/comments/addComments.php



// Fonction qui permet d'ajouter un commentaire
async function createFormAddComments(parent) {
    const FormForAddComments = document.createElement('form');
    FormForAddComments.action = '';
    FormForAddComments.method = 'post';
    FormForAddComments.id = 'FormForAddComments';
    // FormForAddComments.classList.add('');

    const containerFormAddComments = document.createElement('div');
    containerFormAddComments.id = 'containerFormAddComments';
    containerFormAddComments.classList.add('flex', 'flex-col');

    const commentIdInput = document.createElement('input');
    commentIdInput.type = 'hidden';
    commentIdInput.name = 'comment_id';
    commentIdInput.id = 'commentId';

    const commentArticleIdInput = document.createElement('input');
    commentArticleIdInput.type = 'hidden';
    commentArticleIdInput.name = 'article_id';
    commentArticleIdInput.id = 'ArticleId';
    commentArticleIdInput.value = id;

    const commentTextarea = document.createElement('textarea');
    commentTextarea.name = 'comment';
    commentTextarea.id = 'comment';
    commentTextarea.cols = '30';
    commentTextarea.rows = '5';
    commentTextarea.placeholder = 'Publier un Commentaire';
    commentTextarea.classList.add('bg-[#eaebec]', 'p-2', 'rounded-lg')

    const containerSubmitButton = document.createElement('div');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('bg-[#04b43533]', 'hover:bg-[#15ce5c]', 'text-[#526866a3]', 'hover:text-[#fff]', 'font-bold', 'p-2', 'rounded-lg', 'mt-2');
    submitButton.textContent = 'Publier';

    containerFormAddComments.appendChild(commentIdInput);
    containerFormAddComments.appendChild(commentArticleIdInput);
    containerFormAddComments.appendChild(commentTextarea);
    containerFormAddComments.appendChild(containerSubmitButton);
    containerSubmitButton.appendChild(submitButton);

    FormForAddComments.appendChild(containerFormAddComments);
    parent.appendChild(FormForAddComments);
        const Message = document.querySelector("#errorMsg");
        const formComment = document.querySelector("#FormForAddComments");
        formComment.addEventListener('submit', async (e) => {
            e.preventDefault();
            await fetch('', {
                method: 'POST',
                body: new FormData(formComment)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        Message.innerHTML = data.message;
                        Message.classList.add('messageAlert');
                        getComments(id);
                    } else {
                        Message.innerHTML = data.message;
                        Message.classList.add('messageAlert');

                    }

                })
        });

        document.getElementById("comment").focus();
}
function AddCommentForm() {
    const Message = document.querySelector("#errorMsg");
    const formComment = document.querySelector("#FormForAddComments");
    formComment.addEventListener('submit', async (e) => {
        e.preventDefault();
        await fetch('search.php', {
            method: 'POST',
            body: new FormData(formComment)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    Message.innerHTML = data.message;
                    Message.classList.add('messageAlert');
                    getComments(id);
                } else {
                    Message.innerHTML = data.message;
                    Message.classList.add('messageAlert');

                }

            })
    });

    document.getElementById("comment").focus();
}

function  getCategoryForForm (DisplayCategory) {
    fetch('resources/assests/fetch/fetchCategory.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                DisplayCategory.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });
        })
}
function closeModal() {
    let dialog = document.querySelector("#dialog");
    dialog.close();
    dialog.remove();
}
if (formCommentDisplay) { // Si le formulaire existe
    createFormAddComments(formCommentDisplay);
}
function createFormEdit(parent) {

}
// Fonction qui permet de répondre à un commentaire
function editArticle(id) {
    let body = document.querySelector('#editAricle');
    btnEdit.addEventListener('click', async (e) => {
        let createModal = document.createElement('dialog', );
        createModal.setAttribute('id', 'dialog');
        createModal.className = 'dialog_modal w-full';
        body.appendChild(createModal);
        createModal.showModal();
        await fetch('resources/assests/fetch/articles/fetchDisplayArticle.php?id=' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {

                    createModal.innerHTML += `
                    <div class="p-4 rounded-lg">
                        <form action="" method="post" id="formEditArticle" class="rounded-lg">
                            <div id="containerCloseDialog" class="flex flex-row justify-between items-center">
                                <p>
                                    <span class="text-lg font-bold">Modifier l'article:</span>
                                </p>
                            <button type="button" id="closeDialog" class="py-2 px-4 hover:bg-slate-200 rounded-full">&times;</button>
                            </div>
                            <div class="flex flex-col">
                                <input type="hidden" name="id" value="${data.articles.id}">
                                <label for="title">Titre</label>
                                <input type="text" name="title" id="title" class="bg-slate-100 p-2 rounded-lg" value="${data.articles.title}">
                            </div>
                            <div class="flex flex-col">
                                <label for="content">Contenu</label>
                                <textarea name="content" id="content" cols="30" rows="10" class="bg-slate-100 p-2 rounded-lg" >${data.articles.content}</textarea>
                            </div>
                            <div class="flex flex-row items-center justify-center space-x-2 p-2">
                                <div class="flex flex-col">
                                    <h4>Auteur :${data.articles.author_login}</h4>
                                </div>
                                <div class="flex justify-around items-center">
                                    <label for="category">Catégorie :</label>
                                    <select name="categoryFormEdit" id="categoryFormEdit" class="rounded-lg p-2">
                                        <option value="${data.articles.category_id}">${data.articles.category_name}</option>
                                    </select>
                                </div>
                            </div>
                            <div id="containerMessageProfil" class="h-[65px] w-full">
                                <div id="errorMsg" class="w-full"></div>
                            </div>
                            <div class="flex flex-col">
                                <button type="submit" class="bg-[#04b43533] hover:bg-[#15ce5c] text-[#526866a3] hover:text-[#fff] font-bold p-2 rounded-lg mt-2">
                                    Modifier
                                </button>
                            </div>
                        </form>
                    </div>`;

                    // Récupération de l'élément categoryFormEdit
                    let category = document.querySelector('#categoryFormEdit');

                    // Vérification que l'élément category existe
                    if (category !== null) {
                        // Appel de la fonction getCategoryForForm
                        getCategoryForForm(category);
                    }
                    let closeDialog = document.querySelector('#closeDialog');
                    closeDialog.addEventListener('click', () => {
                        closeModal();
                    });
                }
            });
            let btnEditArticle = document.querySelector('#formEditArticle');
            btnEditArticle.addEventListener('submit', async (e) => {
                e.preventDefault();
                await fetch('resources/assests/fetch/articles/editArticle.php', {
                    method: 'POST',
                    body: new FormData(btnEditArticle)
                })
                    .then(response => response.json())
                    .then(data => {
                        let Message = document.querySelector("#errorMsg");
                        if (data.status === 'success') {
                            Message.innerHTML = data.message;
                            displaySuccess(Message);
                            const myTimeout = setTimeout(closeModal(), 1000)
                            myTimeout;
                            getArticle(id);
                        }
                        if (data.status === 'error') {
                            Message.innerHTML = data.message;
                            displayError(Message);
                        }
                })
            });

    });
}

// Verifier que le bouton existe
if (btnEdit) {
    editArticle(id);
}
getArticle(id);
getComments(id);


