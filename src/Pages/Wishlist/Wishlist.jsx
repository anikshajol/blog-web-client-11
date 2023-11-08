import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/wishlist?email=${user.email}`
        );

        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  const [wishList, setWishList] = useState(data);

  const handleDelete = (_id) => {
    console.log(_id);
    axios.delete(`http://localhost:5000/wishlist/${_id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        toast.success("Deleted!", "Your file has been deleted.", "success");
      }
    });

    const remaining = wishList.filter((list) => list._id !== _id);
    setWishList(remaining);
  };

  console.log(data);
  // const { email, image, title, _id } = data;

  return (
    <div>
      <h2 className="text-center text-3xl ">My Wishlist</h2>
      <div>
        <div className="overflow-x-auto w-3/4 mx-auto">
          {wishList?.map((list) => (
            <>
              <table className="table">
                {/* head */}

                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={list?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{list?.title}</td>
                    <td>{list?.category}</td>
                    <th>
                      <div className="">
                        <Link to={`/blog-details/${list.blog_id}`}>
                          <button className="btn btn-primary rounded-xl">
                            Details
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDelete(list._id)}
                          className="btn btn-error rounded-xl"
                        >
                          Remove from wishlist
                        </button>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
