import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const FeaturedDonationCard = ({ donation }) => {
  const {
    _id,
    recipient_name,
    recipient_upazila,
    recipient_district,
    requester_name,
    requester_email,
    donation_date,
    donation_time,
  } = donation || {};

  return (
    <div className="flex flex-col border p-4 text-sm">
      <div className="mb-3">
        <p className="mb-2 font-bold">Recipient Name:</p>
        <p className="mt-1 text-xl font-bold">{recipient_name}</p>
      </div>
      <div className="flex flex-wrap gap-x-3 text-white">
        <div className="mb-3 flex text-xs">
          <p className="mt-1  rounded-md bg-primary p-1">
            {recipient_upazila}, {recipient_district}
          </p>
        </div>
        <div className="mb-3 flex text-xs">
          <p className="mt-1  rounded-md bg-primary p-1">
            {donation_time}, {new Date(donation_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-3 mt-3 text-xs">
        <p className="mb-2 font-bold">Requester Information:</p>
        <p className="mt-1">{requester_name}</p>
        <p className="mt-1">{requester_email}</p>
      </div>
      <Link to={`/blood-donation-request-details/${_id}`} className="self-end">
        <Button size="sm" className="mt-4 ">
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default FeaturedDonationCard;
