import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance as axios, setToken } from "../../utils/axios";

const initialState = {
  isLoading: false,
  isError: false,
  users: [],
  singleUser: null,
};

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  try {
    // const response = await axios.post(`${Backend_url}user/login`, data);
    const response = await axios.post(`user/login`, data);
    console.log(response.data);
    const { token } = response.data.data;
    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
    }
    if (response) {
      toast.success("Login successful");
      window.location.href = "/";
    }
    return response.data.data;
  } catch (error) {
    toast.error(error || "Something went wrong");
  }
});

export const getUser = createAsyncThunk("auth/getme", async (data) => {
  try {
    const response = await axios.get(`user/getme`, data);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.singleUser = action.payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
