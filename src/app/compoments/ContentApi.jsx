"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContent = createContext();

export const ContentApi = ({ children }) => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const GetsavedId = localStorage.getItem("currentUser"); // localStorage se user id get ki 
    if (GetsavedId) {
      setUserId(GetsavedId); // agr id ho tu state me set kardo
    }
  });
  return (
    <UserContent.Provider value={{ userId, setUserId }}>
      {children}
    </UserContent.Provider>
  );
};

export const useUser = () => useContext(UserContent);
