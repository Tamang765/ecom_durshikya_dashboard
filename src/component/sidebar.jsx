import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="border-2 border-black  min-h-screen w-[10%]">
      <Stack padding={2}>
        <Link to={"/home"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/product"}>Product</Link>
        <Link to={"/"}>Order</Link>
      </Stack>
    </div>
  );
};

export default Sidebar;
