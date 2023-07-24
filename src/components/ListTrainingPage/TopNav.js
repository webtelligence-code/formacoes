import React from 'react'
import { Image, Navbar } from 'react-bootstrap'
import Filters from './Filters'

const TopNav = () => {
  return (
    <Navbar sticky='top'>
      <Navbar.Brand>
        <Image src='https://amatoscar.pt/assets/media/general/logoamatoscar.webp' width={100} />
      </Navbar.Brand>

      <h3 className='me-4' style={{ color: '#ed6337' }}>Formações</h3>

      <div style={{width: '100%'}}>
        <Filters />
      </div>
    </Navbar>
  )
}

export default TopNav