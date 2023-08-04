<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

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

  // For testing purposes only !!!
  $_SESSION['USERNAME'] = 'manuelcarreiras@EST2';
  $_SESSION['DEPARTAMENTO'] = 'Informático';

  $sessionData = array(
    'USERNAME' => $_SESSION['USERNAME'],
    'DEPARTAMENTO' => $_SESSION['DEPARTAMENTO']
  );

  return $sessionData;
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

  // Add theadditional cities to the begginning of the array
  array_unshift($cities, 'Lisboa');
  array_unshift($cities, 'Online');

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

// Function to fetch all trainings from the database
function getAllTrainings()
{
  global $conn;

  // SQL query to fetch all trainings
  $sql = 'SELECT * FROM t_trainings ORDER BY dateCreated DESC';

  $result = $conn->query($sql);

  $trainings = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $trainings[] = $row;
    }
  }

  $conn->close();

  return $trainings;
}

// Function to fetch all trainings from the database
function getMyTrainings($username)
{
  global $conn;

  // SQL query to fetch all trainings
  $sql = "SELECT t.*
          FROM t_trainings t
          LEFT JOIN t_training_collaborators tc ON t.ID = tc.trainingID
          WHERE t.usernameCreated = '$username'
            OR t.usernameUpdated = '$username'
            OR tc.username = '$username'
          GROUP BY t.ID
          ORDER BY t.dateCreated DESC";

  $result = $conn->query($sql);

  $trainings = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $trainings[] = $row;
    }
  }

  $conn->close();

  return $trainings;
}

function getTraining($trainingID) {
  global $conn;

  // Fetch training from the t_trainings table
  $trainingSql = "SELECT * FROM t_trainings WHERE ID = $trainingID";
  $trainingResult = $conn->query($trainingSql);

  if ($trainingResult && $trainingResult->num_rows > 0) {
    $training = $trainingResult->fetch_assoc();

    // Fetch associated collaborators from the t_training_collaborators table
    $collaboratorsSql = "SELECT username FROM t_training_collaborators WHERE trainingID = $trainingID";
    $collaboratorsResult = $conn->query($collaboratorsSql);

    $collaborators = array();
    if($collaboratorsResult && $collaboratorsResult->num_rows > 0) {
      while ($collaborator = $collaboratorsResult->fetch_assoc()) {
        $collaborators[] = $collaborator['username'];
      }
    }

    // Add collaborators array to the training
    $training['collaborators'] = $collaborators;
  } else {
    // If the training is not found, return null
    return null;
  }

  // Return the training with collaborators
  return $training;
}

// Function to insert training data and collaborators into the database
function insertTrainingData($training, $trainingCollaborators)
{
  global $conn;

  try {
    // Start the transaction
    $conn->begin_transaction();

    // Insert the training data into t_trainings
    $insertTrainingQuery = "INSERT INTO t_trainings (dateCreated, dateUpdated, dateLimit, title, brand, location, description, isFinished, portal, image, filePath, usernameCreated, usernameUpdated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtTraining = $conn->prepare($insertTrainingQuery);
    $stmtTraining->bind_param(
      "sssssssisssss",
      $training['dateCreated'],
      $training['dateUpdated'],
      $training['dateLimit'],
      $training['title'],
      $training['brand'],
      $training['location'],
      $training['description'],
      $training['isFinished'],
      $training['portal'],
      $training['image'],
      $training['filePath'],
      $training['usernameCreated'],
      $training['usernameUpdated']
    );

    $stmtTraining->execute();

    // Get the last inserted training ID
    $trainingID = $stmtTraining->insert_id;

    // Insert the training collaborators data into t_training_collaborators
    if (isset($trainingCollaborators['collaborators']) && is_array($trainingCollaborators['collaborators'])) {
      $insertCollaboratorsQuery = "INSERT INTO t_training_collaborators (trainingID, username, isAll, certificateFilePath, certificateDate, dateOpened, finishedDate)
            VALUES (?, ?, ?, ?, ?, ?, ?)";
      $stmtCollaborators = $conn->prepare($insertCollaboratorsQuery);

      foreach ($trainingCollaborators['collaborators'] as $collaborator) {
        $stmtCollaborators->bind_param(
          "isissss",
          $trainingID,
          $collaborator,
          $trainingCollaborators['isAll'],
          $trainingCollaborators['certificateFilePath'],
          $trainingCollaborators['certificateDate'],
          $trainingCollaborators['dateOpened'],
          $trainingCollaborators['finishedDate']
        );
        $stmtCollaborators->execute();
      }
    }

    // Commit the transaction
    $conn->commit();
    return [
      'status' => 'Success',
    ];
  } catch (Exception $e) {
    // If there's any error, rollback the transaction
    $conn->rollback();
    echo "Failed to insert training data and collaborators: " . $e->getMessage();
  } finally {
    // Close the database connection
    $conn->close();
  }
}

function deleteTraining($trainingID) {
  global $conn;

  // Start a transsaction to ensure that both deletions are successfull or none
  $conn->begin_transaction();

  // First, delete the collaborators associated with the training from t_training_collaborators
  $deleteCollaboratorsQuery = "DELETE FROM t_training_collaborators WHERE trainingID = ?";
  $deleteCollaboratorsStmt = $conn->prepare($deleteCollaboratorsQuery);
  $deleteCollaboratorsStmt->bind_param('i', $trainingID);
  $deleteCollaboratorsSuccess = $deleteCollaboratorsStmt->execute();

  // Net, delete the training from t_trainings table
  $deleteTrainingQuery = "DELETE FROM t_trainings WHERE ID = ?";
  $deleteTrainingStmt = $conn->prepare($deleteTrainingQuery);
  $deleteTrainingStmt->bind_param('i', $trainingID);
  $deleteTrainingSuccess = $deleteTrainingStmt->execute();

  // Check if both deletions were successful
  if ($deleteCollaboratorsSuccess && $deleteTrainingSuccess) {
    // Commit the transaction
    $conn->commit();
    return [
      'icon' => 'success',
      'html' => 'Formação e collaboradores associados foram apagados com sucesso!',
      'title' => 'Formação apagada',
    ];
  } else {
    // Rollback the transaction if any deletion fails
    $conn->rollback();
    return [
      'icon' => 'error',
      'html' => 'Um erro inesperado ocorreu ao tentar apagar esta formação, contacte o departamento informático: informatica@amatoscar.pt.',
      'title' => 'Erro de servidor',
    ];
  }

  // Close the database connection
  $conn->close();
}