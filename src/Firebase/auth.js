import { auth, db, googleProvider } from "./index";
import { signInWithPopup, signOut } from "@firebase/auth";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { store } from "..";
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
          return { ...query.data(), image: user.photoURL };
        } catch (err) {
          console.error(err);
          window.alert(err.message);
        }
      } catch (err) {
        console.error(err);
        window.alert(err.message);
      }
    } else {
      return { ...query.data(), image: user.photoURL };
    }
  } catch (err) {
    console.error(err);
    window.alert(err.message);
  }
};

export const signOutFromGoogle = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      window.alert("Signed Out successfully!");
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
      window.alert("Some error occured");
    });
};
