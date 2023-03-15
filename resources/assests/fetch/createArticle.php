<?php
session_start();
require_once '../Classes/Articles.php';


if (isset($_POST['title'])) {
    $title = htmlspecialchars($_POST['title']);
    $content = htmlspecialchars($_POST['content']);
    $category = intval($_POST['category']);
    $id = $_SESSION['id'];
    // recuperer les valeurs du input file
    $filename = $_FILES['imageHeader']['name'];
    $tempname = $_FILES['imageHeader']['tmp_name'];
    $folder = "../../images/articles/".$filename;

    if ($_SESSION['droits'] === 'administrateur' || $_SESSION['droits'] === 'modérateur') {
        if (!empty($title) && !empty($content) && !empty($category) && !empty($filename)) {
            // Vérifier la taille du fichier (max. 2 Mo)
            if ($_FILES['imageHeader']['size'] > 2097152) {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'Le fichier est trop volumineux (max. 2 Mo)']);
                exit;
            }
            // Vérifier le type MIME du fichier (image)
            if (!in_array($_FILES['imageHeader']['type'], ['image/jpeg', 'image/png'])) {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'Le fichier doit être une image (JPEG ou PNG)']);
                exit;
            }
            // Vérifier si le fichier existe déjà
            if (file_exists($folder)) {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'Un fichier portant ce nom existe déjà']);
                exit;
            }
            // Transférer le fichier vers le dossier de destination
            if (move_uploaded_file($tempname, $folder)) {
                $article = new Articles();
                $article->createArticle($title, $content, $category, $id, $filename);
                header('Content-Type: application/json');
                echo json_encode(['status' => 'success', 'message' => 'Article créé avec succès']);
            } else {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'Votre article n\'a pas pu être créer']);
            }
            /*$article = new Articles();
            $article->createArticle($title, $content, $category, $id);
            header('Content-Type: application/json');
            echo json_encode(['status' => 'success', 'message' => 'Article créé avec succès']);*/
        } else {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'empty', 'message' => 'Veuillez remplir tous les champs']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Vous n\'avez pas les droits pour créer un article']);
    }
}

?>
