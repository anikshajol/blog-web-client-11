import "react-loading-skeleton/dist/skeleton.css";
import LoadingSkeleton from "../../../Spinner/LoadingSkeleton";
import RecentBlog from "./RecentBlog";
import { motion } from "framer-motion";

import useAuth from "../../../hooks/useAuth";

import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import axios from "axios";

// import Skeleton from "react-loading-skeleton";

const RecentBlogs = () => {
  // const axiosSecure = useAxios();
  const axiosPublic = useAxiosPublic();

  // const [recentBlogs, setRecentBlogs] = useState([]);
  const { loading } = useAuth();
  // console.log(loading);

  // useEffect(() => {
  //   axios.get("https://blog-server-side-6sjw9q7nf-anikshajol.vercel.app/blogs/recent-post").then((res) => {
  //     setRecentBlogs(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axiosSecure.get("/blogs/recent-post").then((res) => {
  //     setRecentBlogs(res.data);
  //   });
  // }, [axiosSecure]);

  const { data: blogsRecent } = useQuery({
    queryKey: ["recentBlogs"],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get("/blogs/recent-post");
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  // useEffect(() => {
  //   fetch("https://blog-server-side-6sjw9q7nf-anikshajol.vercel.app/blogs")
  //     .then((res) => res.json())
  //     .then((data) => setRecentBlogs(data));
  // }, []);

  // console.log(recentBlogs);

  if (loading) {
    const skeleton = Array.from({ length: 6 });
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className=" max-w-7xl py-10 mx-auto gap-4  grid grid-cols-3"
      >
        {skeleton.map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  console.log(blogsRecent);

  return (
    <div className=" max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogsRecent?.map((recentBlog, idx) => (
        <RecentBlog key={idx} recentBlog={recentBlog}></RecentBlog>
      ))}
    </div>
  );
};

export default RecentBlogs;
