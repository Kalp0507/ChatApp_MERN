import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const Initail_state = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

const AuthContext = createContext(Initail_state)
export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, Initail_state);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
            {children}
        </AuthContext.Provider>
    );
};