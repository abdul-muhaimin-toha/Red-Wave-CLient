import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useAllUsers = (filterValue, postPerPage, currentPage) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isPending: isAllUsersDataPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-users", filterValue, postPerPage, currentPage],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users?status=${filterValue}&postPerPage=${postPerPage}&currentPage=${currentPage}`,
      );

      return response.data;
    },
  });

  return { allUsers, isAllUsersDataPending, refetch, isError, error };
};

export default useAllUsers;
