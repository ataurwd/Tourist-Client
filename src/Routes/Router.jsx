import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './../layout/Layout';
import Home from "../pages/home/Home";

const Router = () => {
    const route = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home/>
                }
            ]
        }
    ])
  return <RouterProvider  router={route}/>;
};

export default Router;
