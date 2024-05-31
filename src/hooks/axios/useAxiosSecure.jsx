import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          await logout();
          navigate("/sign-in");
        }
        return Promise.reject(error);
      },
    );
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
