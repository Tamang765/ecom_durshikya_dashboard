import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../redux/slice/authSlice";
import { setToken } from "../utils/axios";

const AuthGuard = ({ children }) => {
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

  if (user) {
    return navigate("/");
  }

  return <>{children}</>;
};

export default AuthGuard;
