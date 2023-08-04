<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

        // GET REQUESTS
    case 'GET':
        $get_action = isset($_GET['action']) ? $_GET['action'] : '';
        switch ($get_action) {
            case 'get_session_data':
                $response = getSessionData();
                break;
            case 'get_all_brands':
                $response = getAllBrands();
                break;
            case 'get_all_cities':
                $response = getAllCities();
                break;
            case 'get_all_users':
                $response = getAllUsers();
                break;
            case 'get_all_trainings':
                $response = getAllTrainings();
                break;
            case 'get_my_trainings':
                $response = getMyTrainings($_GET['username']);
                break;
            case 'get_training':
                $trainingID = isset($_GET['trainingID']) ? $_GET['trainingID'] : '';
                $response = getTraining($trainingID);
                break;
        }

        echo json_encode($response);
        break;

        // POST REQUESTS
    case 'POST':
        $post_action = isset($_POST['action']) ? $_POST['action'] : '';
        $response = null;

        switch ($post_action) {
            case 'insert_training':
                $training = json_decode($_POST['training'], true);
                $trainingCollaborators = json_decode($_POST['trainingCollaborators'], true);
                $response = insertTrainingData($training, $trainingCollaborators);
                break;
            case 'delete_training':
                $trainingID = json_decode($_POST['trainingID'], true);
                if ($trainingID) {
                    $response = deleteTraining($trainingID);
                } else {
                    $response = [
                        'icon' => 'error',
                        'html' => 'É necessário o id da formação.',
                        'title' => 'ID em falta.'
                    ];
                }
                break;
        }

        echo json_encode($response); // return $response
        break;

        // DELETE REQUESTS
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
        $delete_action = isset($_DELETE['action']) ? $_DELETE['action'] : '';

        // switch ($delete_action) {
        //     case 'delete_training':
        //         $trainingID = isset($_DELETE['trainingID']) ? $_DELETE['trainingID'] : '';
        //         if ($trainingID) {
        //             $response = deleteTraining($trainingID);
        //         } else {
        //             $response = [
        //                 'icon' => 'error',
        //                 'html' => 'É necessário o id da formação.',
        //                 'title' => 'ID em falta.'
        //             ];
        //         }
        //         echo json_encode($response);
        //         break;
        // }
        break;
}
