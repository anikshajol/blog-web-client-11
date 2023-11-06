const AddBlog = () => {
  const handleAddBlogPost = (e) => {
    e.preventDefault();
    console.log();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <form onSubmit={handleAddBlogPost}>
        {/* layer 1 */}
        <div className="flex flex-col md:flex-row my-5 justify-around gap-10">
          {/* add title */}
          <div className="w-full">
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
          <div className="w-full">
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
        <div className="flex justify-around gap-10 ">
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

        {/* category */}
        <div className="py-5">
          <div className="input-group">
            <select className="select select-bordered">
              <option disabled selected>
                Pick category
              </option>
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
            <button className="btn">Go</button>
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
