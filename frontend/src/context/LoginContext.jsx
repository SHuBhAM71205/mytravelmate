import React, { createContext, useContext, useState, useEffect } from "react";
import { getFromLS, saveToLS } from "../utils/localStorageUtils";


const loginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(getFromLS("loginStatus") || false);

    useEffect(() => {
        saveToLS("loginStatus", loginStatus);
    }, [loginStatus]);

    const logout = () => {
        setLoginStatus(false);
        saveToLS("loginStatus", false);
    };

    const login = () => {
        setLoginStatus(true);
        saveToLS("loginStatus", true);
    };
    
    return (
        <loginContext.Provider
            value={{
                loginStatus,
                setLoginStatus,
                login,
                logout
            }}
        >
            {children}
        </loginContext.Provider>
    );
};

export const useLoginContext = () => useContext(loginContext);