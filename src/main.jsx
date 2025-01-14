import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Routes/Router";
import FormData from "./context/FormData";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FormData>
      <Router />
    </FormData>
  </StrictMode>
);
