import React, { useState } from "react";
import {
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BlurBox from "../../Shared/BlurBox";
import Button from "../../Shared/Button";
import "./nav.css";
import DashboardUserCard from "../../Shared/UserCard/DashboardUserCard";
const Nav = ({ open, setOpen, navRef }) => {
  const [hoverOpen, setHoverOpen] = useState(false);
  const mobile = useMediaQuery("(max-width:800px)");
  const { userState } = useSelector((state) => ({ ...state }));
  const navContent = (
    <div style={{ marginTop: "2rem" }}>
      <DashboardUserCard user={userState.isAuthenticated && userState.user} />
      <List component={"nav"}>
        <NavLink
          end
          to="/dashboard"
          className={({ isActive }) => `nav-link ${isActive && "nav-active"}`}
        >
          <ListItem>
            <ListItemIcon>
              <i className="fas fa-tachometer-alt"></i>
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </NavLink>
        <NavLink
          end
          to="tasks"
          className={({ isActive }) => `nav-link ${isActive && "nav-active"}`}
        >
          <ListItem>
            <ListItemIcon>
              <i className="fas fa-tasks"></i>
            </ListItemIcon>
            <ListItemText>Tasks</ListItemText>
          </ListItem>
        </NavLink>
        <NavLink
          end
          to="notes"
          className={({ isActive }) => `nav-link ${isActive && "nav-active"}`}
        >
          <ListItem>
            <ListItemIcon>
              <i className="far fa-sticky-note"></i>
            </ListItemIcon>
            <ListItemText>Notes</ListItemText>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
  return (
    <>
      <Button
        classNames={`nav-btn ${
          open || hoverOpen ? "open transparent " : "close"
        }`}
        action={() => {
          if (hoverOpen) {
            setHoverOpen(false);
          } else {
            setOpen(!open);
          }
        }}
      >
        <i
          className="fa fa-chevron-right"
          style={{
            transform: open || hoverOpen ? "rotateZ(-180deg)" : "rotateZ(0deg)",
            transition: "0.3s ease-in-out",
          }}
        ></i>
      </Button>
      {!mobile && !open && (
        <div
          className={`hover-controler ${hoverOpen ? "open" : "close"}`}
          onMouseEnter={() => setHoverOpen(true)}
          // onMouseLeave={() => setHoverOpen(false)}
        ></div>
      )}
      <Drawer
        variant={!mobile ? "persistent" : "temporary"}
        open={open}
        onClose={() => setOpen(false)}
        className="transparent"
        id="nav-drawer"
      >
        <BlurBox classNames="nav-drawer" elemRef={navRef}>
          <div className="drawer-header">
            <h2 className="nav-title m-0">Pomodoro Timer</h2>
          </div>
          {navContent}
        </BlurBox>
      </Drawer>
      {!mobile && !open && (
        <Drawer
          variant={"temporary"}
          open={hoverOpen}
          onClose={() => setHoverOpen(false)}
          className="transparent"
          id="nav-drawer"
        >
          <BlurBox classNames="nav-drawer">
            <div className="drawer-header">
              <h2 className="nav-title m-0">Pomodoro Timer</h2>
            </div>
            {navContent}
          </BlurBox>
        </Drawer>
      )}
    </>
  );
};

export default Nav;
