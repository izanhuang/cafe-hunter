import Constants from "expo-constants";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseConfig.apiKey || "",
  authDomain: Constants.expoConfig?.extra?.firebaseConfig.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseConfig.projectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseConfig.storageBucket,
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseConfig.messagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseConfigappId,
  measurementId: Constants.expoConfig?.extra?.firebaseConfig.measurementId,
};

let firebaseApp: import("firebase/app").FirebaseApp | undefined;

export const getFirebaseApp = () => {
  if (!firebaseApp) {
    console.log("Firebase app initialized:", getApps());
    firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return firebaseApp;
};
