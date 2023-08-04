import { Container } from 'react-bootstrap';
import './App.css';
import ListTrainingPage from './pages/ListTrainingPage';
import RegisterTrainingPage from './pages/RegisterTrainingPage';
import ViewTrainingPage from './pages/ViewTrainingPage';
import { useCallback, useEffect, useState } from 'react';
import TopNav from './components/utility/TopNav';
import chalk from 'chalk';
import axios from 'axios';

const API_URL = 'https://amatoscar.pt/GAP/NovasPlataformas/formacoes/api/index.php';

function App() {
  const [page, setPage] = useState('List')
  const [navbarTitle, setNavbarTitle] = useState('Formações');
  const [navbarButtonText, setNavbarButtonText] = useState('Registar');
  const [trainingID, setTrainingID] = useState(null);
  const [sessionData, setSessionData] = useState({});

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
        setNavbarTitle('Formações');
        setNavbarButtonText('Registar');
        break;
      case 'Register':
        setNavbarTitle('Registar formação');
        setNavbarButtonText('Voltar');
        break;
      case 'View':
        setNavbarTitle('Formação');
        setNavbarButtonText('Voltar');
        break;
      default:
        console.log(chalk.red('You need to specify page type.'));
        break;
    }
  }, [page]);

  /**
   * This function will handle the ID setState and then change to ViewTrainingPage.
   * @param {integer} id 
   */
  const handleTrainingClick = (id) => {
    setTrainingID(id); // Set the ID for th training that user clicked
    setPage('View'); // Set page to ViewTrainingPage
  }



  return (
    <Container>

      {/* Navbar with custom options */}
      <TopNav title={navbarTitle} showFilters={page === 'List'} setPage={setPage} buttonText={navbarButtonText} />

      {/* Pages */}
      {(page === 'List') && (
        <ListTrainingPage
          sessionData={sessionData}
          handleTrainingClick={handleTrainingClick}
          API_URL={API_URL}
        />
      )}
      {page === 'Register' && (
        <RegisterTrainingPage
          sessionData={sessionData}
          API_URL={API_URL}
          setPage={setPage}
        />
      )}
      {page === 'View' && (
        <ViewTrainingPage
          trainingID={trainingID}
          API_URL={API_URL}
          setNavbarTitle={setNavbarTitle}
        />
      )}
    </Container>
  );
}

export default App;