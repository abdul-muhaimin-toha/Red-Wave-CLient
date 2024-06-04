import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "@/components/common/Loader";
import useRole from "@/hooks/getDataFromDB/useRole";

const AdminRoute = ({ children }) => {
  const { userRole, isUserRolePending } = useRole();

  if (isUserRolePending) return <Loader />;

  if (userRole === "admin") {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
