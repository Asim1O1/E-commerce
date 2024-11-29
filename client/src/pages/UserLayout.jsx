import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";

const UserLayout = () => {
  return (
    <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
