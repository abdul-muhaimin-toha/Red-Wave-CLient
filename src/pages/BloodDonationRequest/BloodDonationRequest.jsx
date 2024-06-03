import PendingDonationRequestTableRow from "@/components/PendingDonationRequest/PendingDonationRequestTableRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePendingDonationRequest from "@/hooks/getDataFromDB/usePendingDonationRequest";

const BloodDonationRequest = () => {
  const { pendingDonationRequest, isPendingDonationRequestPending } =
    usePendingDonationRequest();

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex items-center justify-center ">
        <div className=" my-16 w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
          <div className="mx-auto max-w-2xl text-center md:p-6">
            <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
              Blood donation Requests
            </h3>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient Name</TableHead>
                <TableHead>Recipient Location</TableHead>
                <TableHead>Donation Date</TableHead>
                <TableHead>Donation Time</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingDonationRequest.map((donation) => (
                <PendingDonationRequestTableRow
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

export default BloodDonationRequest;
