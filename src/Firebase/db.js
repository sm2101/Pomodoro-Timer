import { db } from "./index";
import { doc, setDoc, getDoc, updateDoc } from "@firebase/firestore";

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
