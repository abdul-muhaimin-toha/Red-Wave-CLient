import { Button } from "@/components/ui/button";

const BlogPageCard = ({ blog }) => {
  return (
    <div className="border bg-primary-foreground shadow-xl">
      <div>
        <img
          src={blog.image_url}
          alt="Blog thumbnail"
          className="h-40 w-full object-cover"
        />
      </div>
      <div className="space-y-1 p-6 text-slate-900">
        <h3 className="min-h-20 text-xl font-bold uppercase">{blog.title}</h3>
        <Button size="sm">Read More</Button>
      </div>
    </div>
  );
};

export default BlogPageCard;
