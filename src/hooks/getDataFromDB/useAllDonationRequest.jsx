import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useAllDonationRequest = (filterValue) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allDonationRequest = [],
    isPending: isAllDonationRequestPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-donation-request", filterValue],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/donation-requests?status=${filterValue}`,
      );

      return response.data;
    },
  });

  return {
    allDonationRequest,
    isAllDonationRequestPending,
    refetch,
    isError,
    error,
  };
};

export default useAllDonationRequest;
