import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Test from "../components/Try/Test";


const Layout = () => {
  return (
    <>
      <Navbar />
      {/* <Test /> */}
      <Outlet />
    </>
  );
};

export default Layout;
