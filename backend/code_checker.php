<?php
header('Content-Type: application/json');
$config = include(__DIR__ . '/environment.php');

$servername = $config['DB_SERVERNAME'];
$username = $config['DB_USERNAME'];
$password = $config['DB_PASSWORD'];
$dbname = $config['DB_NAME'];

function connectToDatabase($servername, $username, $password, $dbname) {
    $connection = new mysqli($servername, $username, $password, $dbname);
    if ($connection->connect_error) {
        sendErrorResponse(500);
        exit();
    }
    return $connection;
}

function getRequestData() {
    return json_decode(file_get_contents("php://input"), true);
}

function fetchCodeDetails($connection, $code) {
    $escapedCode = $connection->real_escape_string($code);
    $query = "SELECT corresponding_code, already_used FROM cozy_gamez_giveaways WHERE video_code = '$escapedCode'";
    return $connection->query($query);
}

function updateCodeStatus($connection, $code) {
    $escapedCode = $connection->real_escape_string($code);
    $updateQuery = "UPDATE cozy_gamez_giveaways SET already_used = 1 WHERE video_code = '$escapedCode'";
    return $connection->query($updateQuery);
}

function updateCodeAttempts($connection, $code) {
    $escapedCode = $connection->real_escape_string($code);
    $updateQuery = "UPDATE cozy_gamez_giveaways SET attempts = attempts + 1 WHERE video_code = '$escapedCode'";
    return $connection->query($updateQuery);
}

function sendErrorResponse($statusCode) {
    http_response_code($statusCode);
    echo json_encode(["status" => "error"]);
}

function sendSuccessResponse($status, $code = null) {
    http_response_code(200);
    $response = ["status" => $status];
    if ($code !== null) {
        $response["code"] = $code;
    }
    echo json_encode($response);
}

$connection = connectToDatabase($servername, $username, $password, $dbname);
$requestData = getRequestData();

if (!isset($requestData['text'])) {
    sendErrorResponse(400);
    $connection->close();
    exit();
}

$code = $requestData['text'];
$result = fetchCodeDetails($connection, $code);

$codeWasFoundInDB = $result && $result->num_rows > 0;
if ($codeWasFoundInDB) {
    $codeDetails = $result->fetch_assoc();

    if ($codeDetails['already_used'] == 1) {
        updateCodeAttempts($connection, $code);
        sendSuccessResponse("alreadyUsed");
        $connection->close();
        exit();
    } else {
        updateCodeStatus($connection, $code);
        sendSuccessResponse("ok", $codeDetails['corresponding_code']);
        $connection->close();
        exit();
    }
} else {
    sendErrorResponse(404);
}

$connection->close();
