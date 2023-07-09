import env from "@/config/env";
import axios from "axios";

const baseURL = env.BASE_URL;

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  // withCredentials: true,
});

export const axiosPrivateWithImage = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await refreshToken();
      axiosPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
      return axiosPrivate(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const axiosJwt = axios.create({ baseURL });
