import "./App.css";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAll } from "./App/Actions/bgActions";
import Timer from "./Components/Timer";
import SettingDialog from "./Components/Dialogs/Settings";
import { getBackgrounds } from "./Firebase/db";
import { Notifications } from "react-push-notification";
const App = () => {
  const audioRef = useRef();
  const { counterState, bgState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    audioRef.current.volume = bgState.audioVolume;
    if (window.HTMLAudioElement) {
      if (counterState.isActive) {
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
    getBackgrounds().then((res) => {
      setAll(dispatch, res.data);
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
        <audio src={bgState.audio ? bgState.audio : ""} loop ref={audioRef} />
      </div>
    </>
  );
};

export default App;
