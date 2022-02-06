import React from "react";
import BlurBox from "../Shared/BlurBox";
import Button from "../Shared/Button";
import "./todo-box.css";
import TaskDialog from "../Dialogs/Task";
import { useSelector } from "react-redux";
import { setActiveTasks } from "../../Firebase/db";
import { removeTask, setTasks } from "../../App/Actions/todoActions";
import {
  completeTodoTask,
  removeTodoTask,
  getTodoTasks,
} from "../../Firebase/db";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoBox = ({ dashboard }) => {
  const { todoState, userState, tags } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleRemoveTask = (id) => {
    const newArr = todoState.activeTasks.filter((item) => item.id !== id);
    const removedTask = todoState.activeTasks.filter((item) => item.id === id);
    removeTask(dispatch, newArr);
    return [newArr, removedTask];
  };
  const handleCompleteTask = (id) => {
    const [newArr, removedTask] = handleRemoveTask(id);
    completeTodoTask(userState.user?.id, newArr, {
      ...removedTask[0],
      updatedAt: new Date(Date.now()),
    }).then(() => {
      if (userState.isAuthenticated && userState.user) {
        getTodoTasks(userState.user?.id)
          .then((data) => {
            console.log(data);
            setTasks(dispatch, data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setTasks(dispatch, []);
      }
    });
  };
  const handleDiscardTask = (id) => {
    const [newArr, removedTask] = handleRemoveTask(id);
    removeTodoTask(userState.user?.id, newArr, {
      ...removedTask[0],
      updatedAt: new Date(Date.now()),
    }).then(() => {
      if (userState.isAuthenticated && userState.user) {
        getTodoTasks(userState.user?.id)
          .then((data) => {
            setTasks(dispatch, data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setTasks(dispatch, []);
      }
    });
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    console.log(result);
    if (!result.destination) {
      return;
    }

    const items = reorder(
      todoState.activeTasks,
      result.source.index,
      result.destination.index
    );

    setTasks(dispatch, { activeTasks: items });
    setActiveTasks(userState.user?.id, items);
  };
  return (
    <div className={`todo-box ${dashboard && "dashboard-todo"}`}>
      <TaskDialog
        num={todoState?.activeTasks?.length}
        id={userState.user?.id}
        dashboard={dashboard}
        tags={tags}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`todo-list-wrapper ${dashboard && "dashboard-todo"}`}
            >
              {todoState?.activeTasks?.map((item, idx) => (
                <Draggable key={item.id} draggableId={item.id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      {!dashboard ? (
                        <BlurBox classNames="todo-list" key={idx}>
                          <div className="todo-task">
                            <div className="d-flex flex-column">
                              <span className="dd-icon">{item.task}</span>
                              <span className="text-muted fs-6">
                                {item.tag}
                              </span>
                            </div>
                          </div>
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
                      ) : (
                        <div className="todo-list" key={idx}>
                          <div className="todo-task">
                            <div className="d-flex flex-column">
                              <span className="dd-icon">{item.task}</span>
                              <span className="text-muted fs-6">
                                {item.tag}
                              </span>
                            </div>
                          </div>
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
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoBox;
