import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import TaskData from "./Components/TaskData";
import NonActiveTasks from "../TodoBox/NonActiveTasks";
import "./dashboard-tasks.css";
const DashboardTasks = ({ navOpen }) => {
  const { todoState, tags } = useSelector((state) => ({ ...state }));
  return (
    <div className="dashboard-tasks">
      <Container fluid className="h-100 d-flex flex-column ">
        <Row>
          <TaskData
            todoState={todoState}
            taskPage
            navOpen={navOpen}
            tags={tags}
          />
        </Row>
        <NonActiveTasks dashboard />
      </Container>
    </div>
  );
};

export default DashboardTasks;
