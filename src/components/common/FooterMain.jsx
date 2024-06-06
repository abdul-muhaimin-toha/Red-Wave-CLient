import useAuth from "@/hooks/auth/useAuth";
import { Link } from "react-router-dom";

const FooterMain = () => {
  const { user } = useAuth();
  return (
    <footer className="border-t-4">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="mx-auto flex flex-col items-center justify-center gap-4 py-10 text-center">
          <div>
            <div className="mb-6 flex items-center justify-center">
              <Link to="/">
                <h3 className="text-xl font-bold uppercase text-primary">
                  Red Wave
                </h3>
              </Link>
            </div>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-left text-xs font-medium uppercase text-primary">
              <div className=" transition-all duration-200 hover:text-primary/70">
                <Link to="/">Home</Link>
              </div>
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link to="/blood-donation-requests">Donation Request</Link>
              </div>
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link to="/blogs">Blog</Link>
              </div>
              {user && (
                <div className="transition-all duration-200 hover:text-primary/70">
                  <Link to="/funds">Funding</Link>
                </div>
              )}
              {user && (
                <div className="transition-all duration-200 hover:text-primary/70">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 text-center text-sm">
              <p className="font-bold">Red Wave Corporation Ltd.</p>
              <p className="mb-1">Azampur, Uttara, Dhaka, Bangladesh.</p>
              <p>880 17903 49650</p>
              <p>abdulmuhaimintoha.business@gmail.com</p>
              <p>Designed & Developed by Abdul Muhaimin Toha</p>
              <p>Copyright © 2024 - All right reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
