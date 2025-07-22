import React, { createContext, useContext, useState, useEffect } from "react";
import { getFromLS, saveToLS } from "../utils/localStorageUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getFromLS("token") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            saveToLS("token", token);
            setIsAuthenticated(true);
        } else {
            saveToLS("token", null);
            setIsAuthenticated(false);
        }
    }, [token]);

    const login = (jwt) => {
        setToken(jwt);
    };
    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
