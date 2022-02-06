import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TodoBox from "../../TodoBox";
import RadarGraph from "../Graphs/RadarGraph";
import TaskTag from "../Graphs/TaskTag";
import Button from "../../Shared/Button";
import { Collapse, useMediaQuery } from "@mui/material";
const TaskData = ({ todoState, taskPage, navOpen, tags }) => {
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery("(max-width:800px)");
  return (
    <>
      <Col lg={navOpen ? 12 : 5} xl={5} className="p-4">
        <div className="dashboard-active-tasks neomorph pb-3 px-lg-3 h-100 d-flex flex-column justify-content-between">
          <TodoBox dashboard />
          {!taskPage && (
            <div className="pt-2 d-flex justify-content-end">
              <Link
                to="/dashboard/tasks"
                className="text-muted text-decoration-none"
              >
                Manage All Tasks
              </Link>
            </div>
          )}
        </div>
      </Col>

      {taskPage ? (
        <>
          {mobile ? (
            <>
              <Button
                text="Stats"
                classNames="transparent btn-small"
                action={() => setOpen(!open)}
              >
                <i
                  className="fas fa-chevron-down"
                  style={{
                    transform: `rotateZ(${open ? "180deg" : "0deg"})`,
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </Button>
              <Collapse in={open}>
                <Col lg={12} className="p-4">
                  <div className="radar-chart-wrapper px-lg-5 py-2">
                    <TaskTag todoState={todoState} tags={tags} />
                  </div>
                </Col>
              </Collapse>
            </>
          ) : (
            <Col
              lg={navOpen ? 12 : 7}
              xl={7}
              className="p-4 d-flex justify-content-center"
            >
              <div className="radar-chart-wrapper-pc px-lg-5 py-2">
                <TaskTag todoState={todoState} tags={tags} />
              </div>
            </Col>
          )}
        </>
      ) : (
        <>
          <Col
            lg={navOpen ? 6 : 4}
            xl={4}
            className="p-4 d-flex align-items-center"
          >
            <div className="radar-chart-wrapper px-lg-5 py-2">
              <RadarGraph todoState={todoState} />
            </div>
          </Col>
          <Col
            lg={navOpen ? 6 : 3}
            xl={3}
            className="p-4 d-flex flex-column justify-content-center pt-5"
          >
            <div className="color-white d-flex justify-content-between">
              <h3>Total Tasks: </h3>
              <h3>
                <strong>
                  {todoState.activeTasks?.length +
                    todoState.completedTasks?.length +
                    todoState.removedTasks?.length}
                </strong>
              </h3>
            </div>
            <div className="color-white d-flex justify-content-between">
              <h4>Completed Tasks: </h4>
              <div className="d-flex align-items-center">
                <h4 className="m-0 text-end">
                  <strong>{`${todoState.completedTasks?.length}`}</strong>
                </h4>
                <small className="ms-1">
                  {`(${(
                    (todoState.completedTasks?.length /
                      (todoState.activeTasks?.length +
                        todoState.completedTasks?.length +
                        todoState.removedTasks?.length)) *
                    100
                  ).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    maximumFractionDigits: 1,
                  })})%`}
                </small>
              </div>
            </div>
            <div className="color-white d-flex justify-content-between">
              <h4>Discarded Tasks: </h4>
              <div className="d-flex align-items-center">
                <h4 className="m-0 text-end">
                  <strong>{`${todoState.removedTasks?.length}`}</strong>
                </h4>
                <small className="ms-1">
                  {`(${(
                    (todoState.removedTasks?.length /
                      (todoState.activeTasks?.length +
                        todoState.completedTasks?.length +
                        todoState.removedTasks?.length)) *
                    100
                  ).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    maximumFractionDigits: 1,
                  })})%`}
                </small>
              </div>
            </div>
            <div className="color-white d-flex justify-content-between">
              <h4>Active Tasks: </h4>
              <div className="d-flex align-items-center">
                <h4 className="m-0 text-end">
                  <strong>{`${todoState.activeTasks?.length}`}</strong>
                </h4>
                <small className="ms-1">
                  {`(${(
                    (todoState.activeTasks?.length /
                      (todoState.activeTasks?.length +
                        todoState.completedTasks?.length +
                        todoState.removedTasks?.length)) *
                    100
                  ).toLocaleString("en-US", {
                    minimumIntegerDigits: 1,
                    maximumFractionDigits: 1,
                  })})%`}
                </small>
              </div>
            </div>
          </Col>
        </>
      )}
    </>
  );
};

export default TaskData;
