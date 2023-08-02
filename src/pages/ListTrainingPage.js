import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CustomTable from '../components/ListTrainingPage/CustomTable';
import axios from 'axios';
import chalk from 'chalk';

const ListTrainingPage = ({ API_URL, handleTrainingClick, sessionUsername }) => {
  const [trainingsList, setTrainingsList] = useState([]);

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

  return (
    <Fragment>
      <CustomTable sessionUsername={sessionUsername} trainingsList={trainingsList} handleTrainingClick={handleTrainingClick} />
    </Fragment>
  )
}

export default ListTrainingPage