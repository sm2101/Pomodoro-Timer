import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import BlurBox from "../Shared/BlurBox";
import "./todo-box.css";
import { useSelector } from "react-redux";

const NonActiveTsaks = ({ dashboard }) => {
  const { todoState } = useSelector((state) => ({ ...state }));
  const [completedData, setComplatedData] = useState({
      total: 0,
      average: "",
      suffix: "Days",
      data: [],
    }),
    [removedData, setRemovedData] = useState({
      total: 0,
      average: "",
      suffix: "Days",
      data: [],
    });
  useEffect(() => {
    let completed = {
        total: todoState?.totalCompleted,
        average: Math.floor(
          todoState?.completedTime / todoState?.totalCompleted
        ),
        data: [],
      },
      removed = {
        total: todoState?.totalDiscarded,
        average: Math.floor(
          todoState?.discardedTime / todoState?.totalDiscarded
        ),
        data: [],
      };

    if (completed.average > 3600 * 1000 * 24) {
      completed = {
        ...completed,
        average: Math.floor(completed.average / (3600 * 1000 * 24)),
        suffix: "Days",
      };
    } else if (completed.average > 3600 * 1000) {
      completed = {
        ...completed,
        average: Math.floor(completed.average / (3600 * 1000)),
        suffix: "Hours",
      };
    } else if (completed.average > 60 * 1000) {
      completed = {
        ...completed,
        average: Math.floor(completed.average / (60 * 1000)),
        suffix: "Mins",
      };
    } else if (completed.average > 1000) {
      completed = {
        ...completed,
        average: Math.floor(completed.average / 1000),
        suffix: "Seconds",
      };
    } else {
      completed = {
        ...completed,
        suffix: "mSec",
      };
    }
    if (removed.average > 3600 * 1000 * 24) {
      removed = {
        ...removed,
        average: Math.floor(removed.average / (3600 * 1000 * 24)),
        suffix: "Days",
      };
    } else if (removed.average > 3600 * 1000) {
      removed = {
        ...removed,
        average: Math.floor(removed.average / (3600 * 1000)),
        suffix: "Hours",
      };
    } else if (removed.average > 60 * 1000) {
      removed = {
        ...removed,
        average: Math.floor(removed.average / (60 * 1000)),
        suffix: "Minutes",
      };
    } else if (removed.average > 1000) {
      removed = {
        ...removed,
        average: Math.floor(removed.average / 1000),
        suffix: "Seconds",
      };
    } else {
      removed = {
        ...removed,
        suffix: "mSec",
      };
    }
    setComplatedData(completed);
    setRemovedData(removed);
  }, [
    todoState?.completedTime,
    todoState?.discardedTime,
    todoState?.totalCompleted,
    todoState?.totalDiscarded,
  ]);
  return (
    <Row className="py-4">
      <Col lg={6} className="px-3 py-2">
        <div className="neomorph px-md-4 py-md-3 rounded-cont">
          <div className={`todo-box ${dashboard && "dashboard-todo"}`}>
            <div className="todo-list-warpper dahsboard-todo">
              <BlurBox classNames="todo-list">
                <span className="todo-task-non-active w-50">
                  <strong>Tasks</strong>
                </span>
              </BlurBox>
              <div className="task-container">
                {todoState?.completedTasks?.map((item, idx) => (
                  <div
                    className="todo-list border-bottom border-muted"
                    key={idx}
                  >
                    <span className="todo-task-non-active">{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <span className="text-muted">
              <span className="me-2">
                <i className="fas fa-info-circle"></i>
              </span>
              You take an average of
              <span className="text-success mx-1">
                {`${completedData?.average} ${completedData.suffix}`}
              </span>
              to complete a task
            </span>
          </div>
        </div>
      </Col>
      <Col lg={6} className="px-3 py-2">
        <div className="neomorph px-md-4 py-md-3 rounded-cont">
          <div className={`todo-box ${dashboard && "dashboard-todo"}`}>
            <div className="todo-list-warpper dahsboard-todo">
              <BlurBox classNames="todo-list">
                <span className="todo-task-non-active w-50">
                  <strong>Tasks</strong>
                </span>
              </BlurBox>
              <div className="task-container">
                {todoState?.removedTasks?.map((item, idx) => (
                  <div
                    className="todo-list border-bottom border-muted"
                    key={idx}
                  >
                    <span className="todo-task-non-active">{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <span className="text-muted">
              <span className="me-2">
                <i className="fas fa-info-circle"></i>
              </span>
              You take an average of{" "}
              <span className="text-danger mx-1">
                {`${removedData?.average} ${removedData.suffix}`}
              </span>{" "}
              to discard a task
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default NonActiveTsaks;
