import React from "react";
import { Dialog } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleSetting } from "../../../App/Actions/settingActions";
import { editCounter } from "../../../App/Actions/counterActions";
import { refresh } from "../../../App/Actions/refreshActions";
import BlurBox from "../../Shared/BlurBox";
import PresetCard from "../../Shared/PresetCard";
import StyledInput from "../../Shared/StyledInput";
import { Switch } from "@mui/material";
import Button from "../../Shared/Button";
import { signInWithGoogle } from "../../../Firebase/auth";
import { login } from "../../../App/Actions/userActions";
import BgCard from "../../Shared/BgCard";
import { getTodoTasks } from "../../../Firebase/db";
import { setTasks } from "../../../App/Actions/todoActions";
import "./settings.css";
import addNotification from "react-push-notification";
const SettingDialog = () => {
  const { settingState, counterState, userState } = useSelector((state) => ({
    ...state,
  }));
  const { focus, short, long, auto, strict, maxSession, notification } =
    counterState;
  const dispatch = useDispatch();
  const handleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        login(dispatch, {
          isAuthenticated: true,
          user: res,
        });
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
  const handleClose = () => {
    if (settingState) {
      toggleSetting(dispatch);
      window.localStorage.setItem(
        "session",
        JSON.stringify({
          focus,
          short,
          long,
          break: counterState.longDuration,
          auto,
          maxSession,
        })
      );
    }
  };
  const handleChange = (e) => {
    editCounter(dispatch, { [e.target.name]: parseInt(e.target.value) });
  };
  const handleToggleAuto = () => {
    editCounter(dispatch, {
      auto: !auto,
    });
  };
  const handleTgogleStrict = () => {
    editCounter(dispatch, {
      strict: !strict,
    });
  };
  const handleLoadPreset = ({ focus, short, long, longDuration }) => {
    editCounter(dispatch, {
      focus,
      long,
      short,
      longDuration,
    });
    refresh(dispatch);
  };
  const handleNotification = () => {
    if (!notification && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          addNotification({
            title: "Notification Permission Denied",
            message:
              "Please Enable Notifications in your Browser to use this feature",
          });
        } else {
          editCounter(dispatch, {
            notification: true,
          });
        }
      });
    } else {
      editCounter(dispatch, {
        notification: !notification,
      });
    }
  };
  return (
    <Dialog open={settingState} onClose={handleClose}>
      <BlurBox id="setting-dialog" classNames="setting-box">
        <div id="setting-title">Settings</div>
        <div className="timer-input-group">
          <div className="timer-input">
            <StyledInput
              id="focus"
              type="number"
              label="Focus Time"
              min="1"
              theme="dark"
              size="lg"
              value={focus}
              name="focus"
              onChange={handleChange}
            />
          </div>
          <div className="timer-input">
            <StyledInput
              id="short"
              type="number"
              min="1"
              theme="dark"
              size="lg"
              label="Short Break"
              className="blur-box"
              value={short}
              name="short"
              onChange={handleChange}
            />
          </div>
          <div className="timer-input">
            <StyledInput
              id="long"
              type="number"
              min="1"
              theme="dark"
              size="lg"
              label="Long Break"
              className="blur-box"
              value={long}
              name="long"
              onChange={handleChange}
            />
          </div>
          <div className="timer-input">
            <StyledInput
              id="break"
              type="number"
              min="1"
              theme="dark"
              size="lg"
              label="Interval"
              className="blur-box"
              value={counterState.longDuration}
              name="longDuration"
              onChange={handleChange}
            />
          </div>
          <div className="timer-input" style={{ width: strict ? "25%" : 0 }}>
            <StyledInput
              id="session"
              type="number"
              min="1"
              theme="dark"
              size="lg"
              label="Sessions"
              className="blur-box"
              value={maxSession}
              name="maxSession"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="misc-settings">
          <div className="misc-wrapper">
            <div className="misc">
              <span className="misc-title">
                Start the next session automatically?
              </span>
              <Switch
                checked={auto || strict}
                onChange={handleToggleAuto}
                disabled={strict}
              />
            </div>
          </div>
          <div className="misc-wrapper">
            <div className="misc">
              <span className="misc-title">Flow Mode</span>
              <Switch checked={strict} onChange={handleTgogleStrict} />
            </div>
          </div>
          <div className="misc-wrapper">
            <div className="misc">
              <span className="misc-title">Push Notifications</span>
              <Switch checked={notification} onChange={handleNotification} />
            </div>
          </div>
        </div>
        <div id="setting-sub-title">Presets</div>
        {userState.isAuthenticated ? (
          <div className="preset-container">
            <PresetCard
              preset={userState.user?.preset1}
              idx={"1"}
              loadPreset={handleLoadPreset}
            />
            <PresetCard
              preset={userState.user?.preset2}
              idx={"2"}
              loadPreset={handleLoadPreset}
            />
            <PresetCard
              preset={userState.user?.preset3}
              idx={"3"}
              loadPreset={handleLoadPreset}
            />
            <PresetCard
              preset={userState.user?.preset4}
              idx={"4"}
              loadPreset={handleLoadPreset}
            />
          </div>
        ) : (
          <div className="preset-login-wrapper">
            <div className="preset-login-box">
              <div>Please login to create and save your presets.</div>
              <Button
                id="auth-btn-setting"
                text="Login"
                action={handleLogin}
                width="50"
              >
                <i className="fab fa-google"></i>
              </Button>
            </div>
          </div>
        )}
        <div id="customization-sub-title">Customization</div>
        <BgCard />
      </BlurBox>
    </Dialog>
  );
};

export default SettingDialog;
