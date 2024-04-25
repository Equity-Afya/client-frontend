import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarSrc, setAvatarSrc] = useState("null");
  const [name, setName] = useState("");

  const userToken = localStorage.getItem('userToken');

  

  const uploadAvatar = async (formData) => {
    try {
      const response = await axios.post('https://0ec8-102-210-244-74.ngrok-free.app/api/patient/uploadProfileImages/37449211', formData, {
        headers: {
          'Authorization': 'Bearer ' + userToken,
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log("Response from server:", response.data);

      if (response.data && response.data.avatarSrcUrl) {
      setAvatarSrc(response.data.avatarSrcUrl);
      console.log("Avatar source updated, new value:", response.data.avatarSrcUrl);
    } else {
      console.error("avatarSrcImageUrl not found in response:", response.data);
    }
   }catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatarSrc', file);
    await uploadAvatar(formData);

    const reader = new FileReader();

    reader.onload = () => {
      console.log('FileReader Result:', reader.result); 
        setAvatarSrc(reader.result);
    };

    reader.readAsDataURL(file);
};
  
  return (
    <AvatarContext.Provider value={{ avatarSrc, setAvatarSrc, name, setName, handleAvatarChange }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
