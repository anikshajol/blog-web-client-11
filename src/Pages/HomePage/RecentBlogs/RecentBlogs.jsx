import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingSkeleton from "../../../Spinner/LoadingSkeleton";
import RecentBlog from "./RecentBlog";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";

// import Skeleton from "react-loading-skeleton";

const RecentBlogs = () => {
  const axiosSecure = useAxios();
  //   const [recentBlogs, setRecentBlogs] = useState([]);
  //   const { loading } = useContext(AuthContext);

  //   useEffect(() => {
  //     axios.get("data.json").then((res) => {
  //       console.log(res.data);
  //     });
  //   }, []);

  const { isLoading, data: recentBlogs } = useQuery({
    queryKey: ["recentBlogs"],
    queryFn: () => {
      axiosSecure.get("/blogs").then((res) => {
        return res.data;
      });
    },
  });
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

  console.log(recentBlogs);

  return (
    <div className=" max-w-7xl mx-auto gap-4 grid grid-cols-3">
      {recentBlogs?.map((recentBlog, idx) => (
        <RecentBlog key={idx} recentBlog={recentBlog}></RecentBlog>
      ))}
    </div>
  );
};

export default RecentBlogs;
