import FundingModal from "@/components/Funding/FundingModal";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Funding = () => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-16">
      <div className="flex items-center justify-center ">
        <div className="w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
          <div className="flex justify-end pb-10">
            <FundingModal />
          </div>
          <div className="mx-auto max-w-2xl  text-center md:p-6">
            <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
              Support Our Cause
            </h3>
            <p>Make a life-changing difference with your donation.</p>
          </div>
          <div className=" my-12  w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Fund Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody></TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;
