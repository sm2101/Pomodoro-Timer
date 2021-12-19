import React from "react";
import BlurBox from "../Shared/BlurBox";
import Button from "../Shared/Button";
import "./todo-box.css";
import TaskDialog from "../Dialogs/Task";
import { useSelector } from "react-redux";
import { removeTask } from "../../App/Actions/todoActions";
import { completeTodoTask, removeTodoTask } from "../../Firebase/db";
import { useDispatch } from "react-redux";
const TodoBox = () => {
  const { todoState, userState } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleRemoveTask = (id) => {
    const newArr = todoState.filter((item) => item.id !== id);
    const removedTask = todoState.filter((item) => item.id === id);
    removeTask(dispatch, newArr);
    return [newArr, removedTask];
  };
  const handleCompleteTask = (id) => {
    const [newArr, removedTask] = handleRemoveTask(id);
    completeTodoTask(userState.user?.id, newArr, {
      ...removedTask[0],
      updatedAt: new Date(Date.now()),
    });
  };
  const handleDiscardTask = (id) => {
    const [newArr, removedTask] = handleRemoveTask(id);
    removeTodoTask(userState.user?.id, newArr, {
      ...removedTask[0],
      updatedAt: new Date(Date.now()),
    });
  };
  return (
    <div className="todo-box">
      <TaskDialog num={todoState.length} id={userState.user?.id} />
      <div className="todo-list-wrapper">
        {todoState.map((item, idx) => (
          <BlurBox classNames="todo-list" key={idx}>
            <span className="todo-task">{item.task}</span>
            <span className="todo-actions">
              <Button
                classNames="success-btn"
                action={() => handleCompleteTask(item.id)}
              >
                <i className="fas fa-check"></i>
              </Button>
              <Button
                classNames="danger-btn"
                action={() => handleDiscardTask(item.id)}
              >
                <i className="fas fa-trash"></i>
              </Button>
            </span>
          </BlurBox>
        ))}
      </div>
    </div>
  );
};

export default TodoBox;
