import { Button } from "@/components/ui/button";

import { TableCell, TableRow } from "@/components/ui/table";
import useAuth from "@/hooks/auth/useAuth";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";
import useUser from "@/hooks/getDataFromDB/useUser";
import { TrashIcon } from "@radix-ui/react-icons";
import { FaArrowAltCircleRight, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DonationRequestTableRowForDonor = ({ donation, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { userFromDB } = useUser(user.email);
  const {
    _id,
    recipient_name,
    recipient_upazila,
    recipient_district,
    donation_date,
    donation_time,
    donation_status,
    requester_name,
    requester_email,
  } = donation;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
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
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Failed!",
              text: "File deletation failed.",
              icon: "Error",
            });
          });
      }
    });
  };

  return (
    <TableRow>
      <TableCell>{recipient_name}</TableCell>
      <TableCell>{`${recipient_upazila}, ${recipient_district}`}</TableCell>
      <TableCell>{new Date(donation_date).toLocaleDateString()}</TableCell>
      <TableCell>{donation_time}</TableCell>
      <TableCell>{donation_status}</TableCell>
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
      <TableCell className="text-right">
        <Button size="icon" className="my-1">
          <FaArrowAltCircleRight />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DonationRequestTableRowForDonor;
