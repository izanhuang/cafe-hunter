import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "./firebase";

export const getFirebaseAuth = () => {
  console.log("Firebase Auth instance:", getAuth(getFirebaseApp()));
  return getAuth(getFirebaseApp());
};
