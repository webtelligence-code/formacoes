import React, { Fragment } from 'react'
import CustomTable from '../components/ListTrainingPage/CustomTable';

const ListTrainingPage = ({ handleTrainingClick }) => {
  // Sample data
  const data = [
    { id: 1, data: '2020-08-06', portal: 'A MatosCar', plataforma: 'Requisiçoes Internas', titulo: 'Video Formação', dataLimite: null, realizada: false },
    { id: 2, data: '2020-08-19', portal: 'A MatosCar', plataforma: 'Medidas de prevenção e Proteção em Oficinas de Reparação', titulo: '1- introdução', dataLimite: null, realizada: true },
    { id: 3, data: '2020-08-19', portal: 'A MatosCar', plataforma: 'Medidas de prevenção e Proteção em Oficinas de Reparação', titulo: '2- A pandemia Covid19', dataLimite: null, realizada: false },
    { id: 4, data: '2020-08-19', portal: 'A MatosCar', plataforma: 'Medidas de prevenção e Proteção em Oficinas de Reparação', titulo: '3- EPI', dataLimite: null, realizada: false },
    // Add more data as needed
  ];

  return (
    <Fragment>
      <CustomTable data={data} handleTrainingClick={handleTrainingClick} />
    </Fragment>
  )
}

export default ListTrainingPage