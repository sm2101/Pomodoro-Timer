import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startCounter,
  pauseCounter,
  resetCounter,
  changeSession,
  editCounter,
} from "../../App/Actions/counterActions";
import { auth } from "../../Firebase";
import { toggleSetting } from "../../App/Actions/settingActions";
import { refresh } from "../../App/Actions/refreshActions";
import { signInWithGoogle } from "../../Firebase/auth";
import { login } from "../../App/Actions/userActions";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../Shared/Button";
import UserCard from "../Shared/UserCard";
import { Helmet } from "react-helmet";
import addNotification from "react-push-notification";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { getTodoTasks } from "../../Firebase/db";
import { setTasks } from "../../App/Actions/todoActions";
import { toggleDrawer } from "../../App/Actions/notepadActions";
const Tabs = ({ tab, changeTabs }) => {
  const [secondsLeft, setSecondsLeft] = useState(null),
    [timer, setTimer] = useState(null),
    [user, loading, error] = useAuthState(auth),
    [cuurentSession, setCurrentSession] = useState({
      short: 0,
      focus: 0,
      long: 0,
    });

  const { counterState, refreshState, userState, notepadState } = useSelector(
    (state) => ({
      ...state,
    })
  );
  const dispatch = useDispatch();
  const handleToggleNotepad = () => {
    toggleDrawer(dispatch);
  };
  const handleNotifiactiosn = (title, subtitle, message) => {
    if (counterState.notification) {
      addNotification({
        title,
        subtitle,
        message,
        native: true,
      });
    }
    addNotification({
      title,
      subtitle,
      message,
      native: false,
    });
  };
  const handleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        login(dispatch, { isAuthenticated: true, user: res });
        getTodoTasks(res.id).then((data) => {
          if (data?.activeTasks.length !== 0) {
            setTasks(dispatch, data?.activeTasks);
          }
        });
        refresh(dispatch);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleChangeTabs = (newTab) => {
    if (!counterState.isActive) {
      changeTabs(newTab);
    }
  };
  const startCountDown = () => {
    if (
      counterState.strict &&
      !document.fullscreenElement &&
      document.fullscreenEnabled
    ) {
      document.body.requestFullscreen();
    }
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0 && counterState.auto) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
    startCounter(dispatch);
  };
  const pasueCountDown = () => {
    if (counterState.strict && document.fullscreenElement) {
      document.exitFullscreen();
    }
    setCurrentSession({ ...cuurentSession, [tab]: secondsLeft });
    clearInterval(timer);
    pauseCounter(dispatch);
  };
  const resetCountDown = () => {
    resetCounter(dispatch);
    setSecondsLeft(counterState[tab] * 60);
    setCurrentSession({
      focus: counterState.focus * 60,
      short: counterState.short * 60,
      long: counterState.long * 60,
    });
    changeTabs("focus");
    clearInterval(timer);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startBreak = () => {
    if (counterState.session < counterState.longDuration) {
      handleNotifiactiosn(
        "Time For a Break",
        "Pomodoro Timer",
        "Time to take a short breather"
      );
      changeTabs("short");
    } else {
      handleNotifiactiosn(
        "Time For a Break",
        "Pomodoro Timer",
        "Time for a long break"
      );
      changeTabs("long");
      editCounter(dispatch, {
        totalSessions: counterState.totalSessions + 1,
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startFocus = () => {
    handleNotifiactiosn(
      "Time to focus again",
      "Pomodoro Timer",
      "Let's get back to work!!"
    );
    changeTabs("focus");
  };

  useEffect(() => {
    setSecondsLeft(
      cuurentSession[tab] === 0 ? counterState[tab] * 60 : cuurentSession[tab]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, counterState.focus, counterState.short, counterState.long]);
  useEffect(() => {
    resetCountDown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshState]);
  useEffect(() => {
    if (secondsLeft === 0) {
      setSecondsLeft(null);
      if (!counterState.auto && !counterState.strict) {
        clearInterval(timer);
        pauseCounter(dispatch);
      } else if (
        counterState.strict &&
        counterState.totalSessions === counterState.maxSession
      ) {
        if (document && document.fullscreenElement) {
          document.exitFullscreen();
        }
        clearInterval(timer);
        pauseCounter(dispatch);
      }
      if (tab === "focus") {
        changeSession(dispatch);
        startBreak();
      } else {
        startFocus();
      }
      setCurrentSession({ ...cuurentSession, [tab]: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cuurentSession,
    dispatch,
    secondsLeft,
    startBreak,
    startFocus,
    tab,
    timer,
  ]);
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);
  useEffect(() => {
    if (loading) {
      console.log("loading");
    }
    if (error) {
      console.error(error);
    }
    if (user) {
      login(dispatch, {
        isAuthenticated: true,
        user: jwt.decode(Cookies.get("jwt")),
      });
    }
  }, [user, loading, error, dispatch]);
  return (
    <>
      <Helmet>
        <title>
          {counterState.isActive
            ? `${Math.floor(secondsLeft / 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}:${(
                secondsLeft -
                Math.floor(secondsLeft / 60) * 60
              ).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })} - ${
                tab === "short"
                  ? "Short Break"
                  : tab === "long"
                  ? "Long Break"
                  : "Focus"
              }`
            : "Pomodoro Timer"}
        </title>
      </Helmet>
      <ul className="tab-list">
        <li
          className={`tab-list-item ${tab === "short" && "active"}`}
          onClick={() => handleChangeTabs("short")}
        >
          Small Break
        </li>
        <li
          className={`tab-list-item ${tab === "focus" && "active"}`}
          onClick={() => handleChangeTabs("focus")}
        >
          Focus
        </li>
        <li
          className={`tab-list-item ${tab === "long" && "active"}`}
          onClick={() => handleChangeTabs("long")}
        >
          Long Break
        </li>
      </ul>
      <div className="counter">
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
        <div className="button-container">
          <Button
            id="start-btn"
            classNames=""
            width="15"
            action={resetCountDown}
            disabled={counterState.isActive}
          >
            <i className="fas fa-history"></i>
          </Button>
          <Button
            id="start-btn"
            classNames={!counterState.isActive ? "bg-green" : "bg-red"}
            text={!counterState.isActive ? "Start" : "Pause"}
            action={!counterState.isActive ? startCountDown : pasueCountDown}
            width="80"
          />
        </div>
        {!userState.isAuthenticated ? (
          <div className="login-cont">
            <Button
              id="auth-btn"
              text="Login"
              action={handleLogin}
              width="80"
              disabled={counterState.isActive}
            >
              <i className="fab fa-google"></i>
            </Button>
            <Button
              id="setting-btn-1"
              width="15"
              action={() => toggleSetting(dispatch)}
              disabled={counterState.isActive}
            >
              <i className="fas fa-cog"></i>
            </Button>
          </div>
        ) : (
          <>
            <div className="user-cont">
              <UserCard user={userState.user} />
            </div>
            <Button
              action={handleToggleNotepad}
              classNames={`notes-btn rounded ${!notepadState && "transparent"}`}
            >
              <i className="fas fa-file-alt"></i>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Tabs;
