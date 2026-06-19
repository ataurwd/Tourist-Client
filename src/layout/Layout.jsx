import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import LiveChatWidget from "../components/LiveChatWidget";
import Loading from "../components/Loading";

const Layout = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      {/* Pushed down by navbar height (fixed top-0) */}
      <main className="flex-grow pt-24 pb-12">
        {isNavigating ? <Loading fullScreen={true} /> : <Outlet />}
      </main>
      <Footer />
      <LiveChatWidget adminEmail="ataurrahman24707@gmail.com" />
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Layout;
