import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";

const usePublishedBlogs = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: publishedBlogs = [],
    isPending: isPublishedBlogsPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/published-blogs`);
      return response.data;
    },
  });

  return { publishedBlogs, isPublishedBlogsPending, refetch, isError, error };
};

export default usePublishedBlogs;
