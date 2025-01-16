import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./../layout/Layout";
import Home from "../pages/home/Home";
import Login from "../user/Login";
import Register from "../user/Register";
import Dashboard from "./../layout/Dashboard";
import About from "../pages/about/About";
import Community from "./../pages/community/Community";
import Trips from "./../pages/trips/Trips";
import TouristAddStory from "../dashboard/TouristD/TouristAddStory";
import TouristProfile from "./../dashboard/TouristD/TouristProfile";
import TouristBooking from "./../dashboard/TouristD/TouristBooking";
import TouristStories from "./../dashboard/TouristD/TouristStories";
import JoinAsGuild from "../dashboard/TouristD/JoinAsGuild";
import UserRoute from "./UserRoute";
import GuideProfile from "../dashboard/guide/GuideProfile";
import PrivateRoute from "./PrivateRoute";
import GuideAssigned from "./../dashboard/guide/GuideAssigned";
import GuideAddStorie from "./../dashboard/guide/GuideAddStorie";
import GuideMangeStory from "./../dashboard/guide/GuideMangeStory";
import GuideRoute from "./GuideRoute";

const Router = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "about-us",
          element: <About />,
        },
        {
          path: "community",
          element: <Community />,
        },
        {
          path: "trips",
          element: <Trips />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        {
          path: "tourist-stories",
          element: <TouristStories />,
        },
        {
          path: "tourist-profile",
          element: <TouristProfile />,
        },
        {
          path: "tourist-bookings",
          element: <TouristBooking />,
        },
        {
          path: "tourist-add-story",
          element: (
            <UserRoute>
              <TouristAddStory />
            </UserRoute>
          ),
        },
        {
          path: "tourist-guild",
          element: (
            <UserRoute>
              <JoinAsGuild />
            </UserRoute>
          ),
        },

        // for guide dashboard menu
        {
          path: "guide-profile",
          element: (
            <GuideRoute>
              <GuideProfile />
            </GuideRoute>
          ),
        },
        {
          path: "guide-assigned",
          element: (
            <GuideRoute>
              <GuideAssigned />
            </GuideRoute>
          ),
        },
        {
          path: "guide-add-story",
          element: (
            <GuideRoute>
              <GuideAddStorie />
            </GuideRoute>
          ),
        },
        {
          path: "guide-manage-story",
          element: (
            <GuideRoute>
              <GuideMangeStory />
            </GuideRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default Router;
