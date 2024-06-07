import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://red-wave-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
