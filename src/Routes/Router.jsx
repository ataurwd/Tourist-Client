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
import UpateStorie from "../components/UpateStorie";
import AdminProfile from "./../dashboard/admin/AdminProfile";
import AddPackage from "./../dashboard/admin/AddPackage";
import AdminAddStories from "./../dashboard/admin/AdminAddStories";
import AdminAssigned from "./../dashboard/admin/AdminAssigned";
import AdminManageUser from "./../dashboard/admin/AdminManageUser";
import AdminStories from "./../dashboard/admin/AdminStories";
import ManageCandidate from "./../dashboard/admin/ManageCandidate";
import AdminRoute from "./AdminRoute";
import PackageDetails from "../../src/components/PackageDetails";
import GuideDetails from "../../src/components/GuideDetails";
import StripePayment from './../components/StripePayment';
import ErrorPage from "../components/ErrorPage";

const Router = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: () => fetch(`${import.meta.env.VITE_URL}/stories`,),
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
          path: "/pakage/details/:id",
          element: (
              <PackageDetails />
          ),
          loader: ({ params }) =>
            fetch(`${import.meta.env.VITE_URL}/package/${params.id}`),
        },
        {
          path: "/guide/:id",
          element: <GuideDetails />,
          loader: ({ params }) =>
            fetch(`${import.meta.env.VITE_URL}/users/${params.id}`),
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
      errorElement: <ErrorPage/>,
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        {
          path: "tourist-stories",
          element: (
            <UserRoute>
              <TouristStories />
            </UserRoute>
          ),
        },
        {
          path: "tourist-profile",
          element: (
            <UserRoute>
              <TouristProfile />
            </UserRoute>
          ),
        },
        {
          path: "tourist-bookings",
          element: (
            <UserRoute>
              <TouristBooking />
            </UserRoute>
          ),
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
        {
          path: "update/:id",
          element: <UpateStorie />,
          loader: ({params}) => (`${import.meta.env.VITE_URL}/stories/${params.id}`)
        },

        // for admin route
        {
          path: "admin-profile",
          element: (
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          ),
        },
        {
          path: "admin-add-package",
          element: (
            <AdminRoute>
              <AddPackage />
            </AdminRoute>
          ),
        },
        {
          path: "admin-add-story",
          element: (
            <AdminRoute>
              <AdminAddStories />
            </AdminRoute>
          ),
        },
        {
          path: "admin-assigned",
          element: (
            <AdminRoute>
              <AdminAssigned />
            </AdminRoute>
          ),
        },
        {
          path: "admin-manage-user",
          element: (
            <AdminRoute>
              <AdminManageUser />
            </AdminRoute>
          ),
          loader: () => fetch(`${import.meta.env.VITE_URL}/users`),
        },
        {
          path: "admin-story",
          element: (
            <AdminRoute>
              <AdminStories />
            </AdminRoute>
          ),
        },
        {
          path: "admin-manage-candidate",
          element: (
            <AdminRoute>
              <ManageCandidate />
            </AdminRoute>
          ),
        },
        {
          path: '/dashboard/tourist-bookings/:id',
          element: <StripePayment />,
          loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/guide-bookings/${params.id}`)
        }
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default Router;
