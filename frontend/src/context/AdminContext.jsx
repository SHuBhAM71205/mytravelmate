import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [adminToken, setAdminToken] = useState(null);

    const loginAdmin = (profile, token) => {
        setAdminProfile(profile);
        setAdminToken(token);
    };
    const logoutAdmin = () => {
        setAdminProfile(null);
        setAdminToken(null);
    };

    return (
        <AdminContext.Provider value={{ adminProfile, setAdminProfile, adminToken, setAdminToken, loginAdmin, logoutAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
