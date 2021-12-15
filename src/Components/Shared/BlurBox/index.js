import React from "react";
import "./blur-box.css";
const BlurBox = ({ id, classNames, children }) => {
  return (
    <div className={`blur-box ${classNames}`} id={id}>
      {children}
    </div>
  );
};

export default BlurBox;
