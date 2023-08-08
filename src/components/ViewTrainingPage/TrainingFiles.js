import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React from 'react'
import { Card } from 'react-bootstrap'

const TrainingFiles = () => {
  return (
    <Card className='mt-4'>
      <Card.Header
        style={{ backgroundColor: 'transparent' }}
      >
        <h4>Anexos</h4>
      </Card.Header>

      <Card.Body>
        <Button type='primary' style={{ backgroundColor: 'blueviolet' }} icon={<FontAwesomeIcon icon={faFileImport} />}>Anexar ficheiro</Button>
      </Card.Body>
    </Card>
  )
}

export default TrainingFiles