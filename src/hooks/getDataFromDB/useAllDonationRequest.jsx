import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useAllDonationRequest = (filterValue, postPerPage, currentPage) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allDonationRequest = [],
    isPending: isAllDonationRequestPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-donation-request", filterValue, postPerPage, currentPage],
    enabled: !!sessionStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/donation-requests?status=${filterValue}&postPerPage=${postPerPage}&currentPage=${currentPage}`,
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
