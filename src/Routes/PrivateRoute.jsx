import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FormContext } from "./../context/FormData";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(FormContext);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (user && user?.email) {
    return children;
  }
  if (!user) {
    toast.error("Please Login To See Details");
  }
  return <Navigate state={location.pathname} to="/login" />;
};
export default PrivateRoute;
