import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";
import { imageUpload } from "@/utils/imageUpload";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    imageUpload(picture)
      .then((response) => {
        const image_url = response?.data?.data?.display_url;
        axiosSecure
          .post("/blogs", { title, image_url, content, status: "draft" })
          .then((res) => {
            if (res?.data?.insertedId) {
              console.log(res.data);
              e.target.reset();
              setContent("");
              navigate("/dashboard/content-management");
              toast({
                title: "Congratulations!",
                description: "Blog uploaded successfully.",
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
            toast({
              title: "Sorry!",
              description: "Blog uploading failed.",
            });
          });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center">
          <div className="w-full border-2 p-3 md:w-4/5 md:p-8 lg:w-3/5 xl:w-3/5 ">
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold  uppercase">
                Post a new Blog!
              </h3>
              <p className="text-md">
                Unleash Your Creativity: Start Your Own Blog Today
              </p>
            </div>
            <div className="mt-10">
              <form onSubmit={handleBlogSubmit} className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="title">Blog Title</Label>
                  <Input id="title" type="text" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="thumbnail">Blog Thumbnail</Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    onChange={handleImageChange}
                    className="file:text-primary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Blog Content</Label>
                  <JoditEditor
                    className="text-black"
                    ref={editor}
                    value={content}
                    onChange={(newContent) => {
                      setContent(newContent);
                    }}
                  />
                </div>
                <Button type="submit">Save Now</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddBlog;
