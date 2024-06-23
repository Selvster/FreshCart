import React, { useContext } from "react";
import { authcontext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(authcontext);
  if (token === null) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return <>{children}</>;
}
