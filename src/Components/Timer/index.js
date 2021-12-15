import React from "react";
import "./timer.css";
import TimerBox from "./TimerBox";
import { useSelector } from "react-redux";
const Timer = () => {
  const { counterState } = useSelector((state) => ({ ...state }));
  return (
    <div
      className={`timer-container ${counterState.isActive && "active"}`}
      id="timer-container"
    >
      <TimerBox />
    </div>
  );
};

export default Timer;
