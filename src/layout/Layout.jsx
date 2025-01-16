import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/sidebar";

const Layout = () => {
  return (
    // <Stack direction={"row"}>
    <div className="flex  gap-2">
      <Sidebar />
      <div className="w-[90%]">
        <Outlet />
      </div>
    </div>
    // </Stack>
  );
};

export default Layout;
