import React from 'react'
import { Navbar } from 'react-bootstrap'
import Filters from './Filters'

const TopNav = ({ title, showFilters, buttonText, setPage }) => {
  return (
    <Navbar sticky='top'>
      <Navbar.Brand>
        <h3 style={{ color: '#ed6337' }}>{title}</h3>
      </Navbar.Brand>

      <div style={{ width: '100%' }}>
        <Filters setPage={setPage} showFilters={showFilters} buttonText={buttonText} />
      </div>
    </Navbar>
  )
}

export default TopNav