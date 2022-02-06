import React, { useState, useRef } from "react";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardIndex from "./Components/Dashboard";
import DashboardTasks from "./Components/Dashboard/DashboardTasks";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Nav from "./Components/Dashboard/Nav";
import { useMediaQuery, Breadcrumbs } from "@mui/material";
const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const navRef = useRef(null);
  const mobile = useMediaQuery("(max-width:800px)");
  const location = useLocation();
  const breadcrumbNameMap = {
    "/dashboard": "Dashboard",
    "/dashboard/tasks": "Tasks",
    "/dashboard/notes": "Notes",
  };
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="dashboard">
      <Nav open={open} setOpen={setOpen} navRef={navRef} />
      <div
        className={`dashbaord-content ${!mobile && open ? "open" : "close"}`}
        style={{
          paddingLeft:
            !mobile && open ? `${navRef?.current?.offsetWidth}px` : "0px",
        }}
      >
        <div className="breadcrumbs-container">
          <Breadcrumbs
            separator={
              <i
                className="fa fa-chevron-right"
                style={{ margin: "0 0.4rem" }}
              ></i>
            }
          >
            <Link to="/">Timer</Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <span className="breadcrumbs-last" key={index}>
                  {breadcrumbNameMap[to]}
                </span>
              ) : (
                <Link to={to} key={index}>
                  {breadcrumbNameMap[to]}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
        <Routes>
          <Route path="/" element={<DashboardIndex navOpen={open} />} />
          <Route path="/tasks" element={<DashboardTasks navOpen={open} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
