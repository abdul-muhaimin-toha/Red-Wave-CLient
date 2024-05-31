import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const FooterMain = () => {
  return (
    <footer className="border-t-4">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="mx-auto flex flex-col items-center justify-center gap-4 py-10 text-center">
          <div>
            <div className="mb-6 flex items-center justify-center">
              <img src={Logo} alt="Logo" className="w-24" />
            </div>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-left text-xs font-medium uppercase text-primary">
              <div className=" transition-all duration-200 hover:text-primary/70">
                <Link to="/">Home</Link>
              </div>
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link>Brand</Link>
              </div>
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link>Contact Us</Link>
              </div>
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link>Resources</Link>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-center text-sm">
              <p className="font-bold">Ollyo Industries LTD.</p>
              <p className="mb-1">Providing reliable tech since 1992.</p>
              <p>Copyright © 2024 - All right reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
