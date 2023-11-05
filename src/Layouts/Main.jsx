import { Outlet } from "react-router-dom";
import Navbar from "../Pages/HomePage/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <div className="mb-4">
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
