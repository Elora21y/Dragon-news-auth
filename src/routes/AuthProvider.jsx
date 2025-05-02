import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase-init';
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const createUser = (email,password) =>{
     return  createUserWithEmailAndPassword(auth,email,password)

    }

    const loginUser = (email, password)=>{
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
        })
        return () =>{
            unSubscribe()
        }
    },[])

    const logout = () =>{ 
        return signOut(auth)
    }

    const userInfo = {
        createUser,
        loginUser,
        logout,
        user,
        setUser
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