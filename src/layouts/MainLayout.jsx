import FooterMain from "@/components/common/FooterMain";
import NavbarMain from "@/components/common/NavbarMain";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavbarMain />
      <main className="min-h-[calc(100vh-250px)] pt-20">
        <Outlet />
      </main>
      {/* <FooterMain /> */}
    </>
  );
};

export default MainLayout;
