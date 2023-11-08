import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Wishlist = () => {
  const { user } = useAuth();
  // const [wishList, setWishList] = useState([]);

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

  console.log(data);

  return (
    <div>
      <h2>Wishlist</h2>
    </div>
  );
};

export default Wishlist;
