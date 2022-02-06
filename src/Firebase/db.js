import { db } from "./index";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
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

export const addTag = async (id, tag, color, tagId) => {
  try {
    const query = await getDoc(doc(db, "tags", id));
    if (!query.exists()) {
      await setDoc(doc(db, "tags", id), {
        tags: [
          {
            tag,
            id: tagId,
            color,
          },
        ],
      });
    } else {
      await updateDoc(doc(db, "tags", id), {
        tags: arrayUnion({
          tag,
          id: tagId,
          color,
        }),
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
export const editTag = async (userId, newTagList) => {
  try {
    await setDoc(doc(db, "tags", userId), {
      tags: [...newTagList],
    });
  } catch (err) {
    throw new Error(err);
  }
};
export const getTags = async (id) => {
  try {
    const query = await getDoc(doc(db, "tags", id));
    if (query.exists()) {
      return { ...query.data() };
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
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
export const setActiveTasks = async (userId, tasks) => {
  try {
    await updateDoc(doc(db, "todos", userId), {
      activeTasks: tasks,
    });
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
    let createdTime = 0;
    let updatedTime = 0;
    if (!completedTask.createdAt.seconds) {
      createdTime = new Date(completedTask.createdAt).getTime();
    } else {
      createdTime =
        completedTask.createdAt.seconds * 1000 +
        completedTask.createdAt.nanoseconds / 1000;
    }
    if (!completedTask.updatedAt.seconds) {
      updatedTime = new Date(completedTask.updatedAt).getTime();
    } else {
      updatedTime =
        completedTask.updatedAt.seconds * 1000 +
        completedTask.updatedAt.nanoseconds / 1000;
    }
    const time = Math.abs(updatedTime - createdTime);
    console.log(time);
    await setDoc(
      doc(db, "todos", userId),
      {
        activeTasks: [...activeArr],
        completedTasks: arrayUnion(completedTask),
        totalCompleted: increment(1),
        completedTime: increment(time),
        totalDiscarded: increment(0),
        discardedTime: increment(0),
      },
      {
        merge: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};
export const removeTodoTask = async (userId, activeArr, removedTask) => {
  try {
    let createdTime = 0;
    let updatedTime = 0;
    if (!removedTask.createdAt.seconds) {
      createdTime = new Date(removedTask.createdAt).getTime();
    } else {
      createdTime =
        removedTask.createdAt.seconds * 1000 +
        removedTask.createdAt.nanoseconds / 1000;
      console.log(createdTime);
    }
    if (!removedTask.updatedAt.seconds) {
      updatedTime = new Date(removedTask.updatedAt).getTime();
    } else {
      updatedTime =
        removedTask.updatedAt.seconds * 1000 +
        removedTask.updatedAt.nanoseconds / 1000;
      console.log(updatedTime);
    }
    const time = Math.abs(updatedTime - createdTime);
    console.log(time);
    await setDoc(
      doc(db, "todos", userId),
      {
        activeTasks: [...activeArr],
        removedTasks: arrayUnion(removedTask),
        totalDiscarded: increment(1),
        discardedTime: increment(time),
        totalCompleted: increment(0),
        completedTime: increment(0),
      },
      {
        merge: true,
      }
    );
  } catch (err) {
    console.error(err);
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
      const dateStr = new Date().toDateString();
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

export const setAnalyticData = async ({ id, data, tag }) => {
  try {
    const query = await getDoc(doc(db, "data", id));
    const dateStr = new Date().toDateString();
    if (!query.exists()) {
      await setDoc(doc(db, "data", id), {
        [dateStr]: {
          focus: data.focus,
          short: data.short,
          long: data.long,
          data: [{ ...data }],
        },
      });
    } else {
      const queryData = query.data();
      const focusPrev = queryData[dateStr]?.focus || 0;
      const shortPrev = queryData[dateStr]?.short || 0;
      const longPrev = queryData[dateStr]?.long || 0;
      const dataPrev = queryData[dateStr]?.data || [];
      const tagPrev = queryData[dateStr]
        ? queryData[dateStr][tag]
          ? queryData[dateStr][tag]
          : 0
        : 0;
      await updateDoc(
        doc(db, "data", id),
        {
          [dateStr]: {
            focus: focusPrev + data.focus,
            short: shortPrev + data.short,
            long: longPrev + data.long,
            data: [...dataPrev, { ...data }],
            [tag]: tagPrev + data.focus + data.short + data.long,
          },
        },
        {
          merge: true,
        }
      );
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const getAnalyticData = async ({ id }) => {
  try {
    const query = await getDoc(doc(db, "data", id));
    if (!query.exists()) {
      throw new Error({ status: 404, message: "No Data Found" });
    } else {
      return { ...query.data() };
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
