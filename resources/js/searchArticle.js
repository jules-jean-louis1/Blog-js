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

// Fonction de récupération des commentaires
async function getComments(id) {
    let commentaires = document.querySelector("#commentsOfArticles");
    await fetch('resources/assests/fetch/comments/listComments.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            if(data.status === 'empty') {
                comments.innerHTML = data.message;
            } else {
                for (const comment of data.comments) {
                    let formattedDateCreate = formatDate(comment.created_at);
                    // Création de la div qui contiendra les commentaires
                    let commentRow = document.createElement("div");
                    commentRow.classList.add("flex", "flex-col", "border-2", "border-gray-200", "rounded-lg", "shadow-md", "bg-[#1c1f26]", "p-4", "m-2");
                    commentRow.setAttribute("id", "commentRow");
                        // Création de la div qui contiendra les infos du commentaire
                        let commentInfo = document.createElement("div");
                        commentInfo.classList.add("flex", "flex-row", "space-x-2");
                        commentInfo.setAttribute("id", "commentInfo");
                            // Span qui contiendra le label "Par"
                            let commentRowLabel = document.createElement("span");
                            commentRowLabel.classList.add("font-lg");
                            commentRowLabel.setAttribute("id", "commentRowLabel");
                            commentRowLabel.textContent = "Par";
                            // Span qui contiendra le nom de l'auteur du commentaire
                            let commentAuthor = document.createElement("span");
                            commentAuthor.classList.add("font-bold");
                            commentAuthor.setAttribute("id", "commentAuthor");
                            commentAuthor.textContent = comment.login;
                            // Span qui contiendra la date de création du commentaire
                            let commentDate = document.createElement("span");
                            commentDate.classList.add("font-sm");
                            commentDate.setAttribute("id", "commentDate");
                            commentDate.textContent = formattedDateCreate;
                        // Création de la div qui contiendra le contenu du commentaire
                        let commentContent = document.createElement("div");
                        commentContent.classList.add("bg-slate-100", "m-2", "p-2", "rounded-lg");
                        commentContent.setAttribute("id", "commentContent");
                            // Paragraphe qui contiendra le contenu du commentaire
                            let commentContentP = document.createElement("p");
                            commentContentP.classList.add("font-sm");
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
                            commentReplyButton.setAttribute("onclick", "replyComment(" + comment.id + ")");
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
                }

            }
        })
}

getArticle(id);
getComments(id);


