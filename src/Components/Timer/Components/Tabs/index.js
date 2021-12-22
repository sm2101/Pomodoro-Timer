import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startCounter,
  pauseCounter,
  resetCounter,
  changeSession,
  editCounter,
} from "../../../../App/Actions/counterActions";
import { auth } from "../../../../Firebase";
import { toggleSetting } from "../../../../App/Actions/settingActions";
import { login } from "../../../../App/Actions/userActions";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./Components/Header";
import addNotification from "react-push-notification";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import TabList from "./Components/TabList";
import Count from "./Components/Count";
import Actions from "./Components/Actions";
import { useMediaQuery } from "@mui/material";
import MobileTabs from "../Mobile/Components/Tabs/MobileTabs";
import BlurBox from "../../../Shared/BlurBox";
import MobileActions from "../Mobile/Components/MobileActions";
const Tabs = ({ tab, changeTabs }) => {
  const [secondsLeft, setSecondsLeft] = useState(null),
    [timer, setTimer] = useState(null),
    [user, loading, error] = useAuthState(auth),
    [cuurentSession, setCurrentSession] = useState({
      short: 0,
      focus: 0,
      long: 0,
    });

  const { counterState, refreshState } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const mobile = useMediaQuery("(max-width:800px)");

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
    let isSubscribed = true;
    setSecondsLeft(
      cuurentSession[tab] === 0 ? counterState[tab] * 60 : cuurentSession[tab]
    );
    return () => {
      // eslint-disable-next-line no-unused-vars
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, counterState.focus, counterState.short, counterState.long]);
  useEffect(() => {
    resetCountDown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshState]);
  useEffect(() => {
    let isSubscribed = true;
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
    return () => {
      // eslint-disable-next-line no-unused-vars
      isSubscribed = false;
    };
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
    let isSubscribed = true;
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
    return () => {
      // eslint-disable-next-line no-unused-vars
      isSubscribed = false;
    };
  }, [user, loading, error, dispatch]);
  const handleKeyEvents = (e) => {
    if (e.code === "Space") {
      if (!counterState.isActive) {
        startCountDown();
      } else {
        pasueCountDown();
      }
    } else if (e.code === "KeyR") {
      if (!counterState.isActive) {
        addNotification({
          title: "Countdown",
          message: "Timer has been reset",
        });
        resetCountDown();
      }
    } else if (e.code === "Escape") {
      if (!counterState.isActive) {
        toggleSetting(dispatch);
      }
    } else if (e.code === "ArrowRight") {
      if (tab === "short") {
        handleChangeTabs("focus");
      } else if (tab === "focus") {
        handleChangeTabs("long");
      }
    } else if (e.code === "ArrowLeft") {
      if (tab === "focus") {
        handleChangeTabs("short");
      } else if (tab === "long") {
        handleChangeTabs("focus");
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvents);

    return () => {
      window.removeEventListener("keydown", handleKeyEvents);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterState.isActive, tab]);
  return (
    <>
      <Header tab={tab} secondsLeft={secondsLeft} counterState={counterState} />
      {!mobile ? (
        <>
          <TabList tab={tab} handleChangeTabs={handleChangeTabs} />
          <div className="counter">
            <Count secondsLeft={secondsLeft} />
            <Actions
              startCountDown={startCountDown}
              pasueCountDown={pasueCountDown}
              resetCountDown={resetCountDown}
            />
          </div>
        </>
      ) : (
        <div className="mobile-timer-wrapper">
          <BlurBox classNames="mobile-tabs-wrapper">
            <MobileTabs tab={tab} handleChangeTabs={handleChangeTabs} />
          </BlurBox>
          <Count secondsLeft={secondsLeft} />
          <MobileActions
            startCountDown={startCountDown}
            pasueCountDown={pasueCountDown}
            resetCountDown={resetCountDown}
          />
        </div>
      )}
    </>
  );
};

export default Tabs;
