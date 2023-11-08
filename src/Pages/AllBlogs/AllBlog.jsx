import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoView } from "react-photo-view";

const AllBlog = ({ recentBlog: allBlog }) => {
  const { user } = useAuth();
  const { title, image, short_description, _id, category } = allBlog;

  // const [loading,setLoading] = useState(false)

  const handleAddToWishList = () => {
    const list = {};
    list.email = user.email;
    list.title = title;
    list.image = image;
    list.blog_id = _id;
    list.category = category;
    list.short_description = short_description;

    console.log(list);

    console.log("add to wishlist");
    axios.post(`http://localhost:5000/wishlist`, list).then((res) => {
      console.log(res.data);

      if (res.data.insertedId) {
        toast.success(`${title} added to your wishlist`);
      }
    });
  };

  return (
    <div>
      <div className="card card-compact h-[30rem] bg-base-100 shadow-xl">
        <figure>
          <PhotoView src={image}>
            <img src={image} alt={title} />
          </PhotoView>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{short_description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{category}</div>
          </div>
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
