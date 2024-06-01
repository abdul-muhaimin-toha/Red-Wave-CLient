import NavbarMain from "@/components/common/NavbarMain";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
    <>
      <NavbarMain />
      <main className="min-h-[calc(100vh-250px)] pt-20">
        <Outlet />
      </main>
    </>
  );
};

export default DashBoardLayout;
