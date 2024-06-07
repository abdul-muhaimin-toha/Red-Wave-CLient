import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useDonationRequestforUser = (userEmail, filter, limit, currentPage) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: donationRequestForUser = [],
    isPending: isDonationRequestPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "donation-request-for-user",
      userEmail,
      limit,
      filter,
      currentPage,
    ],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/donation-requests-for-user/${userEmail}?limit=${limit}&status=${filter}&currentPage=${currentPage}`,
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
