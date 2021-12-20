import "./App.css";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAll } from "./App/Actions/bgActions";
import Timer from "./Components/Timer";
import SettingDialog from "./Components/Dialogs/Settings";
import { getBackgrounds } from "./Firebase/db";
import { Notifications } from "react-push-notification";
import Notepad from "./Components/Notepad";
const App = () => {
  const audioRef = useRef();
  const { counterState, bgState, userState } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
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
        className="App"
        style={{
          // backgroundColor: "#000",
          background: `#000 url(${bgState.bg}) no-repeat center`,
        }}
      >
        <Notifications position="bottom-right" />
        <Timer />
        <SettingDialog />
        {userState.isAuthenticated && <Notepad />}
        <audio src={bgState.audio ? bgState.audio : ""} loop ref={audioRef} />
      </div>
    </>
  );
};

export default App;
