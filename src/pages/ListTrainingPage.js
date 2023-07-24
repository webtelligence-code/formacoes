import React, { Fragment } from 'react'
import CustomTable from '../components/ListTrainingPage/CustomTable';
import TopNav from '../components/ListTrainingPage/TopNav';

const ListTrainingPage = ({ setPage }) => {
  // Sample data
  const data = [
    { data: '2020-08-06', portal: 'A MatosCar', plataforma: 'Requisiçoes Internas', titulo: 'Video Formação', dataLimite: null, realizada: false },
    { data: '2020-08-19', portal: 'A MatosCar', plataforma: 'Medidas de prevenção e Proteção em Oficinas de Reparação', titulo: '1- introdução', dataLimite: null, realizada: true },
    { data: '2020-08-19', portal: 'A MatosCar', plataforma: 'Medidas de prevenção e Proteção em Oficinas de Reparação', titulo: '2- A pandemia Covid19', dataLimite: null, realizada: false },
    { data: '2020-08-19', portal: 'A MatosCar', plataforma: 'Medidas de prevenção e Proteção em Oficinas de Reparação', titulo: '3- EPI', dataLimite: null, realizada: false },
    // Add more data as needed
  ];

  return (
    <Fragment>
      <TopNav setPage={setPage} />
      <CustomTable data={data} />
    </Fragment>
  )
}

export default ListTrainingPage