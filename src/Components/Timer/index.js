import React from "react";
import "./timer.css";
import TimerBox from "./TimerBox";
import { useSelector } from "react-redux";
import TodoBox from "../TodoBox";
const Timer = () => {
  const { counterState, userState } = useSelector((state) => ({ ...state }));
  return (
    <div
      className={`timer-container ${counterState.isActive && "active"}`}
      id="timer-container"
    >
      <TimerBox />
      {userState.isAuthenticated && <TodoBox />}
    </div>
  );
};

export default Timer;
