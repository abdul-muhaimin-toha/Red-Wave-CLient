import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";

const usePendingDonationRequest = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: pendingDonationRequest = [],
    isPending: isPendingDonationRequestPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-donation-request"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/pending-donation-requests`);

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
