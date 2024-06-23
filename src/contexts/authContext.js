import { createContext, useState } from "react";

export const authcontext = createContext();

export function Authprovider({ children }) {
  const [token, setToken] = useState(null);

  return (
    <authcontext.Provider value={{ token, setToken }}>
      {children}
    </authcontext.Provider>
  );
}
