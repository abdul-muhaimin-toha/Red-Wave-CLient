import useAuth from "@/hooks/auth/useAuth";
import AdminDashBoard from "./DashBoardHomePages/AdminDashBoard";
import DonationRequestTable from "@/components/dashBoard/DonationRequestTable/DonationRequestTable";
import useUser from "@/hooks/getDataFromDB/useUser";
import useRole from "@/hooks/getDataFromDB/useRole";

const DashBoardHome = () => {
  const { user } = useAuth();
  const { userFromDB } = useUser(user.email);
  const { userRole, isUserRoleLoading } = useRole();

  return (
    <>
      <section>
        <div className="mx-4 mb-10">
          <div className="flex items-center justify-center">
            <div className="max-w-screen-2xl ">
              <div className="max-w-lg p-4 text-center md:p-8">
                <h3 className="mb-5 text-2xl font-semibold uppercase md:text-3xl">
                  Welcome to Red Wave, {user.displayName}!
                </h3>
                <p className="text-sm">
                  Thank you for logging in as a {userRole}. Your generosity and
                  support make a huge difference in the lives of those we serve.
                  We are thrilled to have you as a part of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {(userRole === "admin" || userRole === "volunteer") && <AdminDashBoard />}
      {userRole === "donor" && <DonationRequestTable />}
    </>
  );
};

export default DashBoardHome;
