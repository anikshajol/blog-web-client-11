import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
const BlogDetails = () => {
  const blog = useLoaderData();
  //   const [commentData, setCommentData] = useState({});
  const { user } = useAuth();
  const { email, photoURL, displayName } = user;
  console.log(user);
  console.log(email);

  //   console.log(Object.keys(data).join(","));

  const {
    _id,
    title,
    image,
    short_description,
    long_description,
    // category,
    // time,
    authorEmail,
    // authorImage,
  } = blog;

  const handleAddComment = (e) => {
    e.preventDefault();
    console.log(e.target.comments.value);

    const comment = e.target.comments.value;
    const commentsData = {};
    commentsData.email = email;
    commentsData.photo = photoURL;
    commentsData.userName = displayName;
    commentsData.comment = comment || "No Data";

    console.log(commentsData);

    axios.post(`http://localhost:5000/comments`, commentsData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Thanks for your comments");
        e.target.comments.value = "";
      }
    });
  };

  //   console.log(commentData);

  return (
    <div>
      <div className="card card-compact h-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{short_description}</p>
          <p>{long_description}</p>

          {/*  */}
          <div className="card-actions justify-end">
            <Link to={`/blog-details/${_id}`}>
              <button className="btn btn-primary rounded-xl">Details</button>
            </Link>
            <button className="btn btn-primary rounded-xl">Wishlist</button>
          </div>
        </div>
      </div>

      {/* comments area */}
      {email !== authorEmail && (
        <div className="flex mt-5 justify-center items-center">
          <form onSubmit={handleAddComment}>
            <div>
              <textarea
                className="textarea textarea-primary  w-96 outline-none"
                placeholder="Comments"
                name="comments"
              ></textarea>
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Comments"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
