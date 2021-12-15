import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  initializeAuth,
  inMemoryPersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../Config/firbase";

export const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence:
//     typeof window === "undefined"
//       ? inMemoryPersistence
//       : [indexedDBLocalPersistence, browserLocalPersistence],
// });
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
