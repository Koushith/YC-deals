import React from "react";
import { Header, Navbar } from "./components";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
