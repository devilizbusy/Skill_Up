import React, { createContext, useContext, useEffect, useState } from "react";
// import { collection, getDocs,doc, updateDoc, addDoc,deleteDoc,setDoc } from 'firebase/firestore'
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  deleteUser
} from "firebase/auth";
import {auth,GoogleAuth,FacebookAuth} from './firebase'

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading,setLoading] = useState(true);
  let userType;

  function Logout(){
    return signOut(auth);
  }

  function forgotPassword(auth,email){
    return sendPasswordResetEmail(auth,email);
  }

  function signInWithGoogle(){
   return signInWithPopup(auth,GoogleAuth);
  }

  function signInWithFacebook(){
    return signInWithPopup(auth,FacebookAuth);
   }

   function EmailVerification(){
    return sendEmailVerification(auth.currentUser);
   }

  function  sendEmailLink(auth,email){
    return sendSignInLinkToEmail(auth,email,{
      url:"http://localhost:3000/confirm",
      handleCodeInApp:true,
    })
  }

  function deleteUsers(){
      return deleteUser(auth.currentUser);
  }

  function signInWithEmail(auth,email){
    return signInWithEmailLink(auth,email)
  }


useEffect(()=>{
  const unsusbcribe =onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setLoading(false);
     }) 
  return unsusbcribe();
},[])

  const value = {
    currentUser,
    Logout,
    forgotPassword,
    signInWithGoogle,
    signInWithFacebook,
    EmailVerification,
    sendEmailLink,
    signInWithEmail,
    deleteUsers,
    loading,
    userType,
  };
  return (
      <AuthContext.Provider value={value}>
      {!loading && children}
      </AuthContext.Provider>
  );
};
