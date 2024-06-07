import Loader from "@/components/common/Loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSingleBlog from "@/hooks/getDataFromDB/useSingleBlog";
import { useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SingleBlog = () => {
  const { id } = useParams();
  const { singleBlog, isSingleBlogPending } = useSingleBlog(id);
  const currentPage = window.location.href;

  const content = (
    <div dangerouslySetInnerHTML={{ __html: singleBlog.content }} />
  );

  if (isSingleBlogPending) return <Loader />;

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
                  className="h-56 w-full object-cover"
                />
              </div>
              <div>{content}</div>
            </CardContent>
            <CardFooter className="flex items-center gap-4">
              <h3 className="font-bold text-primary">Share Now:</h3>
              <div className="flex gap-2">
                <TwitterShareButton url={currentPage}>
                  <TwitterIcon size={25} round={true} />
                </TwitterShareButton>
                <FacebookShareButton url={currentPage}>
                  <FacebookIcon size={25} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={currentPage}>
                  <WhatsappIcon size={25} round={true} />
                </WhatsappShareButton>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
