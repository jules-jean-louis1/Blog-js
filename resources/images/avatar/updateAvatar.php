<?php

session_start();
require_once '../../assests/Classes/Users.php';

/*if (isset($_FILES['uploadfile'])) {
    $filename = $_FILES["uploadfile"]["name"];
    $tempname = $_FILES["uploadfile"]["tmp_name"];
    $folder = "./".$filename;
    $id = $_SESSION['id'];

    if(move_uploaded_file($tempname, $folder)) {
        $user = new Users();
        $avatar = $user->updateAvatar($id, $filename);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'avatarUp', 'message' => 'Votre avatar a bien été modifié']);
    }
    /*var_dump($filename);
    var_dump($tempname);
    var_dump($folder);
    if (move_uploaded_file($tempname, $folder)) {
        $user = new Users();
        $avatar = $user->updateAvatar($id, $filename);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'avatarUp', 'message' => 'Votre avatar a bien été modifié']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Votre avatar n\'a pas pu être modifier']);
    }
} */


if (isset($_FILES['uploadfile'])) {
    $filename = $_FILES['uploadfile']['name'];
    $tempname = $_FILES['uploadfile']['tmp_name'];
    $folder = "./".$filename;
    $id = $_SESSION['id'];

    // Vérifier la taille du fichier (max. 1 Mo)
    if ($_FILES['uploadfile']['size'] > 1048576) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Le fichier est trop volumineux (max. 1 Mo)']);
        exit;
    }

    // Vérifier le type MIME du fichier (image)
    if (!in_array($_FILES['uploadfile']['type'], ['image/jpeg', 'image/png'])) {
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
        $user = new Users();
        $avatar = $user->updateAvatar($id, $filename);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'avatarUp', 'message' => 'Votre avatar a bien été modifié']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue lors du téléchargement du fichier']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue']);
}
?>
