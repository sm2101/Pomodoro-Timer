import { auth, db, googleProvider } from "./index";
import { signInWithPopup, signOut } from "@firebase/auth";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { store } from "..";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import addNotification from "react-push-notification";
export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    console.log(user);
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
          await setDoc(doc(db, "tags", user.uid), {
            tags: [
              {
                tag: "Other",
                id: uuidv4(),
                color: "#fffff",
              },
            ],
          });
          await setDoc(doc(db, "todos", user.uid), {
            activeTasks: [],
            completedTasks: [],
            removedTasks: [],
            totalCompleted: 0,
            completedTime: 0,
            discardedTime: 0,
            totalDiscarded: 0,
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
          throw new Error(err);
        }
      } catch (err) {
        console.error(err);
        window.alert(err.message);
        throw new Error(err);
      }
    } else {
      const res = {
        ...query.data(),
        image: user?.providerData[0]?.photoURL,
        name: user?.providerData[0]?.displayName,
      };
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
    throw new Error(err);
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
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
      window.alert("Some error occured");
    });
};
