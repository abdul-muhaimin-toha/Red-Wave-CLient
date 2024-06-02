import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useAllUsers = (filterValue) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isPending: isAllUsersDataPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-users", filterValue],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users?status=${filterValue}`);

      return response.data;
    },
  });

  return { allUsers, isAllUsersDataPending, refetch, isError, error };
};

export default useAllUsers;
