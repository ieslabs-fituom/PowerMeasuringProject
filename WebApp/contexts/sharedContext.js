import React, { createContext, useState, useEffect } from 'react';

export const SharedContext = createContext();

export const SharedContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(-1);
    const [email, setEmail] = useState('d@d.com');

    useEffect(() => {
      alert("USER ID" + userId)
    }, [userId]);

    return (
        <SharedContext.Provider value={{ userId, setUserId, email, setEmail}}>
          {children}
        </SharedContext.Provider>
      );
};