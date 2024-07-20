import React, {useState, createContext, useEffect, useContext } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  } from 'firebase/auth';



// creating context

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
  };

// Provide Context

export const AuthProvider =({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
    };

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
    };

  const setupRecaptcha = (containerId) => {
   window.recaptchaVerifier = new RecaptchaVerifier(containerId, {
      'size':'invisible',
      'callback': (response) => {
      console.log("Recaptcha verified");
      }
      }, auth);
    };

  const loginWithPhone = (phoneNumber, appVerifier) => {
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  };

  const logout = () => {
    return signOut(auth);
    };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setLoading(false);
    });
    return unsubscribe;
    }, []);

    const value = {
      currentUser,
      signUpWithEmail,
      loginWithEmail,
      loginWithGoogle,
      setupRecaptcha,
      loginWithPhone,
      logout,
    };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
    );
};
