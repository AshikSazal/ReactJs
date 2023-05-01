import React, { useState } from 'react';

function ElementMaker(props) {
  const [editedValue, setEditedValue] = useState(props.value);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleSave = () => {
    props.handleSave(editedValue);
    props.handleBlur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      handleSave();
    }
  };

  return (
    <span>
      {props.showInputEle ? (
        <input
          type="text"
          value={editedValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          onClick={props.handleSingleClick}
          style={{ display: 'inline-block', height: '25px', minWidth: '300px' }}
        >
          {props.value}
        </span>
      )}
    </span>
  );
}

export default ElementMaker;
