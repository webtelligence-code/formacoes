import React from 'react'
import { Navbar } from 'react-bootstrap'
import Filters from '../ListTrainingPage/Filters'

const TopNav = ({ title, showFilters, trainingVideo, setTrainingVideo, buttonText, setPage }) => {
  return (
    <Navbar sticky='top'>
      {/* Page label */}
      <Navbar.Brand>
        <h3 style={{ color: '#ed6337' }}>{title}</h3>
      </Navbar.Brand>

      {/* Filters Row (Register/goBack -> button) | (portal filter -> select) | (platform fiter -> select) | (isFinished filter -> select) | (clear filters -> button) */}
      <div style={{ width: '100%' }}>
        <Filters setPage={setPage} showFilters={showFilters} trainingVideo={trainingVideo} setTrainingVideo={setTrainingVideo} buttonText={buttonText} />
      </div>
    </Navbar>
  )
}

export default TopNav