import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Nav = () => {
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
      <li>
        <NavLink to={"/register"}> Register</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}> Login </NavLink>
      </li>
    </>
  );

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
          <a className="btn btn-ghost normal-case text-xl">AWS Blog</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 text-lg">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {/* {user && <Link className="user-name">{user.displayName}</Link>} */}

          {/* <div className="avatar mx-2">
            <div className="w-10 rounded-full">
              <img src={user?.photoURL ? user?.photoURL : ""} />
            </div>
          </div> */}

          {/* {!user ? (
            <Link to={"/login"} className="nav-btn">
              Login
            </Link>
          ) : (
            <Link onClick={handleLogOut} className="nav-btn">
              Logout
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
