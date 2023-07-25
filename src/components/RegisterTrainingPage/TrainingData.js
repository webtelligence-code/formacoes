import { faCar, faGraduationCap, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Switch, DatePicker, TimePicker, Input } from 'antd';
import axios from 'axios';
import chalk from 'chalk';
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Moment from 'react-moment';
import Select from 'react-select'

const TrainingData = ({ 
  API_URL,
  title,
  setTitle,
  brands,
  location,
  setLocation,
  cities,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  switchCheked,
  setSwitchChecked
}) => {  

  /////////////////////////////////////////////////////////////////////////////////
  // COMPONENT FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////
  const onChangeDateAndTime = (type, value, stringValue) => {
    switch (type) {
      case 'date':
        setSelectedDate(value);
        console.log('Date String ->', stringValue);
        break;
      case 'time':
        setSelectedTime(value);
        console.log('Time String ->', stringValue);
        break;
      default:
        console.log(chalk.red('No matching type parameter.'));
        break;
    }
  }

  const handleSubmit = () => {
    alert(`The title you entered is ${title}`);
  }

  return (
    <Fragment>
      <Row>
        <h5 style={{ color: '#ed6337' }}>Dados da formação</h5>
        <Col>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
            <label style={{ fontWeight: '700' }}>Título</label>
            <Input name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
            <label style={{ fontWeight: '700' }}>Marca</label>
            <Select
              onChange={() => { }}
              placeholder={<label>Selecione a marca<FontAwesomeIcon icon={faCar} className='ms-2' /></label>}
              name='brand'
              isClearable
              options={brands}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
            <label style={{ fontWeight: '700' }}>Localização</label>
            <Select
              onChange={() => { }}
              placeholder={<label>Selecione a localização<FontAwesomeIcon icon={faMapLocationDot} className='ms-2' /></label>}
              name='location'
              isClearable
              options={cities}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontWeight: '700' }}>Sem limite de data</label>
            <Switch className='ms-2' onChange={(checked) => setSwitchChecked(checked)} />
          </div>

          {!switchCheked && (
            <Row>
              <Col>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                  <label style={{ fontWeight: '700' }}>Selecione a data limite</label>
                  <DatePicker format="DD/MM/YYYY" onChange={(date, dateString) => onChangeDateAndTime('date', date, dateString)} allowClear />
                  {selectedDate && (<p>Selected Date: <Moment format='DD/MM/YYYY'>{selectedDate}</Moment></p>)}
                </div>
              </Col>

              <Col>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                  <label style={{ fontWeight: '700' }}>Selecione o horário limite</label>
                  <TimePicker format={'HH:mm'} onChange={(time, timeString) => onChangeDateAndTime('time', time, timeString)} allowClear />
                  {selectedTime && (<p>Selected Time: <Moment format='HH:mm'>{selectedTime}</Moment></p>)}
                </div>
              </Col>
            </Row>
          )}
        </Col>

        <Col>

        </Col>
      </Row>
      <Button onClick={handleSubmit} icon={<FontAwesomeIcon icon={faGraduationCap} />}>Registar</Button>
    </Fragment>
  )
}

export default TrainingData