import moment from "moment/moment";
import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AddBlog = () => {
  // const { axiosSecure } = useAxios();
  const { user } = useAuth();
  const handleAddBlogPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const authorEmail = form.email.value;
    const title = form.title.value || "No Data";
    const image = form.photo.value || "No Data";
    const short_description = form.shortDescription.value || "No Data";
    const long_description = form.longDescription.value || "No Data";
    const category = form.category.value || "No Data";

    const time = moment().format("MMMM Do YYYY, h:mm");
    const authorImage = user.photoURL;
    const blog = {
      title,
      image,
      short_description,
      long_description,
      category,
      time,
      authorEmail,
      authorImage,
    };
    console.log(blog);
    axios
      .post("https://blog-server-side.vercel.app/blogs", blog, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Data added Successfully");
          console.log(res.data);
        }
      });
  };

  const { data } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          "https://blog-server-side.vercel.app/categories",
          {
            withCredentials: true,
          }
        );
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto">
      <form onSubmit={handleAddBlogPost}>
        {/* layer 1 */}
        {/* user email */}
        <label className="input-group input-group-vertical ">
          <span className="">Your Email</span>
          <input
            type="email"
            name="email"
            placeholder="Input Short Description"
            defaultValue={user?.email}
            className=" input input-bordered"
            disabled
          />
        </label>
        <div className="flex flex-col md:flex-row my-5 justify-around gap-10">
          {/* add title */}
          <div className="w-1/2">
            <label className="input-group input-group-vertical">
              <span>Add Title</span>
              <input
                type="text"
                name="title"
                placeholder="Input title"
                className="input input-bordered  "
              />
            </label>
          </div>

          {/* input image url */}
          <div className="w-1/2">
            <label className="input-group input-group-vertical">
              <span>Add PhotoURL</span>
              <input
                type="text"
                name="photo"
                placeholder="Input PhotoURL"
                className="input input-bordered"
              />
            </label>
          </div>
        </div>

        {/* layer 2 */}
        <div className="flex flex-col md:flex-row gap-10 ">
          {/* add short Description */}
          <div className="w-1/2">
            <label className="input-group input-group-vertical">
              <span>Add Short Description</span>
              <input
                type="text"
                name="shortDescription"
                placeholder="Input Short Description"
                className="input input-bordered"
              />
            </label>
          </div>

          {/* Add Long Description */}
          <div className="w-1/2">
            <label className="input-group input-group-vertical">
              <span>Add Long Description</span>
              <input
                type="text"
                name="longDescription"
                placeholder="Input Long Description"
                className="input input-bordered"
              />
            </label>
          </div>
        </div>

        {/* layer 3 */}
        <div className="py-5">
          {/* category */}
          <div className="input-group">
            <select required className="select select-bordered" name="category">
              {data?.map((cat) => (
                <option key={cat._id}> {cat.name} </option>
              ))}
            </select>
            {/* <button className="btn">Go</button> */}
          </div>
        </div>

        {/* input submit */}

        <div className="text-center ">
          <input
            className="btn w-1/2 btn-primary "
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
