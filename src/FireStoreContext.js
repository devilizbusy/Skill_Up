import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs,doc, updateDoc, addDoc,deleteDoc,setDoc } from 'firebase/firestore'
import {auth,db} from './firebase'
const userDataReference = collection(db,"user")

export const FirestoreContext = createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}


export const FirestoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  function createUserData(){
    return setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});
  }

  const value = {
  createUserData
  };
  return (
      <FirestoreContext.Provider value={value}>
      {loading && children}
      </FirestoreContext.Provider>
  );
};
