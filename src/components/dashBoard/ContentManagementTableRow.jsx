import PropTypes from "prop-types";
import { TableHead, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";
import { toast } from "../ui/use-toast";
import useUser from "@/hooks/getDataFromDB/useUser";
import useAuth from "@/hooks/auth/useAuth";
import useRole from "@/hooks/getDataFromDB/useRole";

const ContentManagementTableRow = ({ blog, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, image_url, title, status } = blog;
  const { userRole, isUserRolePending } = useRole();

  const handleBlogStatus = (newStatus) => {
    axiosSecure
      .patch("/blogs", { ...blog, status: newStatus })
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          console.log(res.data);
          refetch();
          toast({
            title: "congratulations",
            description: `${title} is ${newStatus} now!`,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "Sorry",
          description: `Something went wrong, try again!`,
        });
      });
  };

  const handleDeleteBlog = () => {
    axiosSecure
      .delete(`/blogs/${_id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          console.log(res.data);
          refetch();
          toast({
            title: "congratulations",
            description: `Deleted successfully!`,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "Sorry",
          description: `Something went wrong, try again!`,
        });
      });
  };

  return (
    <TableRow>
      <TableHead>
        <img
          src={image_url}
          className="h-16 w-16 object-cover py-4"
          alt="Blog thumbnail"
        />
      </TableHead>
      <TableHead>{title}</TableHead>
      <TableHead className="capitalize">{status}</TableHead>
      {userRole === "admin" && (
        <TableHead className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <BsThreeDots className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 space-y-1"
              forceMount
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {status === "draft" && (
                <Button
                  onClick={() => handleBlogStatus("published")}
                  className="w-full"
                >
                  Publish
                </Button>
              )}
              {status === "published" && (
                <Button
                  onClick={() => handleBlogStatus("draft")}
                  className="w-full"
                >
                  Unpublished
                </Button>
              )}
              <Button onClick={handleDeleteBlog} className="w-full">
                Delete
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableHead>
      )}
    </TableRow>
  );
};

ContentManagementTableRow.propTypes = {
  blog: PropTypes.object,
  refetch: PropTypes.func,
};

export default ContentManagementTableRow;
