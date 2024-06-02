import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useSingleDonationRequest = (id) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: donationRequestSingle = {},
    isPending: isDonationRequestSinglePending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["donation-req-single", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/donation-request-single/${id}`);

      return response.data;
    },
  });

  return {
    donationRequestSingle,
    isDonationRequestSinglePending,
    refetch,
    isError,
    error,
  };
};

export default useSingleDonationRequest;
