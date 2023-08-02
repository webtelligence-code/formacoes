import React from 'react'
import { Card } from 'react-bootstrap'

const TrainingProgress = () => {
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
        Progresso da formação
      </Card.Header>
    </Card>
  )
}

export default TrainingProgress