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
        className={`styled-input ${theme} ${size}`}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default StyledInput;
