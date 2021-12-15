import React from "react";
import "./button.css";
const Button = ({
  classNames,
  id,
  text,
  action,
  width,
  children,
  disabled,
}) => {
  return (
    <button
      id={id}
      className={`button ${classNames}`}
      onClick={action}
      style={{ width: `${width}%` }}
      disabled={disabled}
    >
      {children && children}
      {text && <span style={{ margin: "0 0.5rem" }}>{text}</span>}
    </button>
  );
};

export default Button;
