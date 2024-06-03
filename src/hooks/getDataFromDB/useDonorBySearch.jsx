import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../axios/useAxiosPublic";

const useDonorBySearch = (
  selectedBloodGroup,
  selectedDistrict,
  selectedUpazila,
) => {
  const axiosPublic = useAxiosPublic();

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
      const response = await axiosPublic.get(
        `/users-by-search?bloodGroup=${selectedBloodGroup}&district=${selectedDistrict}&upazila=${selectedUpazila}`,
      );

      return response.data;
    },
  });

  return { allDonor, isAllDonorPending, refetch, isError, error };
};

export default useDonorBySearch;
