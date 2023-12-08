import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://blog-server-side-6sjw9q7nf-anikshajol.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
