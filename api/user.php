<?php

    error_reporting(E_ALL);
    ini_set('display_errors',1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    $db_conn = mysqli_connect("localhost", "root", "", "react_php");
    if($db_conn===false) {
        die("Server not connected". mysqli_connect_error());
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {

        case 'GET':

            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($path[5]) && is_numeric($path[5])) {
                $json_array = array();
                $userid = $path[5];
                $getUserRow = mysqli_query($db_conn,"SELECT * FROM user_tbl WHERE user_id='$userid'");
                while($userrow = mysqli_fetch_array($getUserRow)) {
                    $json_array['rowUserData'] = array('id'=>$userrow['user_id'], 'username'=>$userrow['user_name'], 'email'=>$userrow['user_email'], 'status'=>$userrow['status']);
                }
                echo json_encode($json_array['rowUserData']);
                return;
            } else {
                $alluser = mysqli_query($db_conn,'SELECT * FROM user_tbl');
                if(mysqli_num_rows($alluser)> 0) {
                    while($row = mysqli_fetch_array($alluser)) {
                        $json_query["userdata"][]= array("id" =>$row['user_id'], "username"=>$row['user_name'], "email"=>$row['user_email'], "status"=>$row['status']);
                    }
                    echo json_encode($json_query["userdata"]);
                    return;
                } else {
                    echo json_encode(["result"=>"Please check the Data"]);
                    return;
                }
            }
            break;

            case "POST":

                $userpostdata = json_decode(file_get_contents("php://input"));
                $username = $userpostdata->username;
                $useremail= $userpostdata->email;
                $status= $userpostdata->status;
                $result = mysqli_query($db_conn,"INSERT INTO user_tbl (user_name, user_email, status) VALUES('$username','$useremail','$status')");

                if($result) {
                    echo json_encode(["success"=> "User added successfully"]);
                    return;
                } else {
                    echo json_encode(["success"=> "Please check the user data !!"]);
                    return;
                }

                break;

                case "PUT":
                    
                    $userUpdate = json_decode(file_get_contents("php://input"));
                    $userid = $userUpdate->id;
                    $username = $userUpdate->username;
                    $useremail = $userUpdate->email;
                    $status = $userUpdate->status;

                    $updateData = mysqli_query($db_conn,"UPDATE user_tbl SET user_name='$username', user_email='$useremail', status='$status' WHERE user_id='$userid' ");


                    if($updateData) {
                        echo json_encode(["success"=> "User update successfully"]);
                        return;
                    } else {
                        echo json_encode(["success"=> "Please check the user data !!"]);
                        return;
                    }

                    break;

                    case "DELETE":

                        $path = explode('/', $_SERVER['REQUEST_URI']);
                        $result = mysqli_query($db_conn,"DELETE FROM user_tbl WHERE user_id='$path[5]' ");

                        if($result) {
                            echo json_encode(["success"=> "User record deleted successfully"]);
                            return;
                        } else {
                            echo json_encode(["Please check the user data !!"]);
                            return;
                        }

                        break;
    }
?>