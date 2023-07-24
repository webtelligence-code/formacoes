import { faBuilding, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Select from 'react-select'

const Filters = () => {
  return (
    <Row className='text-center justify-content-center'>
      <Col>
        <Select
          onChange={() => { }}
          placeholder={<label>Filtrar portal<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
          name='portal'
          isClearable
          options={[]}
        />
      </Col>

      <Col>
        <Select
          onChange={() => { }}
          placeholder={<label>Filtrar plataforma<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
          name='plataforma'
          isClearable
          options={[]}
        />
      </Col>

      <Col>
        <Select
          onChange={() => { }}
          placeholder={<label>Filtrar realização<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
          name='realizada'
          isClearable
          options={[]}
        />
      </Col>

      <Col>
        <Button className='h-100 w-100'><FontAwesomeIcon className='me-2' icon={faFilterCircleXmark} />Limpar filtros</Button>
      </Col>
    </Row>
  )
}

export default Filters