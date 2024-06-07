import PropTypes from "prop-types";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Link } from "react-router-dom";

const PendingDonationRequestTableRow = ({ donation }) => {
  const {
    _id,
    recipient_name,
    donation_date,
    donation_time,
    recipient_district,
    recipient_upazila,
  } = donation;
  return (
    <TableRow>
      <TableCell>{recipient_name}</TableCell>
      <TableCell>
        {recipient_upazila}, {recipient_district}
      </TableCell>
      <TableCell>{new Date(donation_date).toLocaleDateString()}</TableCell>
      <TableCell>{donation_time}</TableCell>
      <TableCell>
        <Link to={`/blood-donation-request-details/${_id}`}>
          <Button size="icon" className="my-1">
            <FaArrowAltCircleRight />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

PendingDonationRequestTableRow.propTypes = {
  donation: PropTypes.object,
};

export default PendingDonationRequestTableRow;
