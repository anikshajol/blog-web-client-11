import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataTable from "react-data-table-component";
import Spinner from "../../Spinner/Spinner";
import Footer from "../Footer/Footer";

const FeaturedBlogs = () => {
  const { data: blogData, isLoading } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://blog-server-side.vercel.app/blogs",
          {
            withCredentials: true,
          }
        );

        console.log(response.data);
        const sortedBlogs = response.data.sort(
          (a, b) => a.long_description.length - b.long_description.length
        );
        const top10Blogs = sortedBlogs.slice(0, 10);
        return top10Blogs;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  console.log(blogData);

  const columns = [
    {
      name: "SL",
      selector: (blogData, index) => index + 1,
    },
    {
      name: "Title",
      selector: (blogData) => blogData.title,
    },
    {
      name: "Blog Owner",
      selector: (blogData) => blogData.authorEmail,
    },

    {
      name: "Photo",
      selector: (blogData) => (
        <div className="avatar">
          <div className="w-24 rounded-full">
            {blogData.authorImage ? (
              <img src={blogData.authorImage} />
            ) : (
              <p className="text-center py-2">No Image</p>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Featured Blogs</h2>
      <div className="w-9/12 mx-auto">
        <DataTable columns={columns} data={blogData} />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FeaturedBlogs;
