import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useTotalStats = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: totalStats = {},
    isPending: isTotalStatsPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["total-stats"],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(`/total-statistics`);

      return response.data;
    },
  });

  return { totalStats, isTotalStatsPending, refetch, isError, error };
};

export default useTotalStats;
