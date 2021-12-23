import React from "react";
import BlurBox from "../Shared/BlurBox";
import Button from "../Shared/Button";
import "./todo-box.css";
import TaskDialog from "../Dialogs/Task";
import { useSelector } from "react-redux";
import { removeTask, setTasks } from "../../App/Actions/todoActions";
import { completeTodoTask, removeTodoTask } from "../../Firebase/db";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      todoState,
      result.source.index,
      result.destination.index
    );

    setTasks(dispatch, items);
  };
  return (
    <div className="todo-box">
      <TaskDialog num={todoState.length} id={userState.user?.id} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="todo-list-wrapper"
            >
              {todoState.map((item, idx) => (
                <Draggable key={item.id} draggableId={item.id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
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
