import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ columns, data }) => {

  return (
    <Table hover className='w-100'>

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

      <tbody>
        {data.map((item, key) => (
          <tr key={key}>
            <td>{item.data}</td>
            <td>{item.portal}</td>
            <td>{item.plataforma}</td>
            <td>{item.titulo}</td>
            <td>{item.dataLimite ? item.dataLimite : 'Sem Limite'}</td>
            <td className='text-center'>
              <FontAwesomeIcon icon={item.realizada ? faCheck : faX} color={item.realizada ? 'green' : 'red'} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
