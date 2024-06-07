import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useTotalDonationRequestForUser = (userEmail, filter) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: totalDonationRequestForUser = 0,
    isPending: isTotalDonationRequestForUserPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["total-donation-request-for-user", userEmail, filter],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/total-donation-request-for-user/${userEmail}?status=${filter}`,
      );

      return response.data.total;
    },
  });

  return {
    totalDonationRequestForUser,
    isTotalDonationRequestForUserPending,
    refetch,
    isError,
    error,
  };
};

export default useTotalDonationRequestForUser;
