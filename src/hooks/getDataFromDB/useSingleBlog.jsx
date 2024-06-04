import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";

const useSingleBlog = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singleBlog = {},
    isPending: isSingleBlogPending,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["single-blog", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/blogs/${id}`);

      return response.data;
    },
  });

  return {
    singleBlog,
    isSingleBlogPending,
    refetch,
    isError,
    error,
  };
};

export default useSingleBlog;
