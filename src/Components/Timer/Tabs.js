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
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../Shared/Button";
import UserCard from "../Shared/UserCard";
const Tabs = ({ tab, changeTabs }) => {
  const [secondsLeft, setSecondsLeft] = useState(null),
    [timer, setTimer] = useState(null),
    [user, loading, error] = useAuthState(auth),
    [authUser, setAuthUser] = useState({
      isAuthenticated: false,
      user: null,
    }),
    [cuurentSession, setCurrentSession] = useState({
      short: 0,
      focus: 0,
      long: 0,
    });

  const { counterState, refreshState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        window.localStorage.setItem("user", JSON.stringify(res));
        window.localStorage.setItem(
          "session",
          JSON.stringify({
            focus: res.preset1.focus,
            short: res.preset1.short,
            long: res.preset1.long,
            break: res.preset1.break,
          })
        );
        setAuthUser({
          isAuthenticated: true,
          user: res,
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
      changeTabs("short");
    } else {
      changeTabs("long");
      editCounter(dispatch, {
        totalSessions: counterState.totalSessions + 1,
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startFocus = () => {
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
    console.log(user);
    if (error) {
      console.error(error);
    }
    if (user) {
      setAuthUser({
        isAuthenticated: true,
        user: JSON.parse(window.localStorage.getItem("user")),
      });
    }
  }, [user, loading, error]);
  return (
    <>
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
        {!authUser.isAuthenticated ? (
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
              <UserCard user={authUser.user} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Tabs;
