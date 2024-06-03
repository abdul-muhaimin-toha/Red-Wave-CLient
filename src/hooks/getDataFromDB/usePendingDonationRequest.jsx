import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const usePendingDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: pendingDonationRequest = [],
    isPending: isPendingDonationRequestPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-donation-request"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/pending-donation-requests`);

      return response.data;
    },
  });

  return {
    pendingDonationRequest,
    isPendingDonationRequestPending,
    refetch,
    isError,
    error,
  };
};

export default usePendingDonationRequest;
