import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './../layout/Layout';
import Home from "../pages/home/Home";
import Login from "../user/Login";
import Register from "../user/Register";
import Dashboard from './../layout/Dashboard';

const Router = () => {
    const route = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                }
            ]
        },
        {
            path: 'dashboard',
            element: <Dashboard/>
        }
    ])
  return <RouterProvider  router={route}/>;
};

export default Router;
