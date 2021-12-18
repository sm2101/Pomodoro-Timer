import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, toggleAudio } from "../../../App/Actions/bgActions";
import { Slider } from "@mui/material";
import { setAudioVol } from "../../../App/Actions/bgActions";
import Button from "../Button";
import "./bg-card.css";
const BgCard = () => {
  const { bgState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleBgChange = (bg, audio, name) => {
    console.log("change triggered");
    console.log(bg, audio, name);
    setCurrent(dispatch, bg, audio, name);
  };

  const handleChange = (e, newValue) => {
    setAudioVol(dispatch, newValue / 100);
  };

  const handleMute = () => {
    if (bgState.audioVolume !== 0) {
      setAudioVol(dispatch, 0);
    } else {
      setAudioVol(dispatch, 0.5);
    }
  };
  const handleTestAudio = () => {
    toggleAudio(dispatch);
    setTimeout(() => {
      toggleAudio(dispatch);
    }, 2000);
  };
  return (
    <>
      <div className="bg-card-wrapper">
        {bgState.allData.map((item, idx) => (
          <div
            className={`bg-card ${item.name === bgState.name && "active"}`}
            onClick={() => handleBgChange(item.bg, item.audio, item.name)}
            key={idx}
          >
            <div className="bg-img" style={{ background: `url(${item.bg})` }}>
              {item.audio && <i className="fas fa-volume-up"></i>}
            </div>
          </div>
        ))}
      </div>
      <div className="audio-wrapper">
        <div className="audio-icon" onClick={handleMute}>
          {bgState.audioVolume === 0 ? (
            <i className="fas fa-volume-mute"></i>
          ) : (
            <i className="fas fa-volume-up"></i>
          )}
        </div>
        <div className="audio-slider">
          <Slider
            max={100}
            min={0}
            value={bgState.audioVolume * 100}
            onChange={handleChange}
          />
        </div>
        <div className="audio-test">
          <Button
            text={!bgState.playAudio && "Test"}
            classNames="btn-small width-100"
            action={handleTestAudio}
          >
            {bgState.playAudio && <i className="fas fa-volume-up"></i>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default BgCard;
