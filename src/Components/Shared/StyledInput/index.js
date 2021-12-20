import React from "react";
import "./styledinput.css";
const StyledInput = ({
  id,
  type,
  min,
  value,
  name,
  onChange,
  label,
  theme,
  size,
  classNames,
  onKeyDown,
}) => {
  return (
    <div className="styled-input-wrapper">
      <label htmlFor={id} className={`styled-label ${theme} ${size}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        min={min}
        className={`styled-input ${theme} ${size} ${classNames}`}
        value={value}
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default StyledInput;
