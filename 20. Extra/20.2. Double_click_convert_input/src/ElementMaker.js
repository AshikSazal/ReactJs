import React, { useState } from "react";

function ElementMaker(props) {
  const [editedValue, setEditedValue] = useState(props.value);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    props.handleSave(editedValue);
    setEditedValue(editedValue);
    props.setShowInputEle(false);
  };

  const handleBlur = () => {
    handleSubmit();
  };

  return (
    <span>
      {props.showInputEle ? (
        <input
          type="text"
          value={editedValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => props.setShowInputEle(true)}
          style={{ display: "inline-block", height: "25px", minWidth: "300px" }}
        >
          {props.value}
        </span>
      )}
    </span>
  );
}

export default ElementMaker;
