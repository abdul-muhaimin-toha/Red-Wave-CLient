import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "@/hooks/auth/useAuth";

const LoggedInRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace></Navigate>;
  }

  return children;
};

LoggedInRoute.propTypes = {
  children: PropTypes.node,
};

export default LoggedInRoute;
