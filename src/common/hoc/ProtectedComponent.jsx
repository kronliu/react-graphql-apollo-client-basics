import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export const ProtectedComponent = ({ component: Component }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <Component />;
};
