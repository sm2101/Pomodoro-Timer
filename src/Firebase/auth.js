import { auth, db, googleProvider } from "./index";
import { signInWithPopup, signOut } from "@firebase/auth";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { store } from "..";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import addNotification from "react-push-notification";
export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    console.log("signin user", user);
    const query = await getDoc(doc(db, "users", user.uid));
    if (!query.exists()) {
      const { counterState } = store.getState();
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          authProvider: "Google",
          email: user.email,
          id: user.uid,
          preset1: {
            name: "preset 1",
            focus: counterState.focus,
            long: counterState.long,
            short: counterState.short,
            auto: counterState.auto,
            break: counterState.longDuration,
          },
          preset2: {
            name: "preset 2",
            focus: counterState.focus,
            long: counterState.long,
            short: counterState.short,
            auto: counterState.auto,
            break: counterState.longDuration,
          },
          preset3: {
            name: "preset 3",
            focus: counterState.focus,
            long: counterState.long,
            short: counterState.short,
            auto: counterState.auto,
            break: counterState.longDuration,
          },
          preset4: {
            name: "preset 4",
            focus: counterState.focus,
            long: counterState.long,
            short: counterState.short,
            auto: counterState.auto,
            break: counterState.longDuration,
          },
        });
        try {
          const query = await getDoc(doc(db, "users", user.uid));
          await setDoc(doc(db, "todos", user.uid), {
            activeTasks: [],
            completedTasks: [],
            removedTasks: [],
          })
            .then(() => {
              console.log("todo doc set");
            })
            .catch((err) => {
              console.error(err);
            });
          const res = { ...query.data(), image: user.photoURL };
          const token = jwt.sign({ ...res }, process.env.REACT_APP_JWT_SECRET);
          Cookies.set("jwt", token);
          window.localStorage.setItem(
            "session",
            JSON.stringify({
              focus: res.preset1.focus,
              short: res.preset1.short,
              long: res.preset1.long,
              break: res.preset1.break,
            })
          );
          return res;
        } catch (err) {
          console.error(err);
          window.alert(err.message);
        }
      } catch (err) {
        console.error(err);
        window.alert(err.message);
      }
    } else {
      const res = { ...query.data(), image: user.photoURL };
      const token = jwt.sign({ ...res }, process.env.REACT_APP_JWT_SECRET);
      Cookies.set("jwt", token);
      window.localStorage.setItem(
        "session",
        JSON.stringify({
          focus: res.preset1.focus,
          short: res.preset1.short,
          long: res.preset1.long,
          break: res.preset1.break,
        })
      );
      return res;
    }
  } catch (err) {
    console.error(err);
    window.alert(err.message);
  }
};

export const signOutFromGoogle = () => {
  signOut(auth)
    .then(() => {
      Cookies.remove("jwt");
      addNotification({
        title: "Bye",
        message: "Logout Successfull",
      });
    })
    .catch((err) => {
      console.error(err);
      window.alert("Some error occured");
    });
};
