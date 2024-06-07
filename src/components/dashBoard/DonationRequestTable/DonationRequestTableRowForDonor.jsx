import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";
import { TrashIcon } from "@radix-ui/react-icons";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowAltCircleRight, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DonationRequestTableRowForDonor = ({
  donation,
  refetch,
  refetchTotal,
}) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    recipient_name,
    recipient_upazila,
    recipient_district,
    donation_date,
    donation_time,
    donation_status,
    donor_name,
    donor_email,
  } = donation;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donation-requests/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              console.log(res.data);
              refetch();
              refetchTotal();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Failed!",
              text: "File deletation failed.",
              icon: "Error",
            });
          });
      }
    });
  };

  const handleDonation = (status) => {
    axiosSecure
      .patch(`/blood-donation-updated`, { _id, donation_status: status })
      .then((res) => {
        console.log(res.data);
        refetch();
        toast({
          title: "Status updated",
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "Status update failed",
        });
      });
  };

  return (
    <TableRow>
      <TableCell>{recipient_name}</TableCell>
      <TableCell>{`${recipient_upazila}, ${recipient_district}`}</TableCell>
      <TableCell>{new Date(donation_date).toLocaleDateString()}</TableCell>
      <TableCell>{donation_time}</TableCell>
      <TableCell className="capitalize">{donation_status}</TableCell>
      <TableCell>{donation_status === "inprogress" && donor_name}</TableCell>
      <TableCell>{donation_status === "inprogress" && donor_email}</TableCell>
      <TableCell>
        <Link to={`/dashboard/update-donation-request/${_id}`}>
          <Button size="icon" className="my-1">
            <FaEdit />
          </Button>
        </Link>
      </TableCell>
      <TableCell>
        <Button onClick={handleDelete} size="icon" className="my-1">
          <TrashIcon />
        </Button>
      </TableCell>
      <TableCell>
        <Link to={`/blood-donation-request-details/${_id}`}>
          <Button size="icon" className="my-1">
            <FaArrowAltCircleRight />
          </Button>
        </Link>
      </TableCell>
      {donation_status === "inprogress" && (
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <BsThreeDots className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40" forceMount>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Button
                onClick={() => handleDonation("done")}
                variant="outline"
                className="w-full"
              >
                Done
              </Button>
              <Button
                onClick={() => handleDonation("canceled")}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
};

DonationRequestTableRowForDonor.propTypes = {
  donation: PropTypes.object,
  refetch: PropTypes.func,
  refetchTotal: PropTypes.func,
};

export default DonationRequestTableRowForDonor;
