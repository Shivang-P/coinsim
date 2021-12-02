import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, firestore } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, password) {
        const data = await auth.createUserWithEmailAndPassword(email, password)
        const { user } = data

        if(!user) return;

        const userRef = firestore.doc(`users/${user.uid}`)

        const snapshot = await userRef.get()

        if(!snapshot.exists) {
            const cash = 10000
            const holdings = {}

            try {
                userRef.set({
                    cash: cash,
                    holdings: holdings,
                    createdAt: new Date()
                })
            } catch(error) {
                console.log('Error in creating user', error)
            }
        }
        
        return data
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => { //onAuthStateChanged returns a method that lets us unsubscribe.
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

