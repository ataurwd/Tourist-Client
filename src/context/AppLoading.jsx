import React, { createContext, useContext, useState, useEffect } from "react";

const AppLoadingContext = createContext();

export const AppLoadingProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay to allow initial render
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 500); // 500ms delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLoadingContext.Provider value={{ isAppLoading, setIsAppLoading }}>
      {children}
    </AppLoadingContext.Provider>
  );
};

export const useAppLoading = () => {
  const context = useContext(AppLoadingContext);
  if (!context) {
    throw new Error("useAppLoading must be used within AppLoadingProvider");
  }
  return context;
};
