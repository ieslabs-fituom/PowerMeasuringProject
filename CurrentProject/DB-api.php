<?php

$server = "localhost";
$database = "power_project";
$username = "root";
$password = "";
$api_key = "lukepramo221#";

$api_key = ""; 
$device_id = "";
$start_time = "";
$end_time = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key2 = data_fetcher($_POST["api_key"]);

    if($api_key == $api_key2) {
        $device_id = data_fetcher($_POST["device_id"]);
        $start_time = data_fetcher($_POST["start_time"]);
        $end_time = data_fetcher($_POST["end_time"]);

        $conn = new mysqli($server, $username, $password, $database);
        if ($conn->connect_error) {
            die("Connection with mySQL failed: " . $conn->connect_error);
        } 
        $sql = "INSERT INTO records (device_id, start_time, end_time)
        VALUES ('" . $device_id . "', '" . $start_time . "', '" . $end_time . "')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Record added successfully.";
        } 
        else {
            echo "An Error occurred:  " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();
    }
    else {
        echo "Please provide the correct API key.";
    }

}
else {
    echo "Please only use a POST request.";
}

function data_fetcher($data) {
    $data = htmlspecialchars(stripslashes(trim($data)));
    return $data;
}