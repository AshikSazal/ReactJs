import React, { useState } from "react";
import ElementMaker from "./ElementMaker";

function App() {
  const [fullName, setFullName] = useState("Joe Abraham");
  const [showInputEle, setShowInputEle] = useState(false);

  const handleSaveFullName = (value) => {
    console.log(value);
    setFullName(value);
  };

  return (
    <div>
      <h1>Double-click the Full Name's Value to Edit</h1>
      <div>
        <strong>Full Name: </strong>
        <ElementMaker
          value={fullName}
          handleSave={handleSaveFullName}
          setShowInputEle={setShowInputEle}
          showInputEle={showInputEle}
        />
      </div>
    </div>
  );
}

export default App;
