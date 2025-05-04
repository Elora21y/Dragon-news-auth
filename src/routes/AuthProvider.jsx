import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase-init';
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true)

    const createUser = (email,password) =>{
        setLoading(true)
     return  createUserWithEmailAndPassword(auth,email,password)

    }

    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

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

    console.log(user, loading)

    const logout = () =>{ 
        setLoading(true)
        return signOut(auth)
    }

    const userInfo = {
        createUser,
        loginUser,
        logout,
        user,
        setUser,
        loading
    }
    return (
        <div>
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;