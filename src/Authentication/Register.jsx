import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const { createUser } = useContext(AuthContext);

  // console.log(email, displayName, password, photo);

  const handleCreateUser = () => {
    // set validation password
    setError("");
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one uppercase letter");
    } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      setError("Password must contain at least one Special Character");
    } else if (!/.{6,}/.test(password)) {
      setError("Password must contain at least six Characters");
    } else {
      createUser(email, password, displayName, photo)
        .then((res) => {
          // console.log(res.user);

          updateProfile(res.user, {
            displayName: displayName,
            photoURL: photo,
          })
            .then(() => {
              toast.success("Account Registration Successfull!");
              // return signOut(auth); disable auto login after registration if need
              navigate("/");
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  // google sign in

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully Login With Your Google Account!");
        // window.reload();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="">
      <div className=" hero h-full  ">
        <div className="hero-overlay bg-black bg-opacity-90 "></div>
        <div className="w-full mx-auto max-w-sm p-4 bg-transparent  rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-6">
            <h5 className="text-xl font-medium text-white dark:text-white">
              Create an Account
            </h5>
            <div>
              <label
                htmlFor="photo"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                name="photo"
                onChange={(e) => setDisplayName(e.target.value)}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your Photo Url
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setPhoto(e.target.value)}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Set Your Photo URL"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleCreateUser}
              className="w-full btn primary-btn"
            >
              Create account
            </button>

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2 border border-[#ffbe30] btn-outline text-white rounded-3xl"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl">
                  <FcGoogle />
                </div>
                <div>Login With Google</div>
              </div>
            </button>
            <div className="text-sm text-center font-medium text-white dark:text-gray-300">
              Already Have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
            </div>
            {error ? (
              <p className=" font-bold text-red-400 text-center">{error}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
