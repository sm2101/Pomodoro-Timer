import React from "react";

const TabList = ({ tab, handleChangeTabs }) => {
  return (
    <ul className="tab-list">
      <li
        className={`tab-list-item ${tab === "short" && "active right"}`}
        onClick={() => handleChangeTabs("short")}
      >
        Small Break
      </li>
      <li
        className={`tab-list-item ${tab === "focus" && "active left right"}`}
        onClick={() => handleChangeTabs("focus")}
      >
        Focus
      </li>
      <li
        className={`tab-list-item ${tab === "long" && "active left"}`}
        onClick={() => handleChangeTabs("long")}
      >
        Long Break
      </li>
    </ul>
  );
};

export default TabList;
