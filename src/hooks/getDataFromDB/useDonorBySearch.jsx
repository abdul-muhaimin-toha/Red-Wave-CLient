import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useDonorBySearch = (
  selectedBloodGroup,
  selectedDistrict,
  selectedUpazila,
) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allDonor = [],
    isPending: isAllDonorPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "all-donors",
      selectedBloodGroup,
      selectedDistrict,
      selectedUpazila,
    ],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users-by-search?bloodGroup=${selectedBloodGroup}&district=${selectedDistrict}&upazila=${selectedUpazila}`,
      );

      return response.data;
    },
  });

  return { allDonor, isAllDonorPending, refetch, isError, error };
};

export default useDonorBySearch;
