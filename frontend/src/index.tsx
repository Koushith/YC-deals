import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./router/router.config";
import { AuthProvider } from "./context/auth-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routerConfig} />
    </AuthProvider>
  </React.StrictMode>
);
