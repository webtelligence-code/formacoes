import { Container } from 'react-bootstrap';
import './App.css';
import ListTrainingPage from './pages/ListTrainingPage';
import RegisterTrainingPage from './pages/RegisterTrainingPage';
import { useState } from 'react';

function App() {

  const [page, setPage] = useState('Home')

  return (
    <Container>
      {page === 'Home' && (<ListTrainingPage setPage={setPage} />)}
      {page === 'Register' && (<RegisterTrainingPage setPage={setPage} />)}
    </Container>
  );
}

export default App;