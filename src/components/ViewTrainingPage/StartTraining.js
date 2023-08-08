import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card } from 'react-bootstrap'

const StartTraining = ({ setTrainingVideo }) => {
  return (
    <Card
      onClick={() => setTrainingVideo(true)}
      style={{ cursor: 'pointer' }}
      className='h-100 text-center justify-content-center card-hover'
    >
      <h5 style={{ color: 'green' }}><FontAwesomeIcon icon={faPlay} className='me-2' />Iniciar formação</h5>
    </Card>
  )
}

export default StartTraining