import { faFilterCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'antd'
import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import Select from 'react-select'

const Filters = ({ setPage, buttonText, showFilters }) => {
  return (
    <Row className={`${showFilters ? 'text-center justify-content-center' : 'text-start'}`}>
      <Col>
        <Button
          onClick={() => setPage(showFilters ? 'Register' : 'List')}
          icon={<FontAwesomeIcon icon={showFilters ? faPlus : faAngleLeft} />}
          className='h-100'
          danger={!showFilters}
        >
          {buttonText}
        </Button>
      </Col>

      {showFilters && (
        <Fragment>
          <Col>
            <Select
              onChange={() => { }}
              placeholder={<label><FontAwesomeIcon icon={faFilterCircleXmark} className='me-2' />Portal</label>}
              name='portal'
              isClearable
              options={[]}
            />
          </Col>

          <Col>
            <Select
              onChange={() => { }}
              placeholder={<label><FontAwesomeIcon icon={faFilterCircleXmark} className='me-2' />Plataforma</label>}
              name='plataforma'
              isClearable
              options={[]}
            />
          </Col>

          <Col>
            <Select
              onChange={() => { }}
              placeholder={<label><FontAwesomeIcon icon={faFilterCircleXmark} className='me-2' />Realização</label>}
              name='realizada'
              isClearable
              options={[]}
            />
          </Col>

          <Col>
            <Button
              disabled
              className='h-100 w-100'
              icon={<FontAwesomeIcon icon={faFilterCircleXmark} />}
            >
              Limpar filtros
            </Button>
          </Col>
        </Fragment>
      )}
    </Row>
  )
}

export default Filters