import React, { useState } from "react";
import ElementMaker from "./ElementMaker";

// Create an App component
function App() {
  // Set App's state
  const [fullName, setFullName] = useState("Joe Abraham");
  const [showInputEle, setShowInputEle] = useState(false);

  const handleSave = (value) => {
    setFullName(value);
    console.log("Sending value to backend: ", value);
  };

  const handleSingleClick = () => {
    setShowInputEle(true);
  };

  const handleBlur = (value) => {
    setShowInputEle(false);
    console.log("Sending value to backend: ", fullName);
  };

  return (
    <div>
      <h1>Double-click the Full Name's Value to Edit</h1>
      <div>
        <strong>Full Name: </strong>
        <ElementMaker
          value={fullName}
          handleSave={handleSave}
          handleSingleClick={handleSingleClick}
          handleBlur={handleBlur}
          showInputEle={showInputEle}
        />
      </div>
    </div>
  );
}

export default App;
