import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch } from 'antd'
import React from 'react'
import { Fragment } from 'react'
import Select from 'react-select'

const TrainingCollaborators = ({ switchCollaboratorsChecked, setSwitchCollaboratorsChecked, users }) => {
  return (
    <Fragment>
      <h5 style={{ color: '#ed6337', marginBottom: 20 }}>Colaboradores</h5>

      <div style={{ marginBottom: 10 }}>
        <label style={{ fontWeight: '700' }}>Todos os Colaboradores</label>
        <Switch style={{ backgroundColor: switchCollaboratorsChecked ? 'green' : 'red' }} checkedChildren="Sim" unCheckedChildren="Não" className='ms-2' onChange={(checked) => setSwitchCollaboratorsChecked(checked)} />
      </div>

      {/* If switch state is true then we hide options select */}
      {!switchCollaboratorsChecked && (
        <Select
          onChange={() => { }}
          placeholder={<label>Selecione os Colaboradores<FontAwesomeIcon icon={faPeopleGroup} className='ms-2' /></label>}
          name='location'
          isClearable
          isMulti
          options={users}
        />
      )}

    </Fragment>
  )
}

export default TrainingCollaborators;