/* eslint-disable jsx-a11y/anchor-is-valid */
import { faCar, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, DatePicker, TimePicker, Input } from 'antd';
import chalk from 'chalk';
import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Tooltip } from 'react-tooltip'

const TrainingData = ({
  API_URL,
  title,
  setTitle,
  brandsList,
  brand,
  setBrand,
  location,
  setLocation,
  citiesList,
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
      // For date picker
      case 'date':
        setSelectedDate(value);
        break;
      // For time picker
      case 'time':
        setSelectedTime(value);
        break;
      // If type is undefined then log error
      default:
        console.log(chalk.red('No matching type parameter.'));
        break;
    }
  }

  return (
    <Fragment>
      {/* Form label */}
      <h5 style={{ color: '#ed6337', marginBottom: 20 }}>Dados da formação</h5>

      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
        <label style={{ fontWeight: '700' }}>Título *</label>
        <Input
          placeholder='Introduza um título'
          allowClear
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Brand */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
        <label style={{ fontWeight: '700' }}>Marca</label>

        {/* Wrapped Tooltip */}
        <a data-tooltip-id='brand-tooltip' data-tooltip-content='O título deve ter pelo menos 5 caracteres'>
          <Select
            className='brand-tooltip'
            isDisabled={title.length < 5}
            onChange={(option) => setBrand(option.value)}
            placeholder={<label>Selecione a marca<FontAwesomeIcon icon={faCar} className='ms-2' /></label>}
            name='brand'
            isClearable
            options={brandsList}
            value={brand ? brand : null}
          />
        </a>
      </div>

      {/* Location */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
        <label style={{ fontWeight: '700' }}>Localização *</label>

        {/* Wrapped location */}
        <a data-tooltip-id='location-tooltip' data-tooltip-content='O título deve ter pelo menos 5 caracteres'>
          <Select
            onChange={(option) => setLocation(option.value)}
            placeholder={<label>Selecione a localização<FontAwesomeIcon icon={faMapLocationDot} className='ms-2' /></label>}
            name='location'
            isClearable
            options={citiesList}
            isDisabled={title.length < 5}
          />
        </a>
      </div>

      {/* Has date limit switch state (true/false) */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontWeight: '700' }}>Sem limite de data</label>
        <a data-tooltip-id='switch-date-tooltip' data-tooltip-content='O título deve ter pelo menos 5 caracteres'>
          <Switch
            style={{ backgroundColor: switchDateCheked ? 'green' : 'red' }}
            checkedChildren="Sim"
            unCheckedChildren="Não"
            className='ms-2'
            onChange={(checked) => setSwitchDateChecked(checked)}
            disabled={title.length < 5}
          />
        </a>
      </div>

      {/* If has date limit is checked then remove Date and time picker */}
      {!switchDateCheked && (
        <Row>
          <Col>
            <div
              data-tooltip-id='date-tooltip'
              data-tooltip-content='Deve selecionar uma localização'
              style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}
            >
              <label style={{ fontWeight: '700' }}>Selecione a data limite *</label>
              <DatePicker
                disabled={!location}
                showTime
                format="DD/MM/YYYY"
                onChange={(date, dateString) => onChangeDateAndTime('date', date, dateString)}
                allowClear
              />
              {selectedDate && (<p>Selected Date: {selectedDate.format('DD/MM/YYYY')}</p>)}
            </div>
          </Col>

          <Col>
            <div
              data-tooltip-id='time-tooltip'
              data-tooltip-content='Deve selecionar uma data limite'
              style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}
            >
              <label style={{ fontWeight: '700' }}>Selecione o horário limite *</label>
              <TimePicker
                disabled={!selectedDate}
                format="HH:mm"
                onChange={(time, timeString) => onChangeDateAndTime('time', time, timeString)}
                allowClear
              />
              {selectedTime && (<p>Selected Time: {selectedTime.format('HH:mm')}</p>)}
            </div>
          </Col>
        </Row>
      )}

      {/* Tooltips */}
      {title.length < 5 && (
        <Fragment>
          <Tooltip id='brand-tooltip' />
          <Tooltip id='location-tooltip' />
          <Tooltip id='switch-date-tooltip' />
        </Fragment>
      )}
      {!location && (
        <Tooltip id='date-tooltip' />
      )}
      {!selectedDate && (
        <Tooltip id='time-tooltip' />
      )}
    </Fragment>
  )
}

export default TrainingData