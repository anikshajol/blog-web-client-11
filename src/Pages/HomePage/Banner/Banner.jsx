import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";

const Banner = () => {
  const { user } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    >
      <div
        className="hero max-h-screen mb-10"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/hy8nt88/travel-concept-with-landmarks.jpg)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Enjoy Our Blog and know different places. Share your experiences
              exploring different countries, cultures, and hidden gems. Include
              travel tips, itineraries, and stunning photography.
            </p>
            {!user && (
              <Link to={"/register"}>
                <button className="btn btn-primary">Get Started</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
