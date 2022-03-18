import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDja5SEQURD5Q163NzjXOgIGf0yQ8X5ABI",
  authDomain: "gacha-df2b3.firebaseapp.com",
  projectId: "gacha-df2b3",
  storageBucket: "gacha-df2b3.appspot.com",
  messagingSenderId: "907717237783",
  appId: "1:907717237783:web:7d7383f50b4f9aefe49052",
};

firebase.initializeApp(firebaseConfig);

export const db = getFirestore();
