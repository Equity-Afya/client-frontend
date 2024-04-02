// AvatarContext.js

import React, { createContext, useState, useContext } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarSrc, setAvatarSrc] = useState("./src/assets/profilePhoto.jpg");
  const [fullName, setFullName] = useState("John Doe");

  return (
    <AvatarContext.Provider value={{ avatarSrc, setAvatarSrc, fullName, setFullName }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
