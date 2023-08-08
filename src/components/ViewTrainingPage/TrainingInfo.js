import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Moment from 'react-moment'

const TrainingInfo = ({ training }) => {
  return (
    <Card className='h-100'>
      <Card.Header
        style={{
          backgroundColor: 'transparent',
          color: '#ed6337'
        }}
        className='text-center'
      >
        <h3>{training.title}</h3>
        {training.description && <label style={{ color: 'black' }}>{training.description}</label>}
      </Card.Header>

      <Card.Body className="d-flex flex-column justify-content-center">
        <Row>

          <Col md={6}>
            <label>
              <strong>Data limite: </strong>
              {training.dateLimit ? <Moment format='DD-MM-YYYY HH:mm'>{training.dateLimit}</Moment> : 'Sem limite de data'}
            </label>
          </Col>

          <Col md={6} className='text-end'>
            <label>
              <strong>Localização: </strong>
              {training.location}
            </label>
          </Col>

        </Row>
      </Card.Body>
    </Card>
  )
}

export default TrainingInfo