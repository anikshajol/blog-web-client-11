import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://blog-server-side-6sjw9q7nf-anikshajol.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
