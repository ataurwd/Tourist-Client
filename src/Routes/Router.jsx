import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppLoading } from "../context/AppLoading";
import Loading from "../components/Loading";

// ── Eagerly load only structural layout components ──────────────────────────
import Layout from "./../layout/Layout";
import Dashboard from "./../layout/Dashboard";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import GuideRoute from "./GuideRoute";
import AdminRoute from "./AdminRoute";

// ── Lazy load every page / dashboard component ───────────────────────────────
const Home                    = lazy(() => import("../pages/home/Home"));
const Login                   = lazy(() => import("../user/Login"));
const Register                = lazy(() => import("../user/Register"));
const About                   = lazy(() => import("../pages/about/About"));
const Community               = lazy(() => import("./../pages/community/Community"));
const Trips                   = lazy(() => import("./../pages/trips/Trips"));
const Contact                 = lazy(() => import("../pages/contact/Contact"));
const PackageDetails          = lazy(() => import("../../src/components/PackageDetails"));
const GuideDetails            = lazy(() => import("../../src/components/GuideDetails"));
const StripePayment           = lazy(() => import("./../components/StripePayment"));

// Tourist dashboard
const TouristOverview         = lazy(() => import("../dashboard/TouristD/TouristOverview"));
const TouristAddStory         = lazy(() => import("../dashboard/TouristD/TouristAddStory"));
const TouristProfile          = lazy(() => import("./../dashboard/TouristD/TouristProfile"));
const TouristBooking          = lazy(() => import("./../dashboard/TouristD/TouristBooking"));
const TouristStories          = lazy(() => import("./../dashboard/TouristD/TouristStories"));
const JoinAsGuild             = lazy(() => import("../dashboard/TouristD/JoinAsGuild"));

// Guide dashboard
const GuideProfile            = lazy(() => import("../dashboard/guide/GuideProfile"));
const GuideAssigned           = lazy(() => import("./../dashboard/guide/GuideAssigned"));
const GuideAddStorie          = lazy(() => import("./../dashboard/guide/GuideAddStorie"));
const GuideMangeStory         = lazy(() => import("./../dashboard/guide/GuideMangeStory"));
const GuideAddPackage         = lazy(() => import("../dashboard/guide/GuideAddPackage"));
const GuideManagePackages     = lazy(() => import("../dashboard/guide/GuideManagePackages"));
const GuidePackageBookings    = lazy(() => import("../dashboard/guide/GuidePackageBookings"));
const UpateStorie             = lazy(() => import("../components/UpateStorie"));

// Admin dashboard
const AdminOverview           = lazy(() => import("../dashboard/admin/AdminOverview"));
const AdminProfile            = lazy(() => import("./../dashboard/admin/AdminProfile"));
const AddPackage              = lazy(() => import("./../dashboard/admin/AddPackage"));
const AdminAddStories         = lazy(() => import("./../dashboard/admin/AdminAddStories"));
const AdminAssigned           = lazy(() => import("./../dashboard/admin/AdminAssigned"));
const AdminManageUser         = lazy(() => import("./../dashboard/admin/AdminManageUser"));
const AdminStories            = lazy(() => import("./../dashboard/admin/AdminStories"));
const AdminAllStories         = lazy(() => import("./../dashboard/admin/AdminAllStories"));
const ManageCandidate         = lazy(() => import("./../dashboard/admin/ManageCandidate"));
const AdminManagePackages     = lazy(() => import("./../dashboard/admin/AdminManagePackages"));
const AdminManageGuidePackages = lazy(() => import("../dashboard/admin/AdminManageGuidePackages"));
const MessageDashboard        = lazy(() => import("../dashboard/MessageDashboard"));

// ── Fallback spinner shown while a lazy chunk loads ──────────────────────────
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <span className="loading loading-spinner loading-lg text-primary" />
  </div>
);

// Convenience wrapper so each route doesn't repeat Suspense boilerplate
const Lazy = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const Router = () => {
  const { isAppLoading } = useAppLoading();

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Lazy><Home /></Lazy>,
        },
        {
          path: "about-us",
          element: <Lazy><About /></Lazy>,
        },
        {
          path: "community",
          element: <Lazy><Community /></Lazy>,
        },
        {
          path: "contact",
          element: <Lazy><Contact /></Lazy>,
        },
        {
          path: "trips",
          element: (
            <PrivateRoute>
              <Lazy><Trips /></Lazy>
            </PrivateRoute>
          ),
        },
        {
          path: "/package/details/:id",
          element: <Lazy><PackageDetails /></Lazy>,
          loader: ({ params }) =>
            fetch(`${import.meta.env.VITE_URL}/package/${params.id}`),
        },
        {
          path: "/guide/:id",
          element: <Lazy><GuideDetails /></Lazy>,
          loader: ({ params }) =>
            fetch(`${import.meta.env.VITE_URL}/users/${params.id}`),
        },
        {
          path: "login",
          element: <Lazy><Login /></Lazy>,
        },
        {
          path: "register",
          element: <Lazy><Register /></Lazy>,
        },
      ],
    },
    {
      path: "dashboard",
      errorElement: <ErrorPage />,
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        // ── Tourist ────────────────────────────────────────────────────────
        {
          path: "tourist-stories",
          element: <UserRoute><Lazy><TouristStories /></Lazy></UserRoute>,
        },
        {
          path: "tourist-overview",
          element: <UserRoute><Lazy><TouristOverview /></Lazy></UserRoute>,
        },
        {
          path: "tourist-profile",
          element: <UserRoute><Lazy><TouristProfile /></Lazy></UserRoute>,
        },
        {
          path: "tourist-bookings",
          element: <UserRoute><Lazy><TouristBooking /></Lazy></UserRoute>,
        },
        {
          path: "tourist-add-story",
          element: <UserRoute><Lazy><TouristAddStory /></Lazy></UserRoute>,
        },
        {
          path: "tourist-guild",
          element: <UserRoute><Lazy><JoinAsGuild /></Lazy></UserRoute>,
        },
        {
          path: "messages",
          element: <PrivateRoute><Lazy><MessageDashboard /></Lazy></PrivateRoute>,
        },

        // ── Guide ──────────────────────────────────────────────────────────
        {
          path: "guide-profile",
          element: <GuideRoute><Lazy><GuideProfile /></Lazy></GuideRoute>,
        },
        {
          path: "guide-assigned",
          element: <GuideRoute><Lazy><GuideAssigned /></Lazy></GuideRoute>,
        },
        {
          path: "guide-add-story",
          element: <GuideRoute><Lazy><GuideAddStorie /></Lazy></GuideRoute>,
        },
        {
          path: "guide-manage-story",
          element: <GuideRoute><Lazy><GuideMangeStory /></Lazy></GuideRoute>,
        },
        {
          path: "guide-add-package",
          element: <GuideRoute><Lazy><GuideAddPackage /></Lazy></GuideRoute>,
        },
        {
          path: "guide-manage-packages",
          element: <GuideRoute><Lazy><GuideManagePackages /></Lazy></GuideRoute>,
        },
        {
          path: "guide-package-bookings",
          element: <GuideRoute><Lazy><GuidePackageBookings /></Lazy></GuideRoute>,
        },
        {
          path: "update/:id",
          element: <Lazy><UpateStorie /></Lazy>,
          loader: ({ params }) =>
            `${import.meta.env.VITE_URL}/stories/${params.id}`,
        },

        // ── Admin ──────────────────────────────────────────────────────────
        {
          path: "admin-profile",
          element: <AdminRoute><Lazy><AdminProfile /></Lazy></AdminRoute>,
        },
        {
          path: "overview",
          element: <AdminRoute><Lazy><AdminOverview /></Lazy></AdminRoute>,
        },
        {
          path: "admin-add-package",
          element: <AdminRoute><Lazy><AddPackage /></Lazy></AdminRoute>,
        },
        {
          path: "admin-manage-packages",
          element: <AdminRoute><Lazy><AdminManagePackages /></Lazy></AdminRoute>,
        },
        {
          path: "admin-manage-guide-packages",
          element: <AdminRoute><Lazy><AdminManageGuidePackages /></Lazy></AdminRoute>,
        },
        {
          path: "admin-add-story",
          element: <AdminRoute><Lazy><AdminAddStories /></Lazy></AdminRoute>,
        },
        {
          path: "admin-assigned",
          element: <AdminRoute><Lazy><AdminAssigned /></Lazy></AdminRoute>,
        },
        {
          path: "admin-manage-user",
          element: <AdminRoute><Lazy><AdminManageUser /></Lazy></AdminRoute>,
          loader: () => fetch(`${import.meta.env.VITE_URL}/users`),
        },
        {
          path: "admin-story",
          element: <AdminRoute><Lazy><AdminStories /></Lazy></AdminRoute>,
        },
        {
          path: "admin-all-stories",
          element: <AdminRoute><Lazy><AdminAllStories /></Lazy></AdminRoute>,
        },
        {
          path: "admin-manage-candidate",
          element: <AdminRoute><Lazy><ManageCandidate /></Lazy></AdminRoute>,
        },
        {
          path: "/dashboard/tourist-bookings/:id",
          element: <Lazy><StripePayment /></Lazy>,
          loader: ({ params }) =>
            fetch(`${import.meta.env.VITE_URL}/guide-bookings/${params.id}`),
        },
      ],
    },
  ]);

  return (
    <>
      {isAppLoading && <Loading fullScreen={true} />}
      <RouterProvider router={route} />
    </>
  );
};

export default Router;
