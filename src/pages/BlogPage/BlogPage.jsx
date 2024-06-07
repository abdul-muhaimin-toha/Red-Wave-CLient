import BlogPageCard from "@/components/common/BlogPage/BlogPageCard";
import Loader from "@/components/common/Loader";
import usePublishedBlogs from "@/hooks/getDataFromDB/usePublishedBlogs";
import { Helmet } from "react-helmet-async";

const BlogPage = () => {
  const { publishedBlogs, isPublishedBlogsPending } = usePublishedBlogs();

  if (isPublishedBlogsPending) return <Loader />;

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <Helmet>
        <title>Red Wave - Blogs</title>
      </Helmet>
      <div className="flex items-center justify-center ">
        <div className=" my-16 w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
          <div className="mx-auto max-w-2xl text-center md:p-6">
            <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
              Inspiring Stories and Information on Blood Donation
            </h3>
            <p className="text-accent-foreground">
              Inspiring Together: A Community Connected by Blood Donation.
            </p>
          </div>
          <div className=" my-20 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {publishedBlogs.map((blog) => (
              <BlogPageCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
