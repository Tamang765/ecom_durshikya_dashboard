import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/v1/api",
});
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data.message);
  }
);

export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
