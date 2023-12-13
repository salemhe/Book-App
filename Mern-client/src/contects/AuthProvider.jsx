import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config';
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();
const Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(Auth, email, password)
    }

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(Auth, googleProvider);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(Auth, email, password);
    }

     const logOut = () => {
        return signOut(Auth)
     }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(Auth, currentUser => {
            // console.log(currentUser)
            setUser(currentUser)
            setLoading(false);
        });
        return () => {
            return unSubscribe();

        }
    },  [])

    const authInfo = {
        user,
        createUser,
        loginWithGoogle,
        loading,
        login,
        logOut
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider