import React from "react";
import BlurBox from "../BlurBox";
import Button from "../Button";
import "./user-card.css";
import { useNavigate } from "react-router-dom";
import { signOutFromGoogle } from "../../../Firebase/auth";
import { logout } from "../../../App/Actions/userActions";
import { toggleSetting } from "../../../App/Actions/settingActions";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
const UserCard = ({ user, dashboard }) => {
  const { settingState, counterState } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenSettings = () => {
    if (!settingState) {
      toggleSetting(dispatch);
    }
  };
  const handleLogout = () => {
    signOutFromGoogle();
    logout(dispatch);
  };
  const goToDashboard = () => {
    navigate("/dashboard");
  };
  const goToTimer = () => {
    navigate("/");
  };
  return (
    <BlurBox id="user-card" classNames="user-card">
      <div className="user-img-cont">
        <Avatar src={user?.image} alt={user?.name} className="user-img" />
      </div>
      <div className="user-meta">
        <div className="user-name">{user?.name}</div>
      </div>
      <div
        className={`user-option ${
          !counterState.isActive ? "active" : "disable"
        }`}
      >
        <i className="fas fa-chevron-right"></i>
        {dashboard ? (
          <>
            <Button
              id="timer-btn"
              classNames="timer-btn"
              action={goToTimer}
              disabled={counterState.isActive}
            >
              <i className="fas fa-home"></i>
            </Button>
            <Button
              id="dashboard-logout-btn"
              classNames="dashboard-logout-btn bg-red"
              text="Logout"
              action={handleLogout}
              disabled={counterState.isActive}
            >
              <i className="fas fa-power-off"></i>
            </Button>
          </>
        ) : (
          <>
            <Button
              id="dashboard-btn"
              classNames="dashboard-btn"
              action={goToDashboard}
              disabled={counterState.isActive}
            >
              <i className="fas fa-home"></i>
            </Button>
            <Button
              id="setting-btn"
              classNames="setting-btn"
              action={handleOpenSettings}
              disabled={counterState.isActive}
            >
              <i className="fas fa-cog"></i>
            </Button>
            <Button
              id="logout-btn"
              classNames="logout-btn bg-red"
              text="Logout"
              action={handleLogout}
              disabled={counterState.isActive}
            >
              <i className="fas fa-power-off"></i>
            </Button>
          </>
        )}
      </div>
    </BlurBox>
  );
};

export default UserCard;
