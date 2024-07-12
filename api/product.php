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

            if (isset($path[5]) && is_numeric($path[5])) {
                $json_array = array();
                $pro_id = $path[5];
                $getProductRow = mysqli_query($db_conn,"SELECT * FROM product_tbl WHERE pro_id='$pro_id'");
                while($productrow = mysqli_fetch_array($getProductRow)) {
                    $json_array['rowProductData'] = array('id'=>$productrow['pro_id'], 'p_title'=>$productrow['pro_title'], 'p_price'=>$productrow['pro_price'], "p_image"=>$productrow['pro_image'], 'status'=>$productrow['pro_status']);
                }
                echo json_encode($json_array['rowProductData']);
                return;
            } else {
                $destination = $_SERVER['DOCUMENT_ROOT']."/react/reactphp/api/images"."/";
                $allproduct = mysqli_query($db_conn,"SELECT * FROM product_tbl");

                if (mysqli_num_rows($allproduct) > 0) {
                    while($row = mysqli_fetch_array($allproduct)) {
                        $json_array["productdata"][] = array("id"=>$row['pro_id'], "p_title"=>$row['pro_title'], "p_price"=>$row['pro_price'], "p_image"=>$row['pro_image'], "status"=>$row['pro_status']);
                    } 
                    echo json_encode($json_array["productdata"]);
                    return;
                } else {
                    echo json_encode(["result"=>"Please check the Data"]);
                    return;
                }
            }
            
            break;

            case "POST":

                if (isset($_FILES['pro_image'])) {
                    $pro_title = $_POST['pro_title'];
                    $pro_price = $_POST['pro_price'];
                    $pfile = time().$_FILES['pro_image']['name'];
                    $pfile_temp = $_FILES['pro_image']['tmp_name'];
                    $destination = $_SERVER['DOCUMENT_ROOT'].'/react/reactphp/api/images'."/".$pfile;

                    $result = mysqli_query($db_conn,"INSERT INTO product_tbl (pro_title,pro_price,pro_image,pro_status) VALUE('$pro_title','$pro_price','$pfile','1')");

                    if ($result) {
                        move_uploaded_file($pfile_temp, $destination);
                        echo json_encode(["success"=>"Product uploaded successfully"]);
                        return;
                    } else {
                        echo json_encode(["success"=>"Product not uploaded"]);
                        return;
                    }

                } else {
                    echo json_encode(["success"=>"Data not in correct format"]);
                    return;
                }
                
                break;

                case "PUT":                    
                    
                    $productUpdate = json_decode(file_get_contents("php://input"));
                    $proid = $productUpdate->id;
                    $pro_title = $productUpdate->p_title;
                    $pro_price = $productUpdate->p_price;
                    $pro_image = $productUpdate->p_image;
                    // $status = $productUpdate->status;

                    $updateProData = mysqli_query($db_conn,"UPDATE product_tbl SET pro_title='$pro_title', pro_price='$pro_price', pro_image='$pro_image' status='1' WHERE pro_id='$proid' ");


                    if($updateProData) {
                        echo json_encode(["success"=> "Product update successfully"]);
                        return;
                    } else {
                        echo json_encode(["success"=> "Please check the product data !!"]);
                        return;
                    }

                    break;

                    case "DELETE":

                        $path = explode('/', $_SERVER['REQUEST_URI']);
                        $result = mysqli_query($db_conn,"DELETE FROM product_tbl WHERE pro_id='$path[5]' ");

                        if($result) {
                            echo json_encode(["success"=> "Product record deleted successfully"]);
                            return;
                        } else {
                            echo json_encode(["Please check the product data !!"]);
                            return;
                        }

                        break;
    }
?>