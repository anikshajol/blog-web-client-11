import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInWithGoogle, logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);
    logIn(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Login Successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle().then((res) => {
      console.log(res.user);
      toast.success("Successfully Sign in");
      navigate("/");
    });
  };
  return (
    <div>
      <div className=" hero h-full  ">
        <div className="hero-overlay bg-black bg-opacity-90 "></div>
        <div className="w-full mx-auto max-w-sm p-4 bg-transparent  rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-6">
            <h5 className="text-xl font-medium text-white dark:text-white">
              Login
            </h5>
            <form onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your email
                </label>
                <input
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
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <input type="submit" value="" />

              <input
                type="submit"
                className="w-full btn primary-btn mt-4 text-black"
                value="Login"
              />
            </form>
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
              If you Have no account?{" "}
              <Link
                to={"/register"}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Register
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

export default Login;
