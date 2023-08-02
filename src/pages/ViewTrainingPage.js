import axios from 'axios';
import chalk from 'chalk';
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import TrainingInfo from '../components/ViewTrainingPage/TrainingInfo';
import TrainingProgress from '../components/ViewTrainingPage/TrainingProgress';
import TrainingFiles from '../components/ViewTrainingPage/TrainingFiles';
import { Col, Row } from 'react-bootstrap';
import { Fragment } from 'react';

const ViewTrainingPage = ({ trainingID, API_URL, setNavbarTitle }) => {
  const [training, setTraining] = useState({});
  const [collaborators, setCollaborators] = useState([]);

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
  }, [API_URL, setNavbarTitle, trainingID]);

  useEffect(() => {
    fetchTraining()
  }, [fetchTraining])

  return (
    <Fragment>
      <Row>
        <Col md={5}>
          <TrainingInfo training={training} collaborators={collaborators} />
        </Col>
        <Col md={7}>
          <TrainingProgress />
        </Col>
      </Row>
      
      <Row>
        <Col className='text-center'>
          <TrainingFiles />
        </Col>
      </Row>
    </Fragment>

  )
}

export default ViewTrainingPage