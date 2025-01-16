import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FormContext } from "../context/FormData";
import useUser from "../hooks/useUser";
import Loading from "../components/Loading";

const GuideRoute = ({ children }) => {
  const { user, loading: userLoading } = useContext(FormContext);
  const [loginUser, refetch, isLoading] = useUser();
  const location = useLocation();

  // Show a loading indicator if either user context or query is still loading
  if (userLoading || isLoading) {
    return <Loading />;
  }

  // If no user or their role doesn't match, redirect to login
  if (!user || loginUser?.role !== "guide") {
    if (!user) {
      toast.error("Please Login To See Details");
    }
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Render children if user is logged in and role is "tourist"
  return children;
};

export default GuideRoute;
