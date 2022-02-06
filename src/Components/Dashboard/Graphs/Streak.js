import React, { useState, useEffect } from "react";
import { Select, MenuItem, Tooltip } from "@mui/material";
import BlurBox from "../../Shared/BlurBox";
const Streak = ({
  trackRecord,
  length,
  setLength,
  analyticData,
  dateSummary,
}) => {
  const [dateList, setDateList] = useState([]),
    [metric, setMetric] = useState("focus");

  useEffect(() => {
    const dates = [...Array(length)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toDateString();
    });
    console.log(dates);
    setDateList(dates.reverse());
  }, [length]);
  return (
    <div className="streak-wrapper">
      <BlurBox classNames="streaks">
        <div className="streak-selected">
          <div>
            <span>Last</span>
            <Select
              labelId="time-frame-select"
              id="time-frame-select"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              variant="standard"
            >
              {[7, 10, 30, 90, 210, 365].map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <span>Days</span>
          </div>
          <div>
            <Select
              labelId="metric-select"
              id="metric-select"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              variant="standard"
            >
              {["Focus", "Break"].map((item) => (
                <MenuItem value={item.toLowerCase()} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <span>Time</span>
          </div>
        </div>
        <div className={`streak-boxes ${length <= 90 && "small"}`}>
          {dateList.length &&
            dateList.map((date, idx) => (
              <div className="streak-box-wrapper" key={idx}>
                <Tooltip
                  title={
                    <>
                      <div className="tooltip-wrapper" key={idx}>
                        <div className="tooltip-date">
                          {new Date(date).toDateString()}
                        </div>
                        <div className="tooltip-focus">
                          <span className="tooltip-focus-box">Focus:</span>
                          <span className="tooltip-time">
                            {analyticData[date]?.focus
                              ? `${Math.floor(
                                  analyticData[date]?.focus / 60
                                ).toLocaleString("en-US", {
                                  minimumIntegerDigits: 2,
                                })}:${(
                                  analyticData[date]?.focus -
                                  Math.floor(analyticData[date]?.focus / 60) *
                                    60
                                ).toLocaleString("en-US", {
                                  minimumIntegerDigits: 2,
                                })}`
                              : "00:00"}
                          </span>
                        </div>
                        <div className="tooltip-break">
                          <span className="tooltip-break-box">Break:</span>
                          <span className="tooltip-time">
                            {analyticData[date]?.short ||
                            analyticData[date]?.long
                              ? `${Math.floor(
                                  (analyticData[date]?.short +
                                    analyticData[date]?.long) /
                                    60
                                ).toLocaleString("en-US", {
                                  minimumIntegerDigits: 2,
                                })}:${(
                                  analyticData[date]?.short +
                                  analyticData[date]?.long -
                                  Math.floor(
                                    (analyticData[date]?.short +
                                      analyticData[date]?.long) /
                                      60
                                  ) *
                                    60
                                ).toLocaleString("en-US", {
                                  minimumIntegerDigits: 2,
                                })}`
                              : "00:00"}
                          </span>
                        </div>
                      </div>
                    </>
                  }
                  placement="top"
                  arrow={true}
                >
                  <div
                    className={`streak-box ${length > 90 && "small"} ${
                      trackRecord[date] &&
                      `active-${metric}-${
                        metric === "focus"
                          ? analyticData.focus > 3 * 60 * 60
                            ? "1"
                            : analyticData.focus > 1 * 60 * 60
                            ? "2"
                            : "3"
                          : analyticData.short + analyticData.long > 3 * 60 * 60
                          ? "1"
                          : analyticData.short + analyticData.long > 1 * 60 * 60
                          ? "2"
                          : "3"
                      }`
                    }`}
                  />
                </Tooltip>
              </div>
            ))}
        </div>
        <div className="streak-info-container">
          <Tooltip
            placement="bottom-start"
            arrow={true}
            title={
              <>
                <div className="tooltip-wrapper">
                  <div className="tooltip-data">
                    Current Streak:{" "}
                    <strong>
                      {dateSummary?.currentStreak}{" "}
                      {dateSummary?.currentStreak > 1 ? "days" : "day"}
                    </strong>
                  </div>
                  <div className="tooltip-data">
                    Total Streaks:{" "}
                    <strong>{dateSummary?.streaks?.length} </strong>
                  </div>
                  <div className="tooltip-data">
                    Worked Today:{" "}
                    <strong>
                      {dateSummary?.todayInStreak ? "Yes" : "Not yet"}
                    </strong>
                  </div>
                </div>
              </>
            }
          >
            <i className="fas fa-info-circle"></i>
          </Tooltip>
          <span>
            Longest Streak {dateSummary?.longestStreak}{" "}
            {dateSummary?.longestStreak > 1 ? "days" : "day"}
          </span>
        </div>
      </BlurBox>
    </div>
  );
};

export default Streak;
