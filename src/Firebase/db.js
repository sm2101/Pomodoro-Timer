import { db } from "./index";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "@firebase/firestore";

export const getUser = async (id) => {
  let query = await getDoc(doc(db, "users", id));
  const userStr = window.localStorage.getItem("user");
  const user = JSON.parse(userStr);
  window.localStorage.setItem(
    "user",
    JSON.stringify({ ...user, ...query.data() })
  );
  return query.data();
};

export const setData = async ({
  id,
  focus,
  long,
  short,
  longDuration,
  name,
  preset,
}) => {
  console.log({
    id,
    focus,
    long,
    short,
    longDuration,
    name,
    preset,
  });
  await updateDoc(doc(db, "users", id), {
    [preset]: {
      focus,
      long,
      short,
      break: longDuration,
      name,
    },
  });
};

export const getBackgrounds = async () => {
  try {
    let query = await getDoc(doc(db, "bgs", "default"));
    return { ...query.data() };
  } catch (err) {
    console.error(err);
  }
};

export const getTodoTasks = async (userId) => {
  console.log("todo func");
  try {
    let query = await getDoc(doc(db, "todos", userId));
    return { ...query.data() };
  } catch (err) {
    console.error(err);
  }
};
export const addTodoTask = async (userId, task) => {
  try {
    await updateDoc(doc(db, "todos", userId), {
      activeTasks: arrayUnion(task),
    });
  } catch (err) {
    console.error(err);
  }
};
export const completeTodoTask = async (userId, activeArr, completedTask) => {
  try {
    await updateDoc(doc(db, "todos", userId), {
      activeTasks: [...activeArr],
      completedTasks: arrayUnion(completedTask),
    });
  } catch (err) {
    console.error(err);
  }
};
export const removeTodoTask = async (userId, activeArr, removedTask) => {
  try {
    await updateDoc(doc(db, "todos", userId), {
      activeTasks: [...activeArr],
      removedTasks: arrayUnion(removedTask),
    });
  } catch (err) {
    console.error(err);
  }
};
