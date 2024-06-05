import useTotalStats from "@/hooks/getDataFromDB/useTotalStats";
import { Users } from "lucide-react";

const AdminDashBoard = () => {
  const { totalStats, isTotalStatsPending } = useTotalStats();

  return (
    <section>
      <div className="mx-4">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-10 md:p-8  lg:grid-cols-3">
            <div className="flex items-center justify-center gap-6 rounded-md border bg-destructive p-16 text-primary">
              <div className="rounded-full border  border-white bg-white p-4">
                <Users className="text-black" />
              </div>
              <div className="text-white">
                <p className="text-3xl font-semibold">
                  {totalStats["total-users"]}
                </p>
                <h4 className="font-2xl font-semibold">Total Users</h4>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 rounded-md border bg-destructive p-16 text-primary">
              <div className="rounded-full border  border-white bg-white p-4">
                <Users className="text-black" />
              </div>
              <div className="text-white">
                <p className="text-3xl font-semibold">
                  {totalStats["total-funds"]}
                </p>
                <h4 className="font-2xl font-semibold">Total Fundings</h4>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 rounded-md border bg-destructive p-16 text-primary">
              <div className="rounded-full border  border-white bg-white p-4">
                <Users className="text-black" />
              </div>
              <div className="text-white">
                <p className="text-3xl font-semibold">
                  {totalStats["total-donation-request"]}
                </p>
                <h4 className="font-2xl font-semibold">
                  Total Donation Requests
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashBoard;
