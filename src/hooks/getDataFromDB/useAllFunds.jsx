import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useAllFunds = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allFunds = [],
    isPending: isAllFundsPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-funds"],
    queryFn: async () => {
      const response = await axiosSecure.get("/funds");

      return response.data;
    },
  });

  return { allFunds, isAllFundsPending, refetch, isError, error };
};

export default useAllFunds;
