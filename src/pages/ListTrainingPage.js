import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CustomTable from '../components/ListTrainingPage/CustomTable';
import axios from 'axios';
import chalk from 'chalk';
import { Modal } from 'antd';

const ListTrainingPage = ({ API_URL, handleTrainingClick, sessionUsername }) => {
  const [trainingsList, setTrainingsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAllTrainings = useCallback(() => {
    axios.get(API_URL, {
      params: {
        action: 'get_all_trainings'
      }
    })
      .then((response) => {
        console.log(chalk.green('Fetched All Trainings ->'), response.data);
        setTrainingsList(response.data)
      })
      .catch((error) => {
        console.log(chalk.red('Failed to fetch all trainings from API'), error)
      })
  }, [API_URL])

  useEffect(() => {
    fetchAllTrainings();
  }, [fetchAllTrainings]);

  /**
   * This function will make a delete request to the server to delete the training on the database
   * @param {integer} trainingID 
   */
  const deleteTraining = async (trainingID) => {
    axios.delete(API_URL, {
      params: {
        action: 'delete_training',
        trainingID
      }
    })
      .then((response) => {
        console.log(chalk.green('Success on deleting training on the server'), response.data);
      })
      .catch((error) => {
        console.log(chalk.red('Failed to delete training on the server.'), error);
      })
  }

  return (
    <Fragment>
      <CustomTable 
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      sessionUsername={sessionUsername} 
      trainingsList={trainingsList} 
      handleTrainingClick={handleTrainingClick} 
      />
      <Modal
        title='Apagar formação?'
        open={isModalOpen}
      >
        <p>De certeza que quer apagar a formação</p>
      </Modal>
    </Fragment>
  )
}

export default ListTrainingPage