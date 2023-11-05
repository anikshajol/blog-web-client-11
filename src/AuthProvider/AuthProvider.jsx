import { createContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const auth = getAuth(app);

  const createUser = (email, password) => {
    setLoading(false);
    createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo = {
    name: " shajol",
    createUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
