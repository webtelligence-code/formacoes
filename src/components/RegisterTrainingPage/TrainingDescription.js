import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react'

const TrainingDescription = () => {
  const [description, setDescription] = useState('');
  const maxCharacters = 350;

  // Function to update the description state and character count
  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxCharacters) {
      setDescription(inputText);
    }
  }

  // Calculate remaining characters
  const remainingCharacters = maxCharacters - description.length;

  return (
    <Fragment>
      <h5 style={{ color: '#ed6337', marginBottom: 20, marginTop: 20 }}>Descrição</h5>

      <TextArea
        rows={4}
        placeholder='Máximo de caracteres é 350'
        maxLength={maxCharacters}
        onChange={handleChange}
        
      />

      {/* Display remaining character count */}
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
        <p style={{ fontWeight: 'lighter', color: 'gray', fontSize: 14 }}>Caracteres disponíveis: {remainingCharacters}</p>
      </div>
    </Fragment>
  )
}

export default TrainingDescription