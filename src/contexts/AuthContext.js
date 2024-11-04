import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { auth } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth'


const AuthContext = createContext()

const initialState = { isAuthenticated: false, payload: { user: {} } }

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOGGED_IN":
            return { ...state, isAuthenticated: true, payload: { user: action.payload.user } }
        case "SET_LOGGED_OUT":
            return initialState
        default:
            return state
    }
}
export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // const uid = user.uid;
                dispatch({ type: "SET_LOGGED_IN", payload: { user } })
                // console.log("loggedin user id =>", uid)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)