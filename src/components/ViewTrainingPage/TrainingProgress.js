import { Steps } from 'antd'
import React from 'react'
import { Card } from 'react-bootstrap'
import Moment from 'react-moment'



const TrainingProgress = ({ training }) => {
  const currentStep = 1

  const items = [
    {
      title: 'Criada',
      description: training.dateCreated && <Moment format='DD-MM-YYYY'>{training.dateCreated}</Moment>,
    },
    {
      title: 'Em Progresso',
      description: training.dateUpdated && <Moment format='DD-MM-YYYY'>{training.dateUpdated}</Moment>,
    },
    { 
      title: 'À Espera',
      description: training.dateLimit && <Moment format='DD-MM-YYYY'>{training.dateLimit}</Moment>,
    }
  ]

  return (
    <Card className='h-100'>
      <Card.Header
        style={{
          backgroundColor: 'transparent',
          color: '#ed6337'
        }}
        className='text-center'
      >
        <h3>Progresso da formação</h3>
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        <Steps current={currentStep} labelPlacement='vertical' items={items.slice(0, currentStep + 1)}/>
      </Card.Body>
    </Card>
  )
}

export default TrainingProgress