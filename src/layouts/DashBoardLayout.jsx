import DashBoardSideBar from "@/components/dashBoard/DashBoardSideBar";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
    <>
      <DashBoardSideBar />
      <div className=" pt-32  md:ml-60 md:pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default DashBoardLayout;
