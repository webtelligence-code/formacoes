import React from 'react'
import { Col, Image, Navbar, Row } from 'react-bootstrap'
import Filters from './Filters'
import { Button } from 'antd'

const TopNav = ({ setPage }) => {
  return (
    <Navbar sticky='top'>
      <Navbar.Brand>
        <h3 style={{ color: '#ed6337' }}>Formações</h3>
      </Navbar.Brand>

      <div style={{ width: '100%' }}>
        <Filters setPage={setPage} />
      </div>
    </Navbar>
  )
}

export default TopNav