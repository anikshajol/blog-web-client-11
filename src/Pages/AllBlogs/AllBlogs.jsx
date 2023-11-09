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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories", {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCategories(data);
      });
  }, []);
  console.log(selectedCategory);

  const { data, isLoading, error } = useQuery({
    queryKey: ["allBlogs", selectedCategory],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blogs?category=${selectedCategory}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  if (error) {
    console.error("Error fetching data:", error);
    // Handle the error or display an error message
  }

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

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchQuery(term);

    // Filter data based on the search term
    const filteredResults = data.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredResults);

    // console.log(filteredResults);
  };

  return (
    <div>
      {/*  select option for filtering by category and search by title */}
      <div className="max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 font-bold items-center">
        {/* filter */}
        <div>
          <label>
            Filter by Category:
            <select
              className="border border-gray-400 p-3 w-40 rounded-md outline-none"
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

        {/* search */}
        <div>
          <input
            type="search"
            name="search"
            className=" outline-none border border-gray-400 rounded-md  p-3"
            id="search"
            placeholder="Search Here..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {searchQuery
          ? searchResults?.map((blog, idx) => (
              <AllBlog key={idx} blog={blog}></AllBlog>
            ))
          : data?.map((blog, idx) => <AllBlog key={idx} blog={blog}></AllBlog>)}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllBlogs;
