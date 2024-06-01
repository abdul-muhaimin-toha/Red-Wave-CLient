import { Button } from "@/components/ui/button";
import { TableHead, TableRow } from "@/components/ui/table";
import { TrashIcon } from "@radix-ui/react-icons";
import { FaArrowAltCircleRight, FaEdit } from "react-icons/fa";

const DonationRequestTableRow = ({ donation }) => {
  const {
    recipient_name,
    recipient_upazila,
    recipient_district,
    donation_date,
    donation_time,
    donation_status,
    requester_name,
    requester_email,
  } = donation;
  return (
    <TableRow>
      <TableHead>{recipient_name}</TableHead>
      <TableHead>{`${recipient_upazila}, ${recipient_district}`}</TableHead>
      <TableHead>{new Date(donation_date).toLocaleDateString()}</TableHead>
      <TableHead>{donation_time}</TableHead>
      <TableHead>{donation_status}</TableHead>
      <TableHead>{requester_name}</TableHead>
      <TableHead>{requester_email}</TableHead>
      <TableHead>
        <Button size="icon" className="my-1">
          <FaEdit />
        </Button>
      </TableHead>
      <TableHead>
        <Button size="icon" className="my-1">
          <TrashIcon />
        </Button>
      </TableHead>
      <TableHead className="text-right">
        <Button size="icon" className="my-1">
          <FaArrowAltCircleRight />
        </Button>
      </TableHead>
    </TableRow>
  );
};

export default DonationRequestTableRow;
