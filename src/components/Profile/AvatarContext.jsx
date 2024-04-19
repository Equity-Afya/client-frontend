// AvatarContext.jsx

import React, { createContext, useState, useContext } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarSrc, setAvatarSrc] = useState("");
  const [name, setName] = useState("");

  return (
    <AvatarContext.Provider value={{ avatarSrc, setAvatarSrc, name, setName }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
