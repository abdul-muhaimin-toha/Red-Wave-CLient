import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsThreeDots } from "react-icons/bs";
import { TableHead, TableRow } from "@/components/ui/table";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";
import { toast } from "@/components/ui/use-toast";

const AllUsersTableRow = ({ user, refetch }) => {
  const { image_url, email, name, role, status } = user;
  const axiosSecure = useAxiosSecure();

  const handleBlockUser = () => {
    axiosSecure
      .patch("/users", { ...user, status: "blocked" })
      .then((res) => {
        console.log(res);
        refetch();
        toast({
          title: "Congratulations!",
          description: `Status for ${name} changed successfully `,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Status changing Failed!",
          description: `Try again later!`,
        });
      });
  };

  const handleUnBlockUser = () => {
    axiosSecure
      .patch("/users", { ...user, status: "active" })
      .then((res) => {
        console.log(res);
        refetch();
        toast({
          title: "Congratulations!",
          description: `Status for ${name} changed successfully `,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Status changing Failed!",
          description: `Try again later!`,
        });
      });
  };

  const handleMakeUserVolunteer = () => {
    axiosSecure
      .patch("/users", { ...user, role: "volunteer" })
      .then((res) => {
        console.log(res);
        refetch();
        toast({
          title: "Congratulations!",
          description: `Role for ${name} changed successfully `,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Role changing Failed!",
          description: `Try again later!`,
        });
      });
  };

  const handleMakeUserAdmin = () => {
    axiosSecure
      .patch("/users", { ...user, role: "admin" })
      .then((res) => {
        console.log(res);
        refetch();
        toast({
          title: "Congratulations!",
          description: `Role for ${name} changed successfully `,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Role changing Failed!",
          description: `Try again later!`,
        });
      });
  };

  return (
    <TableRow>
      <TableHead>
        <img
          src={image_url}
          alt="user-avator"
          className="my-4 h-10 w-10 rounded-md border-2 border-destructive object-cover"
        />
      </TableHead>
      <TableHead>{email}</TableHead>
      <TableHead>{name}</TableHead>
      <TableHead className="capitalize">{role}</TableHead>
      <TableHead className="capitalize">{status}</TableHead>
      <TableHead className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">
              <BsThreeDots className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40" forceMount>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {status === "active" && (
              <Button
                onClick={handleBlockUser}
                variant="outline"
                className="w-full"
              >
                Block
              </Button>
            )}
            {status === "blocked" && (
              <Button
                onClick={handleUnBlockUser}
                variant="outline"
                className="w-full"
              >
                Unblock
              </Button>
            )}

            {role === "donor" && (
              <Button
                onClick={handleMakeUserVolunteer}
                variant="outline"
                className="w-full"
              >
                Make Volunteer
              </Button>
            )}

            {(role === "donor" || role === "volunteer") && (
              <Button
                onClick={handleMakeUserAdmin}
                variant="outline"
                className="w-full"
              >
                Make Admin
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableHead>
    </TableRow>
  );
};

AllUsersTableRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default AllUsersTableRow;
