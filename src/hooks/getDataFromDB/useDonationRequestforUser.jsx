import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useDonationRequestforUser = (userEmail, filter, limit) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: donationRequestForUser = [],
    isPending: isDonationRequestPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["donation-request-for-user", userEmail, limit, filter],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/donation-requests/${userEmail}?limit=${limit}&status=${filter}`,
      );

      return response.data;
    },
  });

  return {
    donationRequestForUser,
    isDonationRequestPending,
    refetch,
    isError,
    error,
  };
};

export default useDonationRequestforUser;
