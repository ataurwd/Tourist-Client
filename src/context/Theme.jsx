import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const Theme = ({ children }) => {
    const [theme, setTheme] = useState(
      localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const obj = {
      theme,
      toggleTheme,
    };
    return (
      <ThemeContext.Provider value={obj}>{children}</ThemeContext.Provider>
    );
  };

export default Theme;