import axios from 'axios';
import chalk from 'chalk';
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import TrainingInfo from '../components/ViewTrainingPage/TrainingInfo';
import TrainingProgress from '../components/ViewTrainingPage/TrainingProgress';
import TrainingFiles from '../components/ViewTrainingPage/TrainingFiles';
import { Col, Row } from 'react-bootstrap';
import { Fragment } from 'react';
import TrainingVideo from '../components/ViewTrainingPage/TrainingVideo';
import TopNav from '../components/utility/TopNav';
import StartTraining from '../components/ViewTrainingPage/StartTraining';

const ViewTrainingPage = ({
  trainingID,
  API_URL,
  setNavbarTitle,
  setPage,
}) => {
  const [training, setTraining] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [trainingVideo, setTrainingVideo] = useState(false);

  // This function will make an api get request call to fetch selected training from 
  // the table and assign objects and array properties as well has set navbar title
  const fetchTraining = useCallback(() => {
    axios.get(API_URL, {
      params: {
        action: 'get_training',
        trainingID // Send trainingID to API
      }
    })
      .then((response) => {
        console.log(chalk.green('Fetched training data ->'), response.data);
        setTraining(response.data);
        setCollaborators(response.data.collaborators);
        setNavbarTitle(response.data.title);
      })
      .catch((error) => {
        console.log(chalk.red('Failed to fetch training data ->'), error);
      })
  }, [API_URL, setNavbarTitle, trainingID])

  useEffect(() => {
    fetchTraining()
  }, [fetchTraining])

  return (
    !trainingVideo ? (
      <Fragment>
        <TopNav title={training.title} showFilters={false} trainingVideo={trainingVideo} setTrainingVideo={setTrainingVideo} setPage={setPage} buttonText={'Voltar'} />

        <Row>

          <Col md={5}>
            <TrainingInfo training={training} collaborators={collaborators} />
          </Col>

          <Col md={2}>
            <StartTraining setTrainingVideo={setTrainingVideo} />
          </Col>

          <Col md={5}>
            <TrainingProgress training={training} />
          </Col>

        </Row>

        <Row>
          <Col className='text-center'>
            <TrainingFiles setTrainingVideo={setTrainingVideo} />
          </Col>
        </Row>
      </Fragment>
    ) : (
      <Fragment>
        <TopNav title={training.title} showFilters={false} trainingVideo={trainingVideo} setTrainingVideo={setTrainingVideo} setPage={setPage} buttonText={'Interromper formação'} />
        <TrainingVideo filePath='/GAP/NovasPlataformas/formacoes/videos/RIVideo.mp4' />
      </Fragment>
    )
  )
}

export default ViewTrainingPage