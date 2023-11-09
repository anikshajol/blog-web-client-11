import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const UpdateBlogs = () => {
  const { user } = useAuth();

  const blog = useLoaderData();

  const {
    _id,
    title,
    image,
    short_description,
    long_description,
    category,
    // time,
    // authorEmail,
  } = blog;

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://blog-server-side.vercel.app/categories").then((res) => {
      const data = res.data;
      console.log(data);
      setCategories(data);
    });
  }, []);

  console.log(categories);

  const handleUpdateBlogPost = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const form = e.target;

    const title = form.title.value || "No Data";
    const image = form.photo.value || "No Data";
    const short_description = form.shortDescription.value || "No Data";
    const long_description = form.longDescription.value || "No Data";
    const category = form.category.value || "No Data";

    const updateBlog = {
      title,
      image,
      short_description,
      long_description,
      category,
    };

    axios
      .put(`https://blog-server-side.vercel.app/blogs/${_id}`, updateBlog)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("Update Successfully");
        }
      });
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleUpdateBlogPost}>
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
                  className="input input-bordered"
                  defaultValue={title}
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
                  defaultValue={image}
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
                  defaultValue={short_description}
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
                  defaultValue={long_description}
                />
              </label>
            </div>
          </div>

          {/* layer 3 */}
          <div className="py-5">
            {/* category */}
            <label htmlFor="category">Select a category:</label>
            <div className="input-group">
              <select
                className="select select-bordered"
                name="category"
                value={category}
              >
                {categories.map((cat) => (
                  <option defaultValue={cat.name} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* <div className="w-1/2 pr-5">
                <label className="input-group input-group-vertical">
                  <span>Add Category</span>
                  <input
                    type="text"
                    name="category"
                    placeholder="Input PhotoURL"
                    className="input input-bordered"
                    defaultValue={category}
                  />
                </label>
              </div> */}

              {/* <button className="btn">Go</button> */}
            </div>
          </div>

          {/* input submit */}

          <div className="text-center ">
            <input
              className="btn w-1/2 btn-primary "
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogs;
