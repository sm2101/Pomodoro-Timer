import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent } from "../../../App/Actions/bgActions";
import "./bg-card.css";
const BgCard = () => {
  const { bgState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleBgChange = (bg, audio, name) => {
    console.log("change triggered");
    console.log(bg, audio, name);
    setCurrent(dispatch, bg, audio, name);
  };
  return (
    <div className="bg-card-wrapper">
      {bgState.allData.map((item, idx) => (
        <div
          className={`bg-card ${item.name === bgState.name && "active"}`}
          onClick={() => handleBgChange(item.bg, item.audio, item.name)}
        >
          <div
            className="bg-img"
            style={{ background: `url(${item.bg})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default BgCard;
