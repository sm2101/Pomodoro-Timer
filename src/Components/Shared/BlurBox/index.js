import React from "react";
import "./blur-box.css";
const BlurBox = ({ id, classNames, children, elemRef }) => {
  return (
    <div
      className={`blur-box ${classNames}`}
      id={id}
      ref={elemRef ? elemRef : null}
    >
      {children}
    </div>
  );
};

export default BlurBox;
