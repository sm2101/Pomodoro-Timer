import "./TimerApp.css";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAll } from "./App/Actions/bgActions";
import Timer from "./Components/Timer";
import SettingDialog from "./Components/Dialogs/Settings";
import SettingDrawer from "./Components/Timer/Components/Mobile/Components/Settings";
import { getBackgrounds } from "./Firebase/db";
import Notepad from "./Components/Notepad";
import MobileNotepad from "./Components/Timer/Components/Mobile/Components/Notepad";
import { useMediaQuery } from "@mui/material";
const TimerApp = () => {
  const audioRef = useRef();
  const { counterState, bgState, userState } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const mobile = useMediaQuery("(max-width:800px)");
  useEffect(() => {
    audioRef.current.volume = bgState.audioVolume;
    if (window.HTMLAudioElement) {
      if (counterState.isActive || bgState.playAudio) {
        if (audioRef.current.paused) {
          audioRef.current.play();
        }
      } else {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        }
      }
    }
  }, [
    bgState.audioVolume,
    bgState.playAudio,
    counterState.audioVolume,
    counterState.isActive,
  ]);
  useEffect(() => {
    getBackgrounds()
      .then((res) => {
        setAll(dispatch, res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);
  return (
    <>
      <div
        className="TimerApp"
        style={{
          // backgroundColor: "#000",
          background: `#000 url(${bgState.bg}) no-repeat center`,
        }}
      >
        <Timer />
        {!mobile ? (
          <>
            <SettingDialog />
            {userState.isAuthenticated && <Notepad />}
          </>
        ) : (
          <>
            <SettingDrawer />
            {userState.isAuthenticated && <MobileNotepad />}
          </>
        )}
        <audio src={bgState.audio ? bgState.audio : ""} loop ref={audioRef} />
      </div>
    </>
  );
};

export default TimerApp;
