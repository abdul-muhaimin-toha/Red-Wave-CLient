import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";

const useDistricts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: districts = [],
    isPending: isDistrictsPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await axiosPublic.get("/districts");

      return response.data;
    },
  });

  return { districts, isDistrictsPending, refetch, isError, error };
};

export default useDistricts;
