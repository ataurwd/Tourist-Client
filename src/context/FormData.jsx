import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import React, { createContext, useEffect, useState } from "react";
  import { auth } from './../firebase/firebase.init';
import axios from "axios";
import useAxios, { myAxios } from "../hooks/useAxios";

  export const FormContext = createContext(null);
  
const FormData = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    // register
    const handelRegisterUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // login user with email and password
    const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // logout user
    const logoutUser = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    //   for save user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser?.email) {
          await myAxios.post(
            `/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          ).then(res => {'login infor',console.log(res.data)})
          setUser(currentUser);
        } else {
          setUser(currentUser);
          await myAxios.get(`/logout`, { withCredentials: true }).then(res => {'logout infor',console.log(res.data)})     
        }
        setLoading(false);
      });
  
      return () => {
        return unsubscribe();
      };
    }, []);
  
    const obj = {
      googleLogin,
      handelRegisterUser,
      loginUser,
      logoutUser,
      user,
      setUser,
      loading,
      setLoading,
    };
  
    return <FormContext.Provider value={obj}>{children}</FormContext.Provider>;
  };
  
  export default FormData;