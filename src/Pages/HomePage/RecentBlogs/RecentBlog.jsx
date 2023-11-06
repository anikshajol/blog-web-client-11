import PropTypes from "prop-types";
// import Skeleton from "react-loading-skeleton";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";

const RecentBlog = ({ recentBlog }) => {
  //   console.log(Object.keys(recentBlog).join(","));
  const { title, image, short_description } = recentBlog;
  const { loading } = useAuth();
  // const [loading,setLoading] = useState(false)
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={loading ? <Skeleton className="h-40" /> : image} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{short_description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Details</button>
            <button className="btn btn-primary">Wish</button>
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
