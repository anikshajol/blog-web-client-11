import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../Spinner/LoadingSkeleton";
import { motion } from "framer-motion";
import AllBlog from "./AllBlog";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../Footer/Footer";

const AllBlogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const data = await fetch(`http://localhost:5000/blogs`);
      return data.json();
    },
  });

  console.log(data);
  if (isLoading) {
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

  return (
    <div>
      <div className=" max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((allBlog, idx) => (
          <AllBlog key={idx} recentBlog={allBlog}></AllBlog>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllBlogs;
