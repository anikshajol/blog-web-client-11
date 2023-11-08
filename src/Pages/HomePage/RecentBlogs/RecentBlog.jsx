import PropTypes from "prop-types";
import { PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
// import Skeleton from "react-loading-skeleton";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const RecentBlog = ({ recentBlog }) => {
  //   console.log(Object.keys(recentBlog).join(","));
  const { title, image, short_description, _id } = recentBlog;

  // const [loading,setLoading] = useState(false)

  const handleAddToWishList = () => {
    console.log("add to wishlist");
  };

  return (
    <div>
      <div className="card card-compact h-96 bg-base-100 shadow-xl">
        <figure>
          <PhotoView src={image}>
            <img src={image} alt={title} />
          </PhotoView>
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

RecentBlog.propTypes = {
  recentBlog: PropTypes.object,
};

export default RecentBlog;
