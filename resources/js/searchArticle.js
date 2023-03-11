const BtnAddCommentForm = document.querySelector("#commentForm");
const formCommentDisplay = document.querySelector("#commentFormDisplay");

// Récupérer l'ID à partir de la query string
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

// Formatage de la date
function formatDate(timestamp) {
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${year} à ${hours}:${minutes}`;
}
// Fonction qui recupère l'id du commentaire pour répondre

function  replyComment(commentId) {
    document.querySelector("#commentId").value = commentId;
    document.getElementById("comment").focus();
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
                <div class="p-4">
                    <div id="iconeMoreSearch">
                      <div id="comentaireArticleMoreSearch"></div>
                    </div>
                    <div id="articlesMoreSearch" class="flex flex-col">
                      <div id="infoPost" class="flex flex-col">
                        <h2 class="text-xl font-bold">${art.author_login}</h2>
                        <p class="flex flex-row">
                          Poster · <time class="date">${formattedDateC}</time>`
                        if (art.updated_at != null) {
                            articleHTML += `
                          MaJ le <time class="date">${formattedDateU}</time>
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

// Fonction de récupération des commentaires quand le parent_id = 0
async function getComments(id) {
    let commentaires = document.querySelector("#commentsOfArticles");
    await fetch('resources/assests/fetch/comments/listComments.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            if(data.status === 'empty') {
                commentaires.innerHTML = data.message;
            } else {
                commentaires.innerHTML = "";

                for (const comment of data.comments) {
                     if (comment.parent_comment_id == 0) {
                        let formattedDateCreate = formatDate(comment.created_at);
                        // Création de la div qui contiendra les commentaires
                        let commentRow = document.createElement("div");
                        commentRow.classList.add("flex", "flex-col", "border-[1px]", "border-[#a8b3cf]", "rounded-[2em]", "shadow-md", "bg-[#fff]", "hover:bg-[#EAEBEC]", "p-4", "m-4");
                        commentRow.setAttribute("id", "commentRow");
                        // Création de la div qui contiendra les infos du commentaire
                        let commentInfo = document.createElement("div");
                        commentInfo.classList.add("flex", "flex-row", "space-x-2");
                        commentInfo.setAttribute("id", "commentInfo");
                        // Span qui contiendra le label "Par"
                        let commentRowLabel = document.createElement("span");
                        commentRowLabel.classList.add("font-lg", "text-[#526866a3]");
                        commentRowLabel.setAttribute("id", "commentRowLabel");
                        commentRowLabel.textContent = "Par";
                        // Span qui contiendra le nom de l'auteur du commentaire
                        let commentAuthor = document.createElement("span");
                        commentAuthor.classList.add("font-bold", "text-[#000]");
                        commentAuthor.setAttribute("id", "commentAuthor");
                        commentAuthor.textContent = comment.login;
                        // Span qui contiendra la date de création du commentaire
                        let commentDate = document.createElement("span");
                        commentDate.classList.add("font-sm", "text-[#526866a3]");
                        commentDate.setAttribute("id", "commentDate");
                        commentDate.textContent = formattedDateCreate;
                        // Création de la div qui contiendra le contenu du commentaire
                        let commentContent = document.createElement("div");
                        commentContent.classList.add("m-2", "p-2", "rounded-lg");
                        commentContent.setAttribute("id", "commentContent");
                        // Paragraphe qui contiendra le contenu du commentaire
                        let commentContentP = document.createElement("p");
                        commentContentP.classList.add("font-sm", "text-[#000]");
                        commentContentP.setAttribute("id", "commentContentP");
                        commentContentP.textContent = comment.content;
                        // Création de la div qui contiendra les boutons de modification et de suppression
                        let commentButtons = document.createElement("div");
                        commentButtons.classList.add("flex", "flex-row", "justify-end");
                        commentButtons.setAttribute("id", "commentButtons");
                        // Bouton de Reponse du commentaire
                        let commentReplyButton = document.createElement("button");
                        commentReplyButton.classList.add("hover:bg-[#1ddc6f3d]", "text-white", "font-bold", "p-2", "rounded-lg");
                        commentReplyButton.setAttribute("id", "commentReplyButton");
                             // Icon du bouton de réponse
                             let CommentReplyButtonIcon = document.createElement("img");
                             CommentReplyButtonIcon.setAttribute("src", "resources/images/icon/comments.svg");
                             CommentReplyButtonIcon.setAttribute("class", "green-reply");
                        // Bouton de modification du commentaire
                        let commentEditButton = document.createElement("button");
                        commentEditButton.classList.add("hover:bg-[#0dcfdc3d]", "text-white", "font-bold", "p-2", "rounded-lg");
                        commentEditButton.setAttribute("id", "commentEditButton");
                        commentEditButton.setAttribute("onclick", "editComment(" + comment.id + ")");
                             // Icon du bouton de modification
                             let CommentEditButtonIcon = document.createElement("img");
                             CommentEditButtonIcon.setAttribute("src", "resources/images/icon/edit1.svg");
                             CommentEditButtonIcon.setAttribute("class", "blue-edit");
                        // Bouton de suppression du commentaire
                        let commentDeleteButton = document.createElement("button");
                        commentDeleteButton.classList.add("hover:bg-[#5E0700]", "text-white", "font-bold", "p-2", "rounded-lg");
                        commentDeleteButton.setAttribute("id", "commentDeleteButton");
                        commentDeleteButton.setAttribute("onclick", "deleteComment(" + comment.id + ")");
                             // Icon du bouton de suppression
                             let subCommentDeleteButtonIcon = document.createElement("img");
                             subCommentDeleteButtonIcon.setAttribute("src", "resources/images/icon/trashcan.svg");
                             subCommentDeleteButtonIcon.setAttribute("class", "red-delete");

                        let replyList = document.createElement("ul");
                        replyList.classList.add("ml-8", "mb-4");
                        replyList.setAttribute("id", "replyList");
                        // Ajout fonction sur les boutons
                        commentReplyButton.addEventListener('click', function () {
                            replyComment(comment.id);

                        });

                        commentaires.appendChild(commentRow);
                        commentRow.appendChild(commentInfo);
                        commentInfo.appendChild(commentRowLabel);
                        commentInfo.appendChild(commentAuthor);
                        commentInfo.appendChild(commentDate);
                        commentRow.appendChild(commentContent);
                        commentContent.appendChild(commentContentP);
                        commentRow.appendChild(commentButtons);
                        commentButtons.appendChild(commentReplyButton);
                        commentReplyButton.appendChild(CommentReplyButtonIcon);
                        commentButtons.appendChild(commentEditButton);
                        commentEditButton.appendChild(CommentEditButtonIcon);
                        commentButtons.appendChild(commentDeleteButton);
                        commentDeleteButton.appendChild(subCommentDeleteButtonIcon);
                        commentRow.appendChild(replyList);

                        // Appel de la fonction de récupération des réponses aux commentaires
                         for (const subComment of data.comments) {
                             if (subComment.parent_comment_id == comment.id && subComment.id != subComment.parent_comment_id) { // si le commentaire est une réponse à ce commentaire parent
                                 let subLi = document.createElement("li");
                                 subLi.classList.add("flex", "flex-col", "border-[1px]", "border-[#a8b3cf]", "rounded-[2em]", "shadow-md", "bg-[#fff]", "hover:bg-[#EAEBEC]", "p-4", "m-2");
                                 subLi.setAttribute("id", "comment-" + subComment.id);

                                    let subCommentInfo = document.createElement("div");
                                    subCommentInfo.classList.add("flex", "flex-row", "space-x-2");
                                    subCommentInfo.setAttribute("id", "subCommentInfo");
                                    // Span qui contiendra le label "Par"
                                    let subCommentRowLabel = document.createElement("span");
                                    subCommentRowLabel.classList.add("font-lg", "text-[#526866a3]");
                                    subCommentRowLabel.setAttribute("id", "subCommentRowLabel");
                                    subCommentRowLabel.textContent = "Par";
                                    // Span qui contiendra le nom de l'auteur du commentaire
                                    let subCommentAuthor = document.createElement("span");
                                    subCommentAuthor.classList.add("font-bold", "text-[#000]");
                                    subCommentAuthor.setAttribute("id", "subCommentAuthor");
                                    subCommentAuthor.textContent = subComment.login;
                                    // Span qui contiendra la date de création du commentaire
                                    let subCommentDate = document.createElement("span");
                                    subCommentDate.classList.add("font-sm", "text-[#526866a3]");
                                    subCommentDate.setAttribute("id", "subCommentDate");
                                    subCommentDate.textContent = formattedDateCreate;
                                    // Création de la div qui contiendra le contenu du commentaire
                                    let subCommentContent = document.createElement("div");
                                    subCommentContent.classList.add("m-2", "p-2", "rounded-lg");
                                    subCommentContent.setAttribute("id", "subCommentContent");
                                    // Paragraphe qui contiendra le contenu du commentaire
                                    let subCommentContentP = document.createElement("p");
                                    subCommentContentP.classList.add("font-sm", "text-[#000]");
                                    subCommentContentP.setAttribute("id", "subCommentContentP");
                                    subCommentContentP.textContent = subComment.content;
                                    // Création de la div qui contiendra les boutons de modification et de suppression
                                    let subCommentButtons = document.createElement("div");
                                    subCommentButtons.classList.add("flex", "flex-row", "justify-end");
                                    subCommentButtons.setAttribute("id", "subCommentButtons");
                                    // Bouton de Reponse du commentaire
                                    let subCommentReplyButton = document.createElement("button");
                                    subCommentReplyButton.classList.add("hover:bg-[#1ddc6f3d]", "text-white", "font-bold", "p-2", "rounded-lg");
                                    subCommentReplyButton.setAttribute("id", "subCommentReplyButton");
                                    // Icon du bouton de réponse
                                    let subCommentReplyButtonIcon = document.createElement("img");
                                    subCommentReplyButtonIcon.setAttribute("src", "resources/images/icon/comments.svg");
                                    subCommentReplyButtonIcon.setAttribute("class", "green-reply");
                                    // Bouton de modification du commentaire
                                    let subCommentEditButton = document.createElement("button");
                                    subCommentEditButton.classList.add("hover:bg-[#0dcfdc3d]", "text-white", "font-bold", "p-2", "rounded-lg");
                                    subCommentEditButton.setAttribute("id", "subCommentEditButton");
                                    // Icon du bouton de modification
                                    let subCommentEditButtonIcon = document.createElement("img");
                                    subCommentEditButtonIcon.setAttribute("src", "resources/images/icon/edit1.svg");
                                    subCommentEditButtonIcon.setAttribute("class", "blue-edit");
                                    // Bouton de suppression du commentaire
                                    let subCommentDeleteButton = document.createElement("button");
                                    subCommentDeleteButton.classList.add("hover:bg-[#5E0700]", "text-white", "font-bold", "p-2", "rounded-lg");
                                    subCommentDeleteButton.setAttribute("id", "subCommentDeleteButton");
                                    // Icon du bouton de suppression
                                    let subCommentDeleteButtonIcon = document.createElement("img");
                                    subCommentDeleteButtonIcon.setAttribute("src", "resources/images/icon/trashcan.svg");
                                    subCommentDeleteButtonIcon.setAttribute("class", "red-delete");
                                    // Ajout fonction sur les boutons
                                    subCommentReplyButton.addEventListener('click', function () {
                                        AddCommentForm();
                                        replyComment(subComment.id);
                                    });

                                 replyList.appendChild(subLi);
                                    subLi.appendChild(subCommentInfo);
                                    subCommentInfo.appendChild(subCommentRowLabel);
                                    subCommentInfo.appendChild(subCommentAuthor);
                                    subCommentInfo.appendChild(subCommentDate);
                                    subLi.appendChild(subCommentContent);
                                    subCommentContent.appendChild(subCommentContentP);
                                    subLi.appendChild(subCommentButtons);
                                    subCommentButtons.appendChild(subCommentReplyButton);
                                    subCommentReplyButton.appendChild(subCommentReplyButtonIcon);
                                    subCommentButtons.appendChild(subCommentEditButton);
                                    subCommentEditButton.appendChild(subCommentEditButtonIcon);
                                    subCommentButtons.appendChild(subCommentDeleteButton);
                                    subCommentDeleteButton.appendChild(subCommentDeleteButtonIcon);

                             }
                         }


                    }
                 }
            }
        })
}

// Fonction de récupération des réponses aux commentaires quand le parent_id != 0




// Fonction qui permet d'ajouter un commentaire
function createFormAddComments(parent) {
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
}


function AddCommentForm() {
    if (!document.querySelector("#FormForAddComments")) {
        createFormAddComments(formCommentDisplay);
    }
        // createFormAddComments(formCommentDisplay);
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
                        formCommentDisplay.innerHTML = data.message;
                        formCommentDisplay.classList.add('messageAlert');
                        getComments(id);
                    } else {
                        formCommentDisplay.innerHTML = data.message;
                        formCommentDisplay.classList.add('messageAlert');

                    }

                })
        });

    document.getElementById("comment").focus();
}

BtnAddCommentForm.addEventListener('click', function () {
    AddCommentForm();
})

getArticle(id);
getComments(id);


