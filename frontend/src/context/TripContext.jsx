import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [currentTrip, setCurrentTrip] = useState(null);
    const [tripStatus, setTripStatus] = useState(null);
    const [location, setLocation] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);

    return (
        <TripContext.Provider value={{ currentTrip, setCurrentTrip, tripStatus, setTripStatus, location, setLocation, chatMessages, setChatMessages }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTripContext = () => useContext(TripContext);
