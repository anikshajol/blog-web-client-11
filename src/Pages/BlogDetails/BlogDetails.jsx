import { Link, useLoaderData } from "react-router-dom";

import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Comments from "./Comments";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const BlogDetails = () => {
  const blog = useLoaderData();
  const axiosPublic = useAxiosPublic();

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

  const [comments, setComments] = useState([]);

  const handleAddComment = (e) => {
    e.preventDefault();
    console.log(e.target.comments.value);

    const comment = e.target.comments.value;
    const commentsData = {};
    commentsData.blog_id = _id;
    commentsData.userEmail = email;
    commentsData.userPhoto = photoURL;
    commentsData.userName = displayName;
    commentsData.comment = comment || "No Data";

    console.log(commentsData);

    axiosPublic.post(`/comments`, commentsData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Thanks for your comments");
        setComments([...comments, commentsData]);
        e.target.comments.value = "";
      }
    });
  };

  // const [comments, setComments] = useState([]);

  useEffect(() => {
    axiosPublic("/comments").then((res) => {
      console.log(res.data);
      const commentByMatch = res.data.filter(
        (comment) => comment.blog_id === blog._id
      );
      setComments(commentByMatch);
    });
  }, [axiosPublic, blog._id]);

  //   console.log(commentData);

  console.log(comments);
  // console.log(commentByMatch);

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
            {email === authorEmail && (
              <Link to={`/update/${_id}`}>
                <button className="btn btn-primary rounded-xl">Update</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* showing comments */}
      <div className="my-6  ">
        <h2 className="text-center text-xl">User Comments</h2>
        {comments.map((userComment, idx) => (
          <Comments key={idx} userComment={userComment}></Comments>
        ))}
      </div>
      {/* comments area */}
      {email === authorEmail ? (
        <div className="flex mt-5 justify-center items-center">
          <form onSubmit={handleAddComment}>
            <div>
              <textarea
                className="textarea textarea-primary text-center text-xl  w-96 outline-none"
                placeholder="Comments"
                name="comments"
                value={"Author can not comment on own blog"}
                disabled
              ></textarea>
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Comments"
                className="btn btn-primary"
                disabled
              />
            </div>
          </form>
        </div>
      ) : (
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
