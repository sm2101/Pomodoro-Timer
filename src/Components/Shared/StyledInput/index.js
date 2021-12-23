import React from "react";
import { useDispatch } from "react-redux";
import { toggleFocus } from "../../../App/Actions/focusActions";
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
  const dispatch = useDispatch();
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
        onKeyDown={onKeyDown || null}
        onFocus={() => toggleFocus(dispatch)}
        onBlur={() => toggleFocus(dispatch)}
      />
    </div>
  );
};

export default StyledInput;
