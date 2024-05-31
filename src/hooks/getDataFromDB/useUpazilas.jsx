import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useUpazilas = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: upazilas = [],
    isPending: isUpazilasPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const response = await axiosSecure.get("/upazilas");

      return response.data;
    },
  });

  return { upazilas, isUpazilasPending, refetch, isError, error };
};

export default useUpazilas;
