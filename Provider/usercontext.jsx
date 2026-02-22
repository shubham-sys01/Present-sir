"use client";
import { createContext } from "react";
import { useState } from "react";
export const usercontext = createContext();

const Userprovider = ({ children }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const setuser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  const getuser = () => {
    if (localStorage.getItem("user")) {
      const data = JSON.parse(localStorage.getItem("user"));
      setUsername(data.username);
      setEmail(data.email);
      return JSON.parse(localStorage.getItem("user"));
    }
    console.log("usernot found");
    return null;
  };

  const removeuser = () => {
    localStorage.removeItem("user");
  };
  return (
    <usercontext.Provider
      value={{ setuser, removeuser, getuser, username, email }}
    >
      {children}
    </usercontext.Provider>
  );
};

export default Userprovider;
