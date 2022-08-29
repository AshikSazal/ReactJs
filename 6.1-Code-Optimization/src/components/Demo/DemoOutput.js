import React from "react";

import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};

// React.memo do stop rerendering the component but
// if props will change then it will rerenderring the component but
// React.memo works directly in props not directly in function means
// if I use function which will not change even then React.memo will not work and
// rerender the component. For the function we have a solution that we have to use
// useCallback function. 
export default React.memo(DemoOutput);
