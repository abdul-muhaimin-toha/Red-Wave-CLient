import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "@/components/common/Loader";
import useRole from "@/hooks/getDataFromDB/useRole";

const AdminAndVolunteerRoute = ({ children }) => {
  const { userRole, isUserRolePending } = useRole();

  if (isUserRolePending) return <Loader />;

  if (userRole === "admin" || userRole === "volunteer") {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

AdminAndVolunteerRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminAndVolunteerRoute;
