import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ trainingsList, handleTrainingClick }) => {

  return (
    <Table hover className='w-100'>

      {/* Table header */}
      <thead>
        <tr>
          <th>Data</th>
          <th>Portal</th>
          <th>Plataforma</th>
          <th>Título</th>
          <th>Data Limite</th>
          <th className='text-center'>Realizada</th>
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {trainingsList.map((training, key) => (
          <tr style={{ cursor: 'pointer' }} key={key} onClick={() => handleTrainingClick(training.ID)}>
            <td>{training.dateCreated}</td>
            <td>{training.portal}</td>
            <td>{'teste'}</td>
            <td>{training.title}</td>
            <td>{training.dateLimit ? training.dateLimit : 'Sem Limite'}</td>
            <td className='text-center'>
              <FontAwesomeIcon icon={training.isFinished === 1 ? faCheck : faX} color={training.isFinished === 1 ? 'green' : 'red'} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
