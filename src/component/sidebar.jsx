import { Stack } from "@mui/material";
import React from "react";
import Menu from "./Menu";

const Sidebar = () => {
  return (
    <div className="border-2 border-black  min-h-screen w-52">
      <Stack padding={2}>
        <Menu />
      </Stack>
    </div>
  );
};

export default Sidebar;
