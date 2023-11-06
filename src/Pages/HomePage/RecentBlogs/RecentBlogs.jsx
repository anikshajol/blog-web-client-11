import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingSkeleton from "../../../Spinner/LoadingSkeleton";
import RecentBlog from "./RecentBlog";

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
    return <LoadingSkeleton></LoadingSkeleton>;
  }

  console.log(recentBlogs);

  return (
    <div className=" max-w-7xl mx-auto  grid grid-cols-3">
      {recentBlogs.map((recentBlog, idx) => (
        <RecentBlog key={idx} recentBlog={recentBlog}></RecentBlog>
      ))}
    </div>
  );
};

export default RecentBlogs;
