import React, { useState } from "react";
import ElementMaker from "./ElementMaker";

function App() {
  const [items, setItems] = useState([
    { id: 1, value: "Item 1" },
    { id: 2, value: "Item 2" },
    { id: 3, value: "Item 3" },
  ]);

  // update by index
  // const handleSave = (index, newValue) => {
  //   setItems((prevState) => {
  //     const updatedData = [...prevState];
  //     updatedData[index-1].value = newValue;
  //     return updatedData;
  //   });
  // };

  // update by id
  const handleSave = (id, newValue) => {
    setItems((prevState) => {
      const updatedData = [...prevState];
      const index = updatedData.findIndex((item) => item.id === id);
      updatedData[index].value = newValue;
      return updatedData;
    });
  };

  return (
    <div>
      {items.map((item) => (
        <ElementMaker
          key={item.id}
          value={item.value}
          handleSave={(value) => handleSave(item.id, value)}
          handleDoubleClick={() => {
            item.showInputEle = true;
            setItems([...items]);
          }}
          setShowInputEle={(showInputEle) => {
            item.showInputEle = showInputEle;
            setItems([...items]);
          }}
          showInputEle={item.showInputEle}
        />
      ))}
    </div>
  );
}

export default App;
