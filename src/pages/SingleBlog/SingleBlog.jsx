import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSingleBlog from "@/hooks/getDataFromDB/useSingleBlog";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const { singleBlog, isSingleBlogPending } = useSingleBlog(id);

  const content = (
    <div dangerouslySetInnerHTML={{ __html: singleBlog.content }} />
  );

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center">
          <Card className="my-16 w-full md:my-24 md:w-4/5 md:p-3 lg:w-3/5 xl:w-2/5">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-semibold  uppercase">
                {singleBlog.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="my-12">
                <img
                  src={singleBlog.image_url}
                  alt="thumbnail"
                  className="h-70 w-full object-cover"
                />
              </div>
              <div>{content}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
