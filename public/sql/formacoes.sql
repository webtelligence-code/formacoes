
-- Create the t_trainings table

CREATE TABLE t_trainings (
  ID INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  dateCreated DATETIME NOT NULL,
  dateUpdated DATETIME NOT NULL,
  dateLimit DATETIME NOT NULL,
  title VARCHAR(255) NOT NULL,
  brand ENUM (
    'Abarth',
    'Alfa Romeu',
    'Audi',
    'BMW',
    'BMW Motorrad',
    'Chevrolet',
    'Chrysler',
    'Citroen',
    'Colisão',
    'Dodge',
    'Évora Colisão',
    'Fiat',
    'Fiat Profissional',
    'Ford',
    'Hyundai',
    'Isuzu',
    'Iveco',
    'Jeep',
    'Kia',
    'Lancia',
    'Loja Tangerina',
    'Mini',
    'Multi Marca',
    'Nissan',
    'Opel',
    'Peugeot',
    'Seat',
    'Skoda',
    'Volkswagen',
    'Volkswagen Comercial',
    'Volvo'
  ) NULL,
  location ENUM('Online', 'Lisboa', 'Guarda', 'Fundão', 'Castelo Branco', 'Portalegre', 'Elvas', 'Évora', 'Beja') NOT NULL,
  description TEXT NOT NULL,
  isFinished TINYINT(1) NOT NULL,
  portal ENUM ('A MatosCar', 'Marca') NOT NULL,
  image VARCHAR(255) NOT NULL,
  filePath VARCHAR (255) NULL,
  usernameCreated VARCHAR(50) NOT NULL,
  usernameUpdated VARCHAR(50) NOT NULL
);

-- Create the t_training_collaborators table

CREATE TABLE t_training_collaborators (
  ID INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  trainingID INT(11) NOT NULL,
  username VARCHAR(255) NULL,
  isAll TINYINT(1) NOT NULL,
  certificateFilePath VARCHAR(255) NULL,
  certificateDate DATETIME NULL,
  dateOpened DATETIME NULL,
  finishedDate DATETIME NULL,
  FOREIGN KEY (trainingID) REFERENCES t_trainings (ID)
);