import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useTotalDonationRequest = (filter) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: totalDonationRequest = 0,
    isPending: isTotalDonationRequestPending,
    refetch: refetchTotal,
    isError,
    error,
  } = useQuery({
    queryKey: ["total-donation-request", filter],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/total-donation-requests?status=${filter}`,
      );

      return response.data.total;
    },
  });

  return {
    totalDonationRequest,
    isTotalDonationRequestPending,
    refetchTotal,
    isError,
    error,
  };
};

export default useTotalDonationRequest;
