import React from "react";

const Count = ({ secondsLeft }) => {
  return (
    <p
      className="count"
      name={secondsLeft > 60 ? "mins" : secondsLeft === 60 ? "min" : "sec"}
    >
      <span className="minutes">
        {Math.floor(secondsLeft / 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        })}
      </span>
      <span>:</span>
      <span className="seconds">
        {(secondsLeft - Math.floor(secondsLeft / 60) * 60).toLocaleString(
          "en-US",
          {
            minimumIntegerDigits: 2,
          }
        )}
      </span>
    </p>
  );
};

export default Count;
