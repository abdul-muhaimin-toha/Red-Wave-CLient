import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useTotalUsers = (filter) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: totalUsers = 0,
    isPending: isTotalUsersPending,
    refetch: refetchTotal,
    isError,
    error,
  } = useQuery({
    queryKey: ["total-users", filter],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(`/total-users?status=${filter}`);

      return response.data.total;
    },
  });

  return {
    totalUsers,
    isTotalUsersPending,
    refetchTotal,
    isError,
    error,
  };
};

export default useTotalUsers;
