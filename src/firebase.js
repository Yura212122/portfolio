import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA2fRePEnNxhERgP3YjMnZJSCOCygSaR0",
  authDomain: "portfolio-8f955.firebaseapp.com",
  projectId: "portfolio-8f955",
  storageBucket: "portfolio-8f955.appspot.com",
  messagingSenderId: "745768876150",
  appId: "1:745768876150:web:3d61a88698aee287ed8757",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;