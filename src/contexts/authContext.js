import { createContext, useState } from "react";

export const authcontext = createContext();

export function Authprovider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <authcontext.Provider value={{ token, setToken }}>
      {children}
    </authcontext.Provider>
  );
}
