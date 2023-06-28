import React, { useEffect } from "react";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import amplitude from "amplitude-js";

export const App = () => {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_AMPLITUDE_API_KEY || "";
    console.log(apiKey);
    amplitude.getInstance().init(apiKey);
    amplitude.getInstance().logEvent("Website Opened");

    return () => {
      amplitude.getInstance().regenerateDeviceId();
    };
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
