import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Profile from "../pages/Profile";

const PrivateRoute = () => {
  const { currUser } = useSelector((state) => state.user);
  console.log(currUser);

  return currUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
