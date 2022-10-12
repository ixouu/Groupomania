import React from "react";
import { Navigate } from "react-router-dom";
import { accountServices } from "./services/accountServices";

const AuthGuard = ({ children }) => {
  if (!accountServices.isLog()) {
    return <Navigate to="/unauthorized" />
  }
  return children
}


export default AuthGuard