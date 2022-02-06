import React from "react";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOutFromGoogle } from "../../../Firebase/auth";
import { logout } from "../../../App/Actions/userActions";
import "./user-card.css";
const DashboardUserCard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToTimer = () => {
    navigate("/");
  };
  const handleLogout = () => {
    signOutFromGoogle();
    logout(dispatch);
  };
  return (
    <div className="dashboard-user-card">
      <div className="user-img-container">
        <Avatar
          src={user?.image}
          alt={user?.name}
          className="dashboard-user-img"
        >
          {user?.name[0]}
        </Avatar>
      </div>
      <div className="user-name-container">
        <span className="user-name">{user?.name}</span>
      </div>
      <div className="user-actions">
        <Button
          text="Timer"
          width="48"
          classNames="btn-small"
          action={goToTimer}
        >
          <i className="fas fa-stopwatch"></i>
        </Button>
        <Button
          text="Logout"
          classNames="bg-red btn-small"
          width="48"
          action={handleLogout}
        ></Button>
      </div>
    </div>
  );
};

export default DashboardUserCard;
