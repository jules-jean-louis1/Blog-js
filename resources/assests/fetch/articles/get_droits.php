<?php
session_start();
if (isset($_SESSION['droits']) && ($_SESSION['droits'] == 'administrateur' || $_SESSION['droits'] == 'moderateur')) {
    header('Content-Type: application/json');
    echo json_encode(['status' => true]);

} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => false]);

}
?>
