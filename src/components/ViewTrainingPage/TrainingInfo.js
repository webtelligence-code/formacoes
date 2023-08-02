import React from 'react'
import { Card } from 'react-bootstrap'

const TrainingInfo = ({ training, collaborators}) => {
  return (
    <Card>
      <Card.Header
        as={'h5'}
        style={{
          backgroundColor: 'transparent',
          color: '#ed6337'
        }}
        className='text-center'
      >
        {training.title}
      </Card.Header>

      <Card.Body>
        {training.description}
      </Card.Body>
    </Card>
  )
}

export default TrainingInfo