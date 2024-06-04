import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../axios/useAxiosPublic";

const useUpazilas = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: upazilas = [],
    isPending: isUpazilasPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const response = await axiosPublic.get("/upazilas");

      return response.data;
    },
  });

  return { upazilas, isUpazilasPending, refetch, isError, error };
};

export default useUpazilas;
