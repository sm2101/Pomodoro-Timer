import React, { useState } from "react";
import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../Shared/Button";
import {
  signInWithGoogle,
  signOutFromGoogle,
} from "../../../../../Firebase/auth";
import { login, logout } from "../../../../../App/Actions/userActions";
import { getTodoTasks } from "../../../../../Firebase/db";
import { setTasks } from "../../../../../App/Actions/todoActions";
import { refresh } from "../../../../../App/Actions/refreshActions";
import { toggleSetting } from "../../../../../App/Actions/settingActions";
import { toggleDrawer } from "../../../../../App/Actions/notepadActions";
import BlurBox from "../../../../Shared/BlurBox";
import TodoBox from "../../../../TodoBox";
const MobileActions = ({ resetCountDown, startCountDown, pasueCountDown }) => {
  const [open, setOpen] = useState(false);
  const { userState, counterState, notepadState } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const handleToggleNotepad = () => {
    toggleDrawer(dispatch);
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
  const handleLogout = () => {
    signOutFromGoogle();
    logout(dispatch);
  };
  return (
    <>
      <div className="mobile-button-container">
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
          text={`${!counterState.isActive ? "Start" : "Pause"}`}
          action={!counterState.isActive ? startCountDown : pasueCountDown}
          width="80"
        />
      </div>
      {userState.isAuthenticated && <TodoBox />}
      <BlurBox classNames="mobile-actions">
        {!useState.isAuthenticated && !userState.user ? (
          <>
            <Button
              text="Login"
              action={handleLogin}
              classNames="transparent"
              width={80}
            >
              <i className="fab fa-google"></i>
            </Button>
          </>
        ) : (
          <>
            <Button
              action={handleToggleNotepad}
              classNames={`mobile-notes-btn rounded ${
                !notepadState && "transparent"
              }`}
              width={10}
            >
              <i className="fas fa-file-alt"></i>
            </Button>
            <Button
              action={() => setOpen(true)}
              classNames="transparent user-btn"
              text={userState.user?.name}
            >
              <img
                src={userState.user?.image}
                alt={userState.user?.name[0]}
                className="mobile-user-img"
              />
            </Button>
          </>
        )}
        <Button
          id="setting-btn-2"
          width="15"
          classNames="transparent mobile-setting-btn"
          action={() => toggleSetting(dispatch)}
          disabled={counterState.isActive}
        >
          <i className="fas fa-cog"></i>
        </Button>
      </BlurBox>
      <Drawer
        open={open}
        anchor="bottom"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={51}
        ModalProps={{ keepMounted: true }}
      >
        <BlurBox classNames="mobile-user-drawer">
          <div className="user-action">
            <Button
              text="Logout"
              classNames="bg-red mobile-logout-btn"
              width={100}
              action={handleLogout}
            >
              <i className="fas fa-power-off"></i>
            </Button>
          </div>
        </BlurBox>
      </Drawer>
    </>
  );
};

export default MobileActions;
