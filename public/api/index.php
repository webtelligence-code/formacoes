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
            case 'get_session_username':
                $response = getSessionUsername();
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
        }

        echo json_encode($response);
        break;

        // POST REQUESTS
    case 'POST':
        $post_action = isset($_POST['action']) ? $_POST['action'] : '';
        $response = null;

        // switch ($post_action) {
        //     case 'add_meeting':
        //         $meeting = json_decode($_POST['meeting'], true);
        //         $response = addMeeting($meeting);
        //         break;
        //     case 'update_meeting':
        //         $meeting = json_decode($_POST['meeting'], true);
        //         $response = updateMeeting($meeting);
        //         break;
        // }

        echo json_encode($response); // return $response
        break;

        // DELETE REQUESTS
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
        $delete_action = isset($_DELETE['action']) ? $_DELETE['action'] : '';

        // switch ($delete_action) {
        //     case 'delete_meeting':
        //         $meeting_id = isset($_DELETE['meeting_id']) ? $_DELETE['meeting_id'] : '';
        //         if ($meeting_id) {
        //             $response = deleteMeeting($meeting_id);
        //         } else {
        //             $response = [
        //                 'status' => 'error',
        //                 'message' => 'É necessário o id da reunião.',
        //                 'title' => 'ID em falta.'
        //             ];
        //         }
        //         echo json_encode($response);
        //         break;
        // }
        break;
}
