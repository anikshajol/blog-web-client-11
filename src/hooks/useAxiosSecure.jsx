import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "https://blog-server-side.vercel.app",
  baseURL: "https://blog-server-side.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
