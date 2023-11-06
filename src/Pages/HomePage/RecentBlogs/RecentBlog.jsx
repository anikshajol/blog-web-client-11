import PropTypes from "prop-types";

const RecentBlog = ({ recentBlog }) => {
  //   console.log(Object.keys(recentBlog).join(","));
  const { title, image, short_description } = recentBlog;
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{short_description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

RecentBlog.propTypes = {
  recentBlog: PropTypes.object,
};

export default RecentBlog;
