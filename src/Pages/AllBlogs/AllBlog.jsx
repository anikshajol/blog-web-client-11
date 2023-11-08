import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const AllBlog = ({ recentBlog: allBlog }) => {
  //   console.log(Object.keys(recentBlog).join(","));
  const { title, image, short_description, _id } = allBlog;

  // const [loading,setLoading] = useState(false)

  const handleAddToWishList = () => {
    console.log("add to wishlist");
  };

  return (
    <div>
      <div className="card card-compact h-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{short_description}</p>
          <div className="card-actions justify-end">
            <Link to={`/blog-details/${_id}`}>
              <button className="btn btn-primary rounded-xl">Details</button>
            </Link>
            <button
              onClick={handleAddToWishList}
              className="btn btn-primary rounded-xl"
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AllBlog.propTypes = {
  recentBlog: PropTypes.object,
};

export default AllBlog;
