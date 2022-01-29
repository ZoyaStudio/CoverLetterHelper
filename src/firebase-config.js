// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  deleteDoc,
} from "@firebase/firestore";
import firebaseConfig from "./config";

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = (callBack) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      if (callBack) {
        callBack(result.user.displayName, result.user.uid);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signOutWithGoogle = (callBack) => {
  signOut(auth)
    .then(() => {
      if (callBack) {
        callBack();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// const analytics = getAnalytics(app);

// Initialize Cloud Firestore through Firebase

// export default getFirestore();
export const db = getFirestore(app);
export const addData = (collectionName, label, text, userId, callBack) => {
  addDoc(collection(db, collectionName), {
    label,
    text,
    userId,
  }).then(callBack);
};
export const editData = (collectionName, label, text, docId, callBack) => {
  const ref = doc(db, collectionName, docId);
  setDoc(ref, { label, text }, { merge: true }).then(callBack);
};
export const deleteData = (collectionName, docId, callBack) => {
  deleteDoc(doc(db, collectionName, docId)).then(callBack);
  // console.log("Deleted", label, "from", collectionName, "with doc id", docId);
};
export const saveSignOff = (signOffLines, userId, callBack) => {
  const ref = doc(db, "users", userId);
  setDoc(ref, { signOff: signOffLines, userId }, { merge: true }).then(
    callBack
  );
};
