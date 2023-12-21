import React, { createContext, useState } from 'react';

export const SharedContext = createContext();

export const SharedContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(1);
    const [email, setEmail] = useState('d@d.com');

    return (
        <SharedContext.Provider value={{ userId, setUserId, email, setEmail}}>
          {children}
        </SharedContext.Provider>
      );
};