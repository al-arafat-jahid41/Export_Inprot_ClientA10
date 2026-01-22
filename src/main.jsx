import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./Routes/Routes";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthProvider";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./Context/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" reverseOrder={false} />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  // </StrictMode>,
);
