import DashBoardSideBar from "@/components/dashBoard/DashBoardSideBar";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
    <>
      <DashBoardSideBar />
      <div className=" pt-20 md:ml-60">
        <Outlet />
      </div>
    </>
  );
};

export default DashBoardLayout;
