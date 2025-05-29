import { getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "../lib/firebase";

export const db = getFirestore(getFirebaseApp());
