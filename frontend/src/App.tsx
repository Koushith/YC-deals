import React from "react";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
