import { useQuery } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";
import useAxiosSecure from "../axios/useAxiosSecure";

const useRole = () => {
  const { user, isLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole = "", isLoading: isUserRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !isLoading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data.role;
    },
  });

  return { userRole, isUserRoleLoading };
};

export default useRole;
