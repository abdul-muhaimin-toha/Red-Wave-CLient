import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";

const useRecentDonation = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: recentDonations = [],
    isPending: isRecentDonationPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["recent-donation"],
    queryFn: async () => {
      const response = await axiosPublic.get("/recent-donation-requests");

      return response.data;
    },
  });

  return { recentDonations, isRecentDonationPending, refetch, isError, error };
};

export default useRecentDonation;
