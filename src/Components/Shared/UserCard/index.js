import React from "react";
import BlurBox from "../BlurBox";
import Button from "../Button";
import "./user-card.css";
import { logout } from "../../../Firebase/auth";
import { toggleSetting } from "../../../App/Actions/settingActions";
import { useDispatch, useSelector } from "react-redux";
const UserCard = ({ user }) => {
  const { settingState, counterState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleOpenSettings = () => {
    if (!settingState) {
      toggleSetting(dispatch);
    }
  };
  return (
    <BlurBox id="user-card" classNames="user-card">
      <div className="user-img-cont">
        <img src={user?.image} alt={user?.name} className="user-img" />
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
          action={logout}
          disabled={counterState.isActive}
        >
          <i className="fas fa-power-off"></i>
        </Button>
      </div>
    </BlurBox>
  );
};

export default UserCard;
