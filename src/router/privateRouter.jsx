import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ element }) => {
  const { logged, currentUser } = useSelector((state) => state.auth);
  if (!logged) {
    return <Navigate to="/login" />;
  }
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return element;
};
