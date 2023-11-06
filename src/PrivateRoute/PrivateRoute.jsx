import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Spinner from "../Spinner/Spinner";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Spinner></Spinner>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} replace to={"/login"}></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
