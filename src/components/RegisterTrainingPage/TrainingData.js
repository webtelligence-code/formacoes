/* eslint-disable jsx-a11y/anchor-is-valid */
import { faCar, faGraduationCap, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Switch, DatePicker, TimePicker, Input } from 'antd';
import chalk from 'chalk';
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Tooltip } from 'react-tooltip'

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
  switchDateCheked,
  setSwitchDateChecked,
}) => {

  /////////////////////////////////////////////////////////////////////////////////
  // COMPONENT FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////
  const onChangeDateAndTime = (type, value, stringValue) => {
    switch (type) {
      case 'date':
        setSelectedDate(value);
        console.log('Date ->', value);
        console.log('Date String ->', stringValue);
        break;
      case 'time':
        setSelectedTime(value);
        console.log('Time ->', value);
        console.log('Time String ->', stringValue);
        break;
      default:
        console.log(chalk.red('No matching type parameter.'));
        break;
    }
  }

  return (
    <Fragment>
      <h5 style={{ color: '#ed6337', marginBottom: 20 }}>Dados da formação</h5>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
        <label style={{ fontWeight: '700' }}>Título</label>
        <Input
          placeholder='Introduza um título'
          allowClear
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
        <label style={{ fontWeight: '700' }}>Marca</label>
        
        <a data-tooltip-id='brand-tooltip' data-tooltip-content='O título de ter pelo menos 5 caracteres'>
          <Select
            className='brand-tooltip'
            isDisabled={title.length < 5}
            onChange={() => { }}
            placeholder={<label>Selecione a marca<FontAwesomeIcon icon={faCar} className='ms-2' /></label>}
            name='brand'
            isClearable
            options={brands}
          />
        </a>
        {title.length < 5 && (<Tooltip id='brand-tooltip' />)}
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
        <Switch style={{ backgroundColor: switchDateCheked ? 'green' : 'red' }} checkedChildren="Sim" unCheckedChildren="Não" className='ms-2' onChange={(checked) => setSwitchDateChecked(checked)} />
      </div>

      {!switchDateCheked && (
        <Row>
          <Col>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
              <label style={{ fontWeight: '700' }}>Selecione a data limite</label>
              <DatePicker showTime format="DD/MM/YYYY" onChange={(date, dateString) => onChangeDateAndTime('date', date, dateString)} allowClear />
              {selectedDate && (<p>Selected Date: {selectedDate.format('DD/MM/YYYY')}</p>)}
            </div>
          </Col>

          <Col>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
              <label style={{ fontWeight: '700' }}>Selecione o horário limite</label>
              <TimePicker format="HH:mm" onChange={(time, timeString) => onChangeDateAndTime('time', time, timeString)} allowClear />
              {selectedTime && (<p>Selected Time: {selectedTime.format('HH:mm')}</p>)}
            </div>
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default TrainingData