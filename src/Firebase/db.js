import { db } from "./index";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "@firebase/firestore";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
export const getUser = async (id) => {
  let query = await getDoc(doc(db, "users", id));

  const user = jwt.decode(Cookies.get("jwt"));
  const newUser = { ...user, ...query.data() };
  const token = jwt.sign({ ...newUser }, process.env.REACT_APP_JWT_SECRET);
  Cookies.set("jwt", token);
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
export const setThoughts = async (userId, text) => {
  try {
    const query = await getDoc(doc(db, "notes", userId));
    if (!query.exists()) {
      try {
        await setDoc(doc(db, "notes", userId), {
          thoughts: {
            [new Date(Date.now()).toDateString()]: arrayUnion(text),
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      const dateStr = new Date(Date.now()).toDateString();
      await updateDoc(
        doc(db, "notes", userId),
        {
          [`thoughts.${dateStr}`]: arrayUnion(text),
        },
        {
          merge: true,
        }
      );
    }
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const setIdeasOrThoughts = async (userId, arr) => {
  let ideas = [];
  let thoughts = [];
  let other = [];
  await arr.forEach((item) => {
    if (item.startsWith("@[#idea](idea)")) {
      let ideaStr = item.slice(14);
      ideas.push(ideaStr.trim());
    } else if (item.startsWith("#idea")) {
      let ideaStr = item.slice(5);
      ideas.push(ideaStr.trim());
    } else if (item.startsWith("@[#thought](thought)")) {
      let thoughtStr = item.slice(21);
      thoughts.push(thoughtStr);
    } else if (item.startsWith("#thought")) {
      let thoughtStr = item.slice(7);
      thoughts.push(thoughtStr);
    } else {
      other.push(item.trim());
    }
  });
  try {
    const query = await getDoc(doc(db, "notes", userId));
    if (!query.exists()) {
      try {
        await setDoc(doc(db, "notes", userId), {
          ideas: {
            [new Date(Date.now).toDateString()]: arrayUnion(...ideas),
          },
          thoughts: {
            [new Date(Date.now).toDateString()]: arrayUnion(...thoughts),
          },
          other: {
            [new Date(Date.now).toDateString()]: arrayUnion(...other),
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      const dateStr = new Date(Date.now()).toDateString();
      await updateDoc(
        doc(db, "notes", userId),
        {
          [`ideas.${dateStr}`]: arrayUnion(...ideas),
          [`thoughts.${dateStr}`]: arrayUnion(...thoughts),
          [`other.${dateStr}`]: arrayUnion(...other),
        },
        {
          merge: true,
        }
      );
    }
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};
