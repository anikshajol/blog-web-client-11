// import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingSkeleton from "../../../Spinner/LoadingSkeleton";
import RecentBlog from "./RecentBlog";
import { motion } from "framer-motion";
// import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// import Skeleton from "react-loading-skeleton";

const RecentBlogs = () => {
  // const axiosSecure = useAxios();
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { loading } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:5000/blogs").then((res) => {
      setRecentBlogs(res.data);
    });
  }, []);

  // const { isLoading, data: recentBlogs } = useQuery({
  //   queryKey: ["recentBlogs"],
  //   queryFn: () => {
  //     axios.get("http://localhost:5000/blogs").then((res) => {
  //       return res.data;
  //     });
  //   },
  // });

  // useEffect(() => {
  //   fetch("http://localhost:5000/blogs")
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

  console.log(recentBlogs);

  return (
    <div className=" max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {recentBlogs?.map((recentBlog, idx) => (
        <RecentBlog key={idx} recentBlog={recentBlog}></RecentBlog>
      ))}
    </div>
  );
};

export default RecentBlogs;
