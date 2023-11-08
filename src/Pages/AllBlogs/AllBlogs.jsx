// Import necessary dependencies
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../Spinner/LoadingSkeleton";
import { motion } from "framer-motion";
import AllBlog from "./AllBlog";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import axios from "axios";

const AllBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); //

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/categories").then((res) => {
      const data = res.data;
      console.log(data);
      setCategories(data);
    });
  }, []);
  console.log(selectedCategory);

  const { data, isLoading } = useQuery({
    queryKey: ["allBlogs", selectedCategory],
    queryFn: async () => {
      const data = await fetch(
        `http://localhost:5000/blogs?category=${selectedCategory}`
      );
      return data.json();
    },
  });

  if (isLoading) {
    const skeleton = Array.from({ length: 6 });
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="max-w-7xl py-10 mx-auto gap-4 grid grid-cols-3"
      >
        {skeleton.map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  return (
    <div>
      {/*  select option for filtering by category */}
      <div className="max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 font-bold">
        <label>
          Filter by Category:
          <select
            className="border border-gray-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((blog, idx) => (
          <AllBlog key={idx} blog={blog}></AllBlog>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllBlogs;
