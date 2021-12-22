import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../../Shared/Button";
import { toggleSetting } from "../../../../../App/Actions/settingActions";
import UserCard from "../../../../Shared/UserCard";
import { signInWithGoogle } from "../../../../../Firebase/auth";
import { getTodoTasks } from "../../../../../Firebase/db";
import { login } from "../../../../../App/Actions/userActions";
import { refresh } from "../../../../../App/Actions/refreshActions";
import { setTasks } from "../../../../../App/Actions/todoActions";
import { toggleDrawer } from "../../../../../App/Actions/notepadActions";
const Actions = ({ resetCountDown, startCountDown, pasueCountDown }) => {
  const { counterState, userState, notepadState } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();

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
  const handleToggleNotepad = () => {
    toggleDrawer(dispatch);
  };
  return (
    <>
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
          text={`${!counterState.isActive ? "Start" : "Pause"} (space)`}
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
    </>
  );
};

export default Actions;
