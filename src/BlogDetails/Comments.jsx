import PropTypes from "prop-types";

import { FaQuoteRight } from "react-icons/fa";

const Comments = ({ userComment }) => {
  console.log(Object.keys(userComment).join(","));

  const { _id, blog_id, userEmail, userPhoto, userName, comment } = userComment;

  return (
    <div className="my-6 border border-red-400 p-4">
      <figure className="max-w-screen-md mx-auto text-center">
        <div className="flex justify-center">
          <FaQuoteRight className="text-center" />
        </div>

        <blockquote>
          <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
            {comment}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3">
          <img
            className="w-6 h-6 rounded-full"
            src={userPhoto}
            alt="profile picture"
          />
          <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite className="pr-3 font-medium text-gray-900 dark:text-white">
              {userName}
            </cite>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

Comments.propTypes = {
  userComment: PropTypes.object,
};

export default Comments;
