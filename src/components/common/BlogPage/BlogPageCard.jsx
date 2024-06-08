import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BlogPageCard = ({ blog }) => {
  return (
    <div className="border shadow-xl">
      <div>
        <img
          src={blog.image_url}
          alt="Blog thumbnail"
          className="h-40 w-full object-cover"
        />
      </div>
      <div className="space-y-1 p-6">
        <h3 className=" min-h-52 text-xl font-bold uppercase        ">
          {blog.title}
        </h3>
        <div className="text-right">
          <Link to={`/blog/${blog._id}`}>
            <Button size="sm">Read More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

BlogPageCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogPageCard;
