import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div
        className="hero max-h-screen"
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
    </div>
  );
};

export default Banner;
