import { Link, NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";

const Nav = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/add-blog"}>Add Blog</NavLink>
      </li>
      <li>
        <NavLink to={"/all-blog"}>All Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/featured-blog"}>Featured Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/wishlist"}> Wishlist</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">
            EpicExplorer Trips
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 text-lg">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user && <Link className="user-name">{user.displayName}</Link>}

          <div className="avatar mx-2">
            <div className="w-10 rounded-full">
              {/* <img src={user?.photoURL ? user?.photoURL : ""} /> */}
              {user && <img src={user?.photoURL} />}
            </div>
          </div>

          {!user ? (
            <div className="text-lg">
              <Link to={"/login"} className="nav-btn">
                Login
              </Link>
              <Link to={"/register"} className="nav-btn ml-4">
                Register
              </Link>
            </div>
          ) : (
            <Link onClick={handleLogOut} className="nav-btn">
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
