import AllUsersTable from "@/components/dashBoard/AllUsersTable/AllUsersTable";
import { Helmet } from "react-helmet-async";

const AllUsersPage = () => {
  return (
    <div>
      <Helmet>
        <title>Red Wave - All Users</title>
      </Helmet>
      <AllUsersTable />
    </div>
  );
};

export default AllUsersPage;
