import { useQuery } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";
import useAxiosSecure from "../axios/useAxiosSecure";

const useRole = () => {
  const { user, isLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole = "", isPending: isUserRolePending } = useQuery({
    queryKey: ["role", user?.email],
    enabled:
      !isLoading && !!user?.email && !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data.role;
    },
  });

  return { userRole, isUserRolePending };
};

export default useRole;
