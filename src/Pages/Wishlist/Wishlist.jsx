import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Spinner from "../../Spinner/Spinner";

const Wishlist = () => {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://blog-server-side.vercel.app/wishlist?email=${user.email}`,
          { withCredentials: true }
        );
        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (!data || data.length === 0) {
    return <div>No items in wishlist</div>;
  }

  const handleDelete = (_id) => {
    console.log(_id);
    axios
      .delete(`https://blog-server-side.vercel.app/wishlist/${_id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          toast.success("Deleted!", "Your file has been deleted.", "success");
        }
        refetch();
      });
  };

  console.log(data);
  // const { email, image, title, _id } = data;

  return (
    <div>
      <h2 className="text-center text-3xl ">My Wishlist</h2>
      <div>
        <div className="overflow-x-auto w-3/4 mx-auto">
          {data?.map((list) => (
            <>
              <table key={list._id} className="table">
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
                    <td>{list.title}</td>
                    <td>{list.short_description}</td>
                    <td>{list.category}</td>
                    <th className="flex items-center">
                      <div className="">
                        <Link to={`/blog-details/${list.blog_id}`}>
                          <button className="btn btn-primary rounded-xl">
                            Details
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="text-center flex justify-center"
                          onClick={() => handleDelete(list._id)}
                          title="Remove from wishlist"
                        >
                          <MdDelete className="text-5xl text-red-600" />
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
