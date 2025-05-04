import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase-init';
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true)
//signup
    const createUser = (email,password) =>{
        setLoading(true)
     return  createUserWithEmailAndPassword(auth,email,password)

    }
//login
    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
//observer
    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            if(currentUser){
                setUser(currentUser)
            }
            else{
                setUser(null)
            }
            setLoading(false)
        })
        return () =>{
            unSubscribe()
        }
    },[])

    // console.log(user, loading)
//logout
    const logout = () =>{ 
        setLoading(true)
        return signOut(auth)
    }

    //social login

    const socialLogin =(provider) => {
        setLoading(true)
        signInWithPopup(auth, provider)
    }

    const userInfo = {
        createUser,
        loginUser,
        logout,
        user,
        setUser,
        loading,
        socialLogin
    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;