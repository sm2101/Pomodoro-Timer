import React from "react";
import { Helmet } from "react-helmet";
const Header = ({ secondsLeft, tab, counterState }) => {
  return (
    <Helmet>
      <title>
        {counterState.isActive
          ? `${Math.floor(secondsLeft / 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}:${(
              secondsLeft -
              Math.floor(secondsLeft / 60) * 60
            ).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })} - ${
              tab === "short"
                ? "Short Break"
                : tab === "long"
                ? "Long Break"
                : "Focus"
            }`
          : "Pomodoro Timer"}
      </title>
    </Helmet>
  );
};

export default Header;
