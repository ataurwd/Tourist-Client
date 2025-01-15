import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './../layout/Layout';
import Home from "../pages/home/Home";
import Login from "../user/Login";
import Register from "../user/Register";
import Dashboard from './../layout/Dashboard';
import About from "../pages/about/About";
import Community from './../pages/community/Community';
import Trips from './../pages/trips/Trips';
import TouristAddStory from "../dashboard/TouristD/TouristAddStory";
import TouristProfile from './../dashboard/TouristD/TouristProfile';
import TouristBooking from './../dashboard/TouristD/TouristBooking';
import TouristStories from './../dashboard/TouristD/TouristStories';
import JoinAsGuild from "../dashboard/TouristD/JoinAsGuild";

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
                    path: 'about-us',
                    element: <About/>
                },
                {
                    path: 'community',
                    element: <Community/>
                },
                {
                    path: 'trips',
                    element: <Trips/>
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                }
            ]
        },
        {
            path: 'dashboard',
            element: <Dashboard />,
            children: [
                {
                    path: 'tourist-stories',
                    element: <TouristStories/>
                },
                {
                    path: 'tourist-profile',
                    element: <TouristProfile/>
                },
                {
                    path: 'tourist-bookings',
                    element: <TouristBooking/>
                },
                {
                    path: 'tourist-add-story',
                    element: <TouristAddStory/>
                },
                {
                    path: 'tourist-guild',
                    element: <JoinAsGuild/>
                },
            ]
        }
    ])
  return <RouterProvider  router={route}/>;
};

export default Router;
