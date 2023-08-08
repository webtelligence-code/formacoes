import { Container } from 'react-bootstrap';
import './App.css';
import ListTrainingPage from './pages/ListTrainingPage';
import RegisterTrainingPage from './pages/RegisterTrainingPage';
import ViewTrainingPage from './pages/ViewTrainingPage';
import { useCallback, useEffect, useState } from 'react';
import chalk from 'chalk';
import axios from 'axios';

const API_URL = 'https://amatoscar.pt/GAP/NovasPlataformas/formacoes/api/index.php';

function App() {
  const [page, setPage] = useState('List')
  const [trainingID, setTrainingID] = useState(null);
  const [sessionData, setSessionData] = useState({});
  const [edit, setEdit] = useState(false);

  /////////////////////////////////////////////////////////////////////////////////
  // REQUEST FUNCTIONS FOR REGISTER TRAINING PAGE
  ////////////////////////////////////////////////////////////////////////////////
  const fetchSessionData = useCallback(() => {
    axios.get(API_URL, {
      params: {
        action: 'get_session_data'
      }
    })
      .then((response) => {
        console.log(chalk.green('Fetched session data ->'), response.data);
        setSessionData(response.data)
      })
      .catch((error) => {
        console.log(chalk.red('Failed to fetch session data.'), error);
      })
  }, []);

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData])

  // Use effect controller to set apropriate navbar options and labels
  useEffect(() => {
    switch (page) {
      case 'List':
        setTrainingID(null)
        setEdit(false)
        break;
      case 'Register':

        break;
      case 'View':
        setEdit(false)
        break;
      default:
        console.log(chalk.red('You need to specify page type.'));
        break;
    }
  }, [edit, page]);

  /**
   * This function will handle the ID setState and then change to ViewTrainingPage.
   * @param {integer} id 
   */
  const handleTrainingClick = (trainingID) => {
    setTrainingID(trainingID); // Set the ID for th training that user clicked
    setPage('View'); // Set page to ViewTrainingPage
  }

  const handleEditClick = (event, trainingID) => {
    event.stopPropagation();
    setTrainingID(trainingID); // Set the ID 
    setEdit(true);
    setPage('Register');
  }

  return (
    <Container>
      {/* Pages */}
      {(page === 'List') && (
        <ListTrainingPage
          sessionData={sessionData}
          handleTrainingClick={handleTrainingClick}
          setPage={setPage}
          API_URL={API_URL}
          handleEditClick={handleEditClick}
        />
      )}
      {page === 'Register' && (
        <RegisterTrainingPage
          sessionData={sessionData}
          API_URL={API_URL}
          setPage={setPage}
          trainingID={trainingID}
        />
      )}
      {page === 'View' && (
        <ViewTrainingPage
          trainingID={trainingID}
          API_URL={API_URL}
          setPage={setPage}
        />
      )}
    </Container>
  );
}

export default App;