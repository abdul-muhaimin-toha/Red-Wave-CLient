import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "@/components/common/Loader";
import useAuth from "@/hooks/auth/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/sign-in" replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
