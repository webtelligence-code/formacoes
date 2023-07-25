import { Container } from 'react-bootstrap';
import './App.css';
import ListTrainingPage from './pages/ListTrainingPage';
import RegisterTrainingPage from './pages/RegisterTrainingPage';
import ViewTrainingPage from './pages/ViewTrainingPage';
import { useState } from 'react';

const API_URL = 'https://amatoscar.pt/GAP/NovasPlataformas/formacoes/api/index.php';

function App() {
  const [page, setPage] = useState('List')

  return (
    <Container>
      {page === 'List' && (<ListTrainingPage setPage={setPage} API_URL={API_URL} />)}
      {page === 'Register' && (<RegisterTrainingPage setPage={setPage} API_URL={API_URL} />)}
      {page === 'View' && (<ViewTrainingPage setPage={setPage} API_URL={API_URL} />)}
    </Container>
  );
}

export default App;