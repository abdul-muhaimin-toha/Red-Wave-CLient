import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/auth/useAuth";
import useDonationRequestforUser from "@/hooks/getDataFromDB/useDonationRequestforUser";
import DonationRequestTableRow from "./DonationRequestTableRow";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useUser from "@/hooks/getDataFromDB/useUser";
import DonationRequestTableRowForDonor from "./DonationRequestTableRowForDonor";

const DonationRequestTable = () => {
  const { user } = useAuth();
  const { userFromDB } = useUser(user.email);
  const { donationRequestForUser, refetch } = useDonationRequestforUser(
    user.email,
    "",
    3,
  );

  console.log(donationRequestForUser);

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

                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead className="text-right">View</TableHead>
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
