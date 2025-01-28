import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BasicMenu from "../component/DropDownMenu";
import Sidebar from "../component/sidebar";
import { getUser } from "../redux/slice/authSlice";
import { setToken } from "../utils/axios";


const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.singleUser);

  useEffect(() => {
    if (token) {
      setToken(token);
      dispatch(getUser());
    }
  }, [token, dispatch]);

  //check auth user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex gap-2">
      <Sidebar />
      <div className="w-[90%]">
        <div className="flex justify-end p-2">
      <BasicMenu/>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
