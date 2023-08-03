import { faCheck, faEdit, faTrash, faTriangleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Popconfirm, message } from 'antd';
import axios from 'axios';
import chalk from 'chalk';
import React, { Fragment, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment';

const CustomTable = ({ isModalOpen, setIsModalOpen, API_URL, trainingsList, handleTrainingClick, sessionUsername }) => {
  

  // Function to determine if the user has access to the action buttons
  const userHasControl = (training) => {
    return sessionUsername === training.usernameCreated || sessionUsername === training.usernameUpdated;
  }

  const handleTableRowClick = (trainingID) => {
    if (!isModalOpen) { // Check if the modal is not open
      handleTrainingClick(trainingID);
    }
  };

  /**
   * This function will handle the stopPropagation on the table row and then activate the modal
   * @param {object} event 
   * @param {integer} trainingID 
   */
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
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
          <tr style={{ cursor: 'pointer' }} key={key} onClick={() => handleTableRowClick(training.ID)}>
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
                  <Button shape='circle' className='me-2'>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>

                  <Button
                    shape='circle'
                    type='primary'
                    style={{ backgroundColor: '#cf0202' }}
                    onClick={handleDeleteClick}
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
