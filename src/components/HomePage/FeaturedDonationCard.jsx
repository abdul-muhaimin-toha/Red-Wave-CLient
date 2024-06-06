import { Button } from "../ui/button";

const FeaturedDonationCard = () => {
  return (
    <div className="border p-4 text-sm">
      <div className="mb-3">
        <p className="mb-2 font-bold">Recipient Name:</p>
        <p className="mt-1 text-xl font-bold">Ali Ali</p>
      </div>
      <div className="flex flex-wrap gap-x-3">
        <div className="mb-3 flex text-xs">
          <p className="mt-1  rounded-md bg-primary p-1">
            Barishal Sadar, Barishal
          </p>
        </div>
        <div className="mb-3 flex text-xs">
          <p className="mt-1  rounded-md bg-primary p-1">12:40, 11/12/2024</p>
        </div>
      </div>

      <div className="mb-3 mt-3 text-xs">
        <p className="mb-2 font-bold">Requester Information:</p>
        <p className="mt-1">Abdul Muhaimin Toha</p>
        <p className="mt-1">muhaiminbtoha9@gmail.com</p>
      </div>
      <Button className="mt-4 w-full">View Details</Button>
    </div>
  );
};

export default FeaturedDonationCard;
