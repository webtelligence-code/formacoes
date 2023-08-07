import { faCheck, faEdit, faTrash, faTriangleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import axios from 'axios';
import chalk from 'chalk';
import React, { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CustomTable = ({
  API_URL,
  trainingsList,
  handleTrainingClick,
  sessionData,
  fetchTrainings,
  handleEditClick
}) => {

  // Initialize sweetalert2
  const MySwal = withReactContent(Swal);

  // Function to determine if the user has access to the action buttons
  const userHasControl = (training) => {
    return sessionData.USERNAME === training.usernameCreated || sessionData.USERNAME === training.usernameUpdated;
  }

  /**
   * This function will handle the stopPropagation on the table row and then activate the modal
   * @param {object} event 
   * @param {integer} trainingID 
   */
  const handleDeleteClick = (event, training) => {
    event.stopPropagation();

    MySwal.fire({
      title: 'Apagar formação',
      html: generateModalBody(training),
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#cf0202',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(chalk.red('You are going to delete ->'), training)
          deleteTraining(training.ID);
        }
      })
  }

  const generateModalBody = (training) => (
    <Fragment>
      <p>De certeza que quer apagar a formação <strong>{training.title}</strong>?</p>
      <p><strong>Nota: </strong>
        Caso aceite esta ação, <strong>todos os colaboradores</strong> associados a esta formação irão perder acesso à mesma.
      </p>
    </Fragment>
  )

  /**
   * This function will make a delete request to the server to delete the training on the database
   * @param {integer} trainingID 
   */
  const deleteTraining = async (trainingID) => {
    const formData = new FormData();

    formData.append('action', 'delete_training');
    formData.append('trainingID', trainingID);

    axios.post(API_URL, formData)
      .then((response) => {
        MySwal.fire({
          title: response.data.title,
          html: response.data.html,
          icon: response.data.icon,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: '#16B832',
          confirmButtonText: 'Ok',
        })
          .then((result) => {
            if (result.isConfirmed) {
              fetchTrainings(); // Call Fetch all training function when user clicks on ok button
            }
          })
        console.log(chalk.green('Success on deleting training on the server'), response.data);
      })
      .catch((error) => {
        console.log(chalk.red('Failed to delete training on the server.'), error);
      })
  }

  return (
    <Table hover className='w-100'>

      {/* Table header */}
      <thead>
        <tr>
          <th>Data criada</th>
          <th>Portal</th>
          <th>Plataforma</th>
          <th>Título</th>
          <th>Data Limite</th>
          <th className='text-center'>Realizada</th>
          <th className='text-center'>Ação</th>
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {trainingsList.map((training, key) => (
          <tr style={{ cursor: 'pointer' }} key={key} onClick={() => handleTrainingClick(training.ID)}>
            <td><Moment format='DD-MM-YYYY'>{training.dateCreated}</Moment></td>
            <td>{training.portal}</td>
            <td>{'teste'}</td>
            <td>{training.title}</td>
            <td>{training.dateLimit ? (
              <Fragment>
                <Moment className='me-3' format='DD-MM-YYYY'>{training.dateLimit}</Moment>
                <Moment format='HH:mm'>{training.dateLimit}</Moment>h
              </Fragment>
            ) : 'Sem Limite'}
            </td>
            <td className='text-center'>
              <FontAwesomeIcon icon={training.isFinished === 1 ? faCheck : faX} color={training.isFinished === 1 ? 'green' : 'red'} />
            </td>
            <td className='text-center'>
              {userHasControl(training) ? (
                <Fragment>
                  <Button
                    shape='circle'
                    className='me-2'
                    onClick={(e) => handleEditClick(e, training.ID)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>

                  <Button
                    shape='circle'
                    type='primary'
                    style={{ backgroundColor: '#cf0202' }}
                    onClick={(e) => handleDeleteClick(e, training)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Fragment>
              ) : (
                <FontAwesomeIcon icon={faTriangleExclamation} color='orange' />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
