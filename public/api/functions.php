<?php

class DatabaseConnect
{
  private $server = 'localhost';
  private $dbname = 'Stardust';
  private $user = 'Galen';
  private $pass = 'kMfp0~456';

  public function connect()
  {
    $conn = mysqli_connect($this->server, $this->user, $this->pass, $this->dbname);

    if ($conn->connect_error) {
      die('Database Error:' . $conn->connect_error);
    } else {
      $conn->set_charset('utf8');
    }

    return $conn;
  }
}

$databaseObj = new DatabaseConnect;
$conn = $databaseObj->connect();

// This function will store allthe session variables into an array to send to frontend
function getSessionData()
{
  session_start();

  $sessionData = array();

  // Loop through all the session data variables and store them in the array
  foreach ($_SESSION as $key => $value) {
    $sessionData[$key] = $value;
  }

  // Encode the session data array to json format
  return json_encode($sessionData);
}

/**
 * Function to fetch all meetings from database
 * We need to join the salas table to reunioes table
 * @return void 
 */
function getAllBrands()
{
  global $conn;

  $sql = 'SELECT DISTINCT marca FROM tbconcessoes ORDER BY marca';

  $result = $conn->query($sql);

  $brands = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $brands[] = $row['marca'];
    }
  }

  $conn->close();

  return $brands;
}

// Function that will fetch all cities available in the company database
function getAllCities()
{
  global $conn;

  $sql = 'SELECT DISTINCT cidade from tbconcessoes ORDER BY cidade';

  $result = $conn->query($sql);

  $cities = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $cities[] = $row['cidade'];
    }
  }

  $conn->close();

  return $cities;
}

// Function that will fetch all users (guests) from the database
function getAllUsers()
{
  global $conn;
  $sql = 'SELECT username, nameDisplay FROM tbusers WHERE ativo = 1 AND colaborador = 1 ORDER BY nameDisplay';
  $result = $conn->query($sql);

  $users = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }
  }

  return $users;
}
