import React from "react";
import "./timer.css";
import "./mobile-timer.css";
import TimerBox from "./Components/TimerBox";
import { useSelector } from "react-redux";
import TodoBox from "../TodoBox";
import { useMediaQuery } from "@mui/material";
const Timer = () => {
  const { counterState, userState } = useSelector((state) => ({ ...state }));
  const mobile = useMediaQuery("(max-width:800px)");
  return (
    <div
      className={`timer-container ${counterState.isActive && "active"}`}
      id="timer-container"
    >
      <TimerBox />
      {!mobile && <>{userState.isAuthenticated && <TodoBox />}</>}
    </div>
  );
};

export default Timer;
