import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://blog-server-side.vercel.app ",
  baseURL: "https://blog-server-side.vercel.app",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
