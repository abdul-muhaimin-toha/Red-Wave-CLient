import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useDistricts = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: districts = [],
    isPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await axiosSecure.get("/districts");

      return response.data;
    },
  });

  return { districts, isPending, refetch, isError, error };
};

export default useDistricts;
