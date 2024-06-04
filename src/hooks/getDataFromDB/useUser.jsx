import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useUser = (userEmail) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: userFromDB = {},
    isPending: isUserFromDBPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userEmail],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${userEmail}`);

      return response.data;
    },
  });

  return { userFromDB, isUserFromDBPending, refetch, isError, error };
};

export default useUser;
