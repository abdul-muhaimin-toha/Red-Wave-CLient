import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useAllBlogs = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allBlogs = [],
    isPending: isAllBlogsPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/blogs`);

      return response.data;
    },
  });

  return { allBlogs, isAllBlogsPending, refetch, isError, error };
};

export default useAllBlogs;
