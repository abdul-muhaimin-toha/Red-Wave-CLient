import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useAllBlogs = (filterValue) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allBlogs = [],
    isPending: isAllBlogsPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-blogs", filterValue],
    queryFn: async () => {
      const response = await axiosSecure.get(`/blogs?status=${filterValue}`);

      return response.data;
    },
  });

  return { allBlogs, isAllBlogsPending, refetch, isError, error };
};

export default useAllBlogs;
