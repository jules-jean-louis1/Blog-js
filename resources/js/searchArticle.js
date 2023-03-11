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
                <div class="border-2 border-gray-200 rounded-lg shadow-md p-4">
                    <div id="iconeMoreSearch">
                      <div id="comentaireArticleMoreSearch"></div>
                    </div>
                    <div id="articlesMoreSearch" class="flex flex-col">
                      <div id="infoPost" class="flex flex-col">
                        <h2 class="text-xl font-bold">${art.author_login}</h2>
                        <p class="flex flex-row">
                          Poster en<time class="date">${formattedDateC}</time>`
                        if (art.updated_at != null) {
                            articleHTML += `
                          MaJ le <time class="date">${formattedDateU}</time>
                            `;
                        }
                        articleHTML += `
                        </p>
                      </div>
                      <div id="title_articleMoreSearch" class="bg-slate-100 m-2 p-2 rounded-lg">
                            <h1 class="text-4xl font-bold">${art.title}</h1>
                      </div>
                      <div id="content_articleMoreSearch" class="bg-slate-100 m-2 p-2 rounded-lg">
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
                        commentRow.classList.add("flex", "flex-col", "border-[1px]", "border-[#a8b3cf]", "rounded-lg", "shadow-md", "bg-[#1c1f26]", "hover:bg-[#20262d]", "p-4", "m-2");
                        commentRow.setAttribute("id", "commentRow");
                        // Création de la div qui contiendra les infos du commentaire
                        let commentInfo = document.createElement("div");
                        commentInfo.classList.add("flex", "flex-row", "space-x-2");
                        commentInfo.setAttribute("id", "commentInfo");
                        // Span qui contiendra le label "Par"
                        let commentRowLabel = document.createElement("span");
                        commentRowLabel.classList.add("font-lg", "text-[#a8b3cf]");
                        commentRowLabel.setAttribute("id", "commentRowLabel");
                        commentRowLabel.textContent = "Par";
                        // Span qui contiendra le nom de l'auteur du commentaire
                        let commentAuthor = document.createElement("span");
                        commentAuthor.classList.add("font-bold", "text-[#fff]");
                        commentAuthor.setAttribute("id", "commentAuthor");
                        commentAuthor.textContent = comment.login;
                        // Span qui contiendra la date de création du commentaire
                        let commentDate = document.createElement("span");
                        commentDate.classList.add("font-sm", "text-[#a8b3cf]");
                        commentDate.setAttribute("id", "commentDate");
                        commentDate.textContent = formattedDateCreate;
                        // Création de la div qui contiendra le contenu du commentaire
                        let commentContent = document.createElement("div");
                        commentContent.classList.add("m-2", "p-2", "rounded-lg");
                        commentContent.setAttribute("id", "commentContent");
                        // Paragraphe qui contiendra le contenu du commentaire
                        let commentContentP = document.createElement("p");
                        commentContentP.classList.add("font-sm", "text-[#fff]");
                        commentContentP.setAttribute("id", "commentContentP");
                        commentContentP.textContent = comment.content;
                        // Création de la div qui contiendra les boutons de modification et de suppression
                        let commentButtons = document.createElement("div");
                        commentButtons.classList.add("flex", "flex-row", "justify-end");
                        commentButtons.setAttribute("id", "commentButtons");
                        // Bouton de Reponse du commentaire
                        let commentReplyButton = document.createElement("button");
                        commentReplyButton.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "m-2");
                        commentReplyButton.setAttribute("id", "commentReplyButton");
                        commentReplyButton.textContent = "Répondre";
                        // commentReplyButton.setAttribute("onclick", "replyComment(" + comment.id + ")");
                        // Bouton de modification du commentaire
                        let commentEditButton = document.createElement("button");
                        commentEditButton.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "m-2");
                        commentEditButton.setAttribute("id", "commentEditButton");
                        commentEditButton.textContent = "Modifier";
                        commentEditButton.setAttribute("onclick", "editComment(" + comment.id + ")");
                        // Bouton de suppression du commentaire
                        let commentDeleteButton = document.createElement("button");
                        commentDeleteButton.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "m-2");
                        commentDeleteButton.setAttribute("id", "commentDeleteButton");
                        commentDeleteButton.textContent = "Supprimer";
                        commentDeleteButton.setAttribute("onclick", "deleteComment(" + comment.id + ")");

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
                        commentButtons.appendChild(commentEditButton);
                        commentButtons.appendChild(commentDeleteButton);
                        commentRow.appendChild(replyList);

                        // Appel de la fonction de récupération des réponses aux commentaires
                         for (const subComment of data.comments) {
                             if (subComment.parent_comment_id == comment.id && subComment.id != subComment.parent_comment_id) { // si le commentaire est une réponse à ce commentaire parent
                                 let subLi = document.createElement("li");
                                 subLi.classList.add("flex", "flex-col", "border-[1px]", "border-[#a8b3cf]", "rounded-lg", "shadow-md", "bg-[#1c1f26]", "hover:bg-[#20262d]", "p-4", "m-2");
                                 subLi.setAttribute("id", "comment-" + subComment.id);

                                    let subCommentInfo = document.createElement("div");
                                    subCommentInfo.classList.add("flex", "flex-row", "space-x-2");
                                    subCommentInfo.setAttribute("id", "subCommentInfo");
                                    // Span qui contiendra le label "Par"
                                    let subCommentRowLabel = document.createElement("span");
                                    subCommentRowLabel.classList.add("font-lg", "text-[#a8b3cf]");
                                    subCommentRowLabel.setAttribute("id", "subCommentRowLabel");
                                    subCommentRowLabel.textContent = "Par";
                                    // Span qui contiendra le nom de l'auteur du commentaire
                                    let subCommentAuthor = document.createElement("span");
                                    subCommentAuthor.classList.add("font-bold", "text-[#fff]");
                                    subCommentAuthor.setAttribute("id", "subCommentAuthor");
                                    subCommentAuthor.textContent = subComment.login;
                                    // Span qui contiendra la date de création du commentaire
                                    let subCommentDate = document.createElement("span");
                                    subCommentDate.classList.add("font-sm", "text-[#a8b3cf]");
                                    subCommentDate.setAttribute("id", "subCommentDate");
                                    subCommentDate.textContent = formattedDateCreate;
                                    // Création de la div qui contiendra le contenu du commentaire
                                    let subCommentContent = document.createElement("div");
                                    subCommentContent.classList.add("m-2", "p-2", "rounded-lg");
                                    subCommentContent.setAttribute("id", "subCommentContent");
                                    // Paragraphe qui contiendra le contenu du commentaire
                                    let subCommentContentP = document.createElement("p");
                                    subCommentContentP.classList.add("font-sm", "text-[#fff]");
                                    subCommentContentP.setAttribute("id", "subCommentContentP");
                                    subCommentContentP.textContent = subComment.content;
                                    // Création de la div qui contiendra les boutons de modification et de suppression
                                    let subCommentButtons = document.createElement("div");
                                    subCommentButtons.classList.add("flex", "flex-row", "justify-end");
                                    subCommentButtons.setAttribute("id", "subCommentButtons");
                                    // Bouton de Reponse du commentaire
                                    let subCommentReplyButton = document.createElement("button");
                                    subCommentReplyButton.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "m-2");
                                    subCommentReplyButton.setAttribute("id", "subCommentReplyButton");
                                    subCommentReplyButton.textContent = "Répondre";
                                    // Bouton de modification du commentaire
                                    let subCommentEditButton = document.createElement("button");
                                    subCommentEditButton.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "m-2");
                                    subCommentEditButton.setAttribute("id", "subCommentEditButton");
                                    subCommentEditButton.textContent = "Modifier";
                                    // Bouton de suppression du commentaire
                                    let subCommentDeleteButton = document.createElement("button");
                                    subCommentDeleteButton.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "m-2");
                                    subCommentDeleteButton.setAttribute("id", "subCommentDeleteButton");
                                    subCommentDeleteButton.textContent = "Supprimer";
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
                                    subCommentButtons.appendChild(subCommentEditButton);
                                    subCommentButtons.appendChild(subCommentDeleteButton);

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
    FormForAddComments.classList.add('border-2');

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
    commentTextarea.rows = '10';
    commentTextarea.placeholder = 'Publier un Commentaire';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('border-2');
    submitButton.textContent = 'Publier';

    containerFormAddComments.appendChild(commentIdInput);
    containerFormAddComments.appendChild(commentArticleIdInput);
    containerFormAddComments.appendChild(commentTextarea);
    containerFormAddComments.appendChild(submitButton);

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


