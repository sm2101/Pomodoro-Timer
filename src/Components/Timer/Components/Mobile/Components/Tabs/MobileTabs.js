import React from "react";

const MobileTabs = ({ tab, handleChangeTabs }) => {
  return (
    <ul className="mobile-tab-list">
      <li
        className={`mobile-tab-list-item ${tab === "short" && "active"}`}
        onClick={() => handleChangeTabs("short")}
      >
        Small Break
      </li>
      <li
        className={`mobile-tab-list-item ${tab === "focus" && "active"}`}
        onClick={() => handleChangeTabs("focus")}
      >
        Focus
      </li>
      <li
        className={`mobile-tab-list-item ${tab === "long" && "active"}`}
        onClick={() => handleChangeTabs("long")}
      >
        Long Break
      </li>
    </ul>
  );
};

export default MobileTabs;
