import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../redux/slice/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.singleUser);

  const [loginData, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // await axios.post("http://localhost:9000/v1/api/user/login", loginData);
      await dispatch(loginUser(loginData));
      //  window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <form
      className="flex flex-col gap-4 max-w-56 mx-auto"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email">Email</label>
      <input
        className="border-2 border-black pl-2"
        type="text"
        name="email"
        id="email"
        onChange={(e) =>
          setLogindata((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <label htmlFor="password">Password</label>
      <input
        className="border-2 border-black pl-2"
        type="password"
        name="password"
        id="password"
        required
        onChange={(e) =>
          setLogindata((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
