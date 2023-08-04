import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CustomTable from '../components/ListTrainingPage/CustomTable';
import axios from 'axios';
import chalk from 'chalk';
import { Alert } from 'antd';

const ListTrainingPage = ({
  isModalOpen,
  API_URL,
  handleTrainingClick,
  sessionData
}) => {
  const [trainingsList, setTrainingsList] = useState([]);

  const actionType = sessionData.DEPARTAMENTO === 'Informático' ? 'get_all_trainings' : 'get_my_trainings';

  const fetchTrainings = useCallback(() => {
    axios.get(API_URL, {
      params: {
        action: actionType,
        username: sessionData.USERNAME
      }
    })
      .then((response) => {
        console.log(chalk.green('Fetched All Trainings ->'), response.data);
        console.log(chalk.blue('Action type to fetchTrainings ->'), actionType)
        setTrainingsList(response.data)
      })
      .catch((error) => {
        console.log(chalk.red('Failed to fetch all trainings from API'), error)
      })
  }, [API_URL, actionType, sessionData.USERNAME])

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  return (
    <Fragment>
      {trainingsList.length > 0 ? (
        <CustomTable
          API_URL={API_URL}
          sessionData={sessionData}
          trainingsList={trainingsList}
          handleTrainingClick={handleTrainingClick}
          fetchTrainings={fetchTrainings}
        />
      ) : (
        <Alert message="Não tem nenhuma formação disponível" banner />
      )}

    </Fragment>
  )
}

export default ListTrainingPage