import React, { createContext, useContext, useState, useEffect } from "react";
import { getFromLS, saveToLS } from "../utils/localStorageUtils";

const userContext = createContext();


export const userContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(getFromLS("userProfile") || null);
    const [token, setToken] = useState(getFromLS("token") || null);

    useEffect(() => {
        if (userProfile) {
            saveToLS("userProfile", userProfile);
        } else {
            saveToLS("userProfile", null);
        }
    }, [userProfile]);

    useEffect(() => {
        if (token) {
            saveToLS("token", token);
        } else {
            saveToLS("token", null);
        }
    }, [token]);

    // Login and logout helpers
    const login = (profile, jwt) => {
        setUserProfile(profile);
        setToken(jwt);
    };
    const logout = () => {
        setUserProfile(null);
        setToken(null);
    };

    return (
        <userContext.Provider
            value={{
                userProfile,
                setUserProfile,
                token,
                setToken,
                login,
                logout
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export const useUserContext = () => useContext(userContext);
