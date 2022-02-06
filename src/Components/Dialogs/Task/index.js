import React, { useState } from "react";
import { Dialog, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../../../App/Actions/todoActions";
import Button from "../../Shared/Button";
import BlurBox from "../../Shared/BlurBox";
import StyledInput from "../../Shared/StyledInput";
import { v4 as uuidv4 } from "uuid";
import "./task.css";
import { addTodoTask, addTag } from "../../../Firebase/db";
import { addTag as onAddTag } from "../../../App/Actions/tagActions";
import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import addNotification from "react-push-notification";
const filter = createFilterOptions();
const TaskDialog = ({ num, id, dashboard, tags }) => {
  const [open, setOpen] = useState(false),
    [task, setTask] = useState(""),
    [deadLine, setDeadLine] = useState(""),
    [tag, setTag] = useState(""),
    [newTag, setNewTag] = useState(false);

  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTask("");
    setDeadLine("");
    setTag("");
    setNewTag(false);
    setOpen(false);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleDeadlineChange = (e) => {
    setDeadLine(e.target.value);
  };
  const handleAddTask = () => {
    if (task !== "") {
      const newTask = {
        task,
        createdAt: new Date(Date.now()),
        deadLine: deadLine.length ? new Date(deadLine) : null,
        tag: tag.length ? tag : "Other",
        id: uuidv4(),
      };
      console.log(newTask);
      addTodoTask(id, newTask)
        .then(() => {
          addTask(dispatch, newTask);
        })
        .catch((err) => {
          console.error(err);
          addNotification({
            title: "Error",
            message: "Error Adding Task, please try again later",
          });
        });
      if (newTag) {
        const color =
          "#" + (Math.random().toString(16) + "000000").substring(2, 8);
        const tagId = uuidv4();
        addTag(id, tag, color, tagId)
          .then(() => {
            onAddTag(dispatch, { tag, color, id: tagId });
          })
          .catch((err) => {
            console.error(err);
          });
        setNewTag(false);
      }
      if (num === 4) {
        handleClose();
      } else {
        setTask("");
        setDeadLine("");
        setTag("");
        setNewTag(false);
      }
    } else {
      addNotification({
        title: "Error",
        message: "Task cannot be empty",
      });
    }
  };
  const handleEnter = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleAddTask();
    }
  };
  return (
    <>
      <Button
        text={`Create a task (${num}/5)`}
        classNames={`width-100 ${dashboard && "transparent "}`}
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
              onKeyDown={handleEnter}
            />
            <StyledInput
              id="task-date"
              type="date"
              min=""
              theme="dark"
              size="lg"
              label="Deadline"
              classNames="text-left"
              value={deadLine}
              onChange={handleDeadlineChange}
              onKeyDown={handleEnter}
            />
            <Autocomplete
              value={tag}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setTag(newValue);
                  setNewTag(false);
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setTag(newValue.inputValue);
                  setNewTag(true);
                } else {
                  setTag(newValue?.tag ? newValue?.tag : "");
                  setNewTag(false);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.tag
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    tag: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={tags}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.tag;
              }}
              renderOption={(props, option) => (
                <li {...props}>
                  {typeof option === "string" ? option : option.tag}
                </li>
              )}
              freeSolo
              renderInput={(params) => (
                <div className="styled-input-wrapper">
                  <label className="styled-label dark lg">Tag</label>
                  <TextField
                    {...params}
                    variant="standard"
                    className="styled-input dark lg text-white"
                  />
                </div>
              )}
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
