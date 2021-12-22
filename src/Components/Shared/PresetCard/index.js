import React, { useState, useEffect } from "react";
import "./preset-card.css";
import StyledInput from "../StyledInput";
import { useDispatch, useSelector } from "react-redux";
import { setData, getUser } from "../../../Firebase/db";
import { refresh } from "../../../App/Actions/refreshActions";
import { login } from "../../../App/Actions/userActions";
import { Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const PresetCard = ({ preset, idx, loadPreset }) => {
  const [focus, setFocus] = useState(25),
    [short, setShort] = useState(5),
    [long, setLong] = useState(15),
    [longDuration, setLongDuration] = useState(4),
    [name, setName] = useState(preset?.name),
    [open, setOpen] = useState(false);

  const { refreshState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSetData = () => {
    const user = jwt.decode(Cookies.get("jwt"));

    setData({
      id: user.id,
      focus,
      short,
      long,
      longDuration,
      name,
      preset: `preset${idx}`,
    })
      .then(() => {
        getUser(user.id)
          .then((res) => {
            login(dispatch, { isAuthenticated: true, user: { ...res } });
            window.alert("Preset Saved");
            refresh(dispatch);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleLoadPreset = () => {
    loadPreset({ focus, short, long, longDuration });
  };
  useEffect(() => {
    setFocus(preset?.focus);
    setShort(preset?.short);
    setLong(preset?.long);
    setLongDuration(preset?.break);
    setName(preset?.name);
  }, [preset, refreshState]);
  return (
    <div id={`preset-card-${idx}`} className="preset-card-wrapper">
      <div className="preset-card-header">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="preset-name"
        />
        <div className="preset-buttons-group">
          <button
            className={`preset-button check ${
              focus !== preset?.focus ||
              short !== preset?.short ||
              long !== preset?.long ||
              longDuration !== preset?.break ||
              name !== preset?.name
                ? "show"
                : "hide"
            }`}
            onClick={handleSetData}
          >
            <i className="fas fa-check"></i>
          </button>
          <Tooltip title="Load preset" placement="top">
            <button className={`preset-button`} onClick={handleLoadPreset}>
              <i className="fas fa-upload"></i>
            </button>
          </Tooltip>
          <button
            className={`preset-button ${open && "open"}`}
            onClick={() => setOpen(!open)}
          >
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      </div>
      <div className={`preset-card ${open && "open"}`}>
        <div className="preset-card-input-group">
          <StyledInput
            id="focus"
            type="number"
            label="Focus Time"
            min="1"
            theme="light"
            size="sm"
            value={focus}
            name="focus"
            onChange={(e) => setFocus(parseInt(e.target.value))}
          />
          <StyledInput
            id="short"
            type="number"
            label="Short Break"
            min="1"
            theme="light"
            size="sm"
            value={short}
            name="short"
            onChange={(e) => setShort(parseInt(e.target.value))}
          />
          <StyledInput
            id="long"
            type="number"
            label="Long Break"
            min="1"
            theme="light"
            size="sm"
            value={long}
            name="long"
            onChange={(e) => setLong(parseInt(e.target.value))}
          />
          <StyledInput
            id="break"
            type="number"
            label="Interval"
            min="1"
            theme="light"
            size="sm"
            value={longDuration}
            name="longDuration"
            onChange={(e) => setLongDuration(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PresetCard;
