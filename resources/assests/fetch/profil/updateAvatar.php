<?php

session_start();
require_once '../../Classes/Users.php';



/*$filename = "unnamed-3.png";
$tempname = $_FILES["uploadfile"]["tmp_name"];
$folder = "../../../images/avatar/".$filename;
$id = $_SESSION['id'];
$user = new Users();
$avatar = $user->updateAvatar($id, $filename);*/

if (isset($_POST['upload'])) {
    $filename = $_FILES["uploadfile"]["name"];
    $tempname = $_FILES["uploadfile"]["tmp_name"];
    $folder = "../../../images/avatar/".$filename;
    $id = $_SESSION['id'];

    var_dump($filename);
    var_dump($tempname);
    var_dump($folder);
    var_dump($id);
    die();
    $user = new Users();
    $avatar = $user->updateAvatar($id, $filename);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'avatarUp', 'message' => 'Votre avatar a bien été modifié']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
}
/*if (isset($_POST['uploadfile'])) {
    $filename = $_FILES["uploadfile"]["name"];
    $tempname = $_FILES["uploadfile"]["tmp_name"];
    $folder = "../../../images/avatar/".$filename;
    $id = $_SESSION['id'];


    if (move_uploaded_file($tempname, $folder)) {
        echo "File uploaded successfully";
        $user = new Users();
        $avatar = $user->updateAvatar($id, $filename);
        if ($avatar) {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'avatarUp', 'message' => 'Votre avatar a bien été modifié']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
    }
    die();
}*/
/*if (isset($_POST['uploadfile'])) {
    $target_dir = "../../../images/avatar/";
    $target_file = $target_dir . basename($_FILES["uploadfile"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // Vérifier si le fichier image est une image réelle ou une fausse image
    $check = getimagesize($_FILES["uploadfile"]["tmp_name"]);
    if($check === false) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Le fichier n\'est pas une image']);
        $uploadOk = 0;
    }

    // Vérifier si le fichier existe déjà
    if (file_exists($target_file)) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Le fichier existe déjà']);
        $uploadOk = 0;
    }

    // Vérifier la taille du fichier
    if ($_FILES["uploadfile"]["size"] > 2000000) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Le fichier est trop volumineux']);
        $uploadOk = 0;
    }

    // Autoriser certains formats de fichier
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Seuls les fichiers JPG, JPEG, PNG et GIF sont autorisés']);
        $uploadOk = 0;
    }

    // Vérifier si $uploadOk est défini à 0 par une erreur
    if ($uploadOk == 0) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Le fichier n\'a pas été téléchargé']);
        // Si tout est correct, essayer de télécharger le fichier
    } else {
        if (move_uploaded_file($_FILES["uploadfile"]["tmp_name"], $target_file)) {
            echo "Le fichier ". htmlspecialchars( basename( $_FILES["uploadfile"]["name"])). " a été téléchargé.";
            // Insérer ici votre code pour enregistrer le nom de fichier dans la base de données, par exemple :
            $user = new Users();
            $avatar = $user->updateAvatar($id, basename($_FILES["uploadfile"]["name"]));
            header('Content-Type: application/json');
            echo json_encode(['status' => 'success', 'message' => 'Le fichier a été téléchargé avec succès']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'error', 'message' => 'Désolé, une erreur s\'est produite lors du téléchargement de votre fichier']);
        }
    }
    die();
}*/

?>
