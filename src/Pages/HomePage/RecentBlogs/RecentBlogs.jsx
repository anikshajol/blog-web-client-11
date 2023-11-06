import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingSkeleton from "../../../Spinner/LoadingSkeleton";
import RecentBlog from "./RecentBlog";
// import Skeleton from "react-loading-skeleton";

const RecentBlogs = () => {
  //   const [recentBlogs, setRecentBlogs] = useState([]);
  //   const { loading } = useContext(AuthContext);

  //   useEffect(() => {
  //     axios.get("data.json").then((res) => {
  //       console.log(res.data);
  //     });
  //   }, []);

  const { isLoading, data: recentBlogs } = useQuery({
    queryKey: ["recentBlogs"],
    queryFn: async () => {
      const res = await axios.get("/data.json");
      return res.data;
    },
  });
  if (isLoading) {
    const skeleton = Array.from({ length: 6 });
    return (
      <div className=" max-w-7xl mx-auto gap-4  grid grid-cols-3">
        {skeleton.map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  console.log(recentBlogs);

  return (
    <div className=" max-w-7xl mx-auto gap-4 grid grid-cols-3">
      {recentBlogs.map((recentBlog, idx) => (
        <RecentBlog key={idx} recentBlog={recentBlog}></RecentBlog>
      ))}
    </div>
  );
};

export default RecentBlogs;
