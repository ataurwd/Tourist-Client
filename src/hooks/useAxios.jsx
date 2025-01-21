import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";

export const myAxios = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});

const useAxios = () => {
  const { logoutUser } = useContext(FormContext);
  const navigate = useNavigate();

  useEffect(() => {
    myAxios.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          // logout need to login
          logoutUser();
          navigate("/login");
        }
      }
    );
  }, [logoutUser, navigate]);
  return myAxios;
};

export default useAxios;