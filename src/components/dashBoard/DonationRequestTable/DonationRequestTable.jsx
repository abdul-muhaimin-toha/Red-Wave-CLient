import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/auth/useAuth";
import useDonationRequestforUser from "@/hooks/getDataFromDB/useDonationRequestforUser";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DonationRequestTableRowForDonor from "./DonationRequestTableRowForDonor";
import Loader from "@/components/common/Loader";

const DonationRequestTable = () => {
  const { user } = useAuth();
  const { donationRequestForUser, isDonationRequestPending, refetch } =
    useDonationRequestforUser(user.email, "", 3);

  if (isDonationRequestPending) return <Loader />;

  if (!donationRequestForUser.length > 0) return;

  return (
    <div className="mx-auto max-w-screen-2xl  px-4">
      <div className="flex items-center justify-center ">
        <div className="w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
          <div className="mx-auto max-w-2xl text-center md:p-6">
            <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
              A list of your recent donation Requests
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient Name</TableHead>
                <TableHead>Recipient Location</TableHead>
                <TableHead>Donation Date</TableHead>
                <TableHead>Donation Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Donor Name</TableHead>
                <TableHead>Donor Email</TableHead>

                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>View</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationRequestForUser.map((donation) => (
                <DonationRequestTableRowForDonor
                  refetch={refetch}
                  key={donation._id}
                  donation={donation}
                />
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 text-center">
            <Link to="/dashboard/my-donation-requests">
              <Button>View my all donation Request</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestTable;
