import React, { useState } from "react";
import { Dialog, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../../../App/Actions/todoActions";
import Button from "../../Shared/Button";
import BlurBox from "../../Shared/BlurBox";
import StyledInput from "../../Shared/StyledInput";
import { v4 as uuidv4 } from "uuid";
import "./task.css";
import { addTodoTask } from "../../../Firebase/db";
const TaskDialog = ({ num, id }) => {
  const [open, setOpen] = useState(false),
    [task, setTask] = useState("");

  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTask("");
    setOpen(false);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleAddTask = () => {
    const newTask = { task, createdAt: new Date(Date.now()), id: uuidv4() };
    addTask(dispatch, newTask);
    addTodoTask(id, newTask);
    if (num === 4) {
      handleClose();
    } else {
      setTask("");
    }
  };
  return (
    <>
      <Button
        text={`Create a task (${num}/5)`}
        classNames="width-100"
        action={handleOpen}
        disabled={num === 5}
      >
        <i className="fas fa-plus"></i>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <BlurBox classNames="task-dialog">
          <div id="task-title">Create a task</div>
          <div className="task-input-wrapper">
            <StyledInput
              id="task-input"
              type="text"
              min=""
              theme="dark"
              size="lg"
              label="Task"
              classNames="text-left"
              value={task}
              onChange={handleChange}
            />
          </div>
          <DialogActions>
            <Button classNames="danger-btn transparent" action={handleClose}>
              <i className="fas fa-trash"></i>
            </Button>
            <Button classNames="success-btn transparent" action={handleAddTask}>
              <i className="fas fa-check"></i>
            </Button>
          </DialogActions>
        </BlurBox>
      </Dialog>
    </>
  );
};

export default TaskDialog;
