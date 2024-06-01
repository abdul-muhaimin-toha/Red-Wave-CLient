import DonationRequestTable from "@/components/dashBoard/DonationRequestTable/DonationRequestTable";
import useAuth from "@/hooks/auth/useAuth";

const DashBoardHome = () => {
  const { user } = useAuth();

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-2xl  px-4">
          <div className="flex items-center justify-center ">
            <div className="mb-6 mt-12 w-full rounded-md border-2 p-5 md:mt-20  md:p-6 lg:w-4/5 xl:w-4/5 ">
              <div className="mx-auto max-w-2xl text-center md:p-6">
                <h3 className="mb-4 text-2xl font-semibold uppercase md:text-3xl">
                  Welcome to Red Wave, {user.displayName}!
                </h3>
                <p className="text-sm">
                  Thank you for logging in as a donor. Your generosity and
                  support make a huge difference in the lives of those we serve.
                  We are thrilled to have you as a part of our community, and we
                  look forward to working together to create positive change.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DonationRequestTable />
      </section>
    </>
  );
};

export default DashBoardHome;
