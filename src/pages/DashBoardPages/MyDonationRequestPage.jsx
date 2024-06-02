import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/auth/useAuth";
import useDonationRequestforUser from "@/hooks/getDataFromDB/useDonationRequestforUser";
import DonationRequestTableRow from "@/components/dashBoard/DonationRequestTable/DonationRequestTableRow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MyDonationRequestPage = () => {
  const [filterValue, setFilterValue] = useState("");
  const { user } = useAuth();
  const { donationRequestForUser, refetch } = useDonationRequestforUser(
    user.email,
    filterValue,
  );

  return (
    <div className="mx-auto max-w-screen-2xl  px-4">
      <div className="flex items-center justify-center ">
        <div className="w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
          <div className="mx-auto max-w-2xl text-center md:p-6">
            <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
              Your all donation Requests
            </h3>
          </div>
          <div className=" mb-14 mt-5 flex items-center justify-center ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Filter Table</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="space-x-1"
                forceMount
              >
                <DropdownMenuSeparator />
                <Button size="sm" onClick={() => setFilterValue("pending")}>
                  Pending
                </Button>
                <Button size="sm" onClick={() => setFilterValue("inprogress")}>
                  Inprogress
                </Button>
                <Button size="sm" onClick={() => setFilterValue("done")}>
                  Done
                </Button>
                <Button size="sm" onClick={() => setFilterValue("canceled")}>
                  Canceled
                </Button>
                <Button size="sm" onClick={() => setFilterValue("")}>
                  Clear
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationRequestForUser.map((donation) => (
                <DonationRequestTableRow
                  refetch={refetch}
                  key={donation._id}
                  donation={donation}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequestPage;
