import useAuth from "@/hooks/auth/useAuth";
import { Link, NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FaUserFriends, FaBookOpen } from "react-icons/fa";
import { MdBloodtype, MdCreate } from "react-icons/md";
import { BiDonateHeart, BiLogOut } from "react-icons/bi";
import { CiPen } from "react-icons/ci";
import useRole from "@/hooks/getDataFromDB/useRole";
import { toast } from "../ui/use-toast";

const DashBoardSideBar = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState("false");
  const { userRole, isUserRolePending } = useRole();
  const { user, logout } = useAuth();

  const handleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast({
          title: "Successfully logged out!",
        });
      })
      .catch((error) => {
        console.error(error.message);
        toast({
          title: "Something went wrong!",
          description: `${error.message}`,
        });
      });
  };

  return (
    <>
      <nav className="fixed z-[60] w-full transform border-b-4 bg-background transition-transform duration-300 md:hidden">
        <div className="mx-auto max-w-screen-2xl px-4 ">
          <div className="flex items-center justify-between gap-6 py-5 md:gap-4 lg:gap-6">
            <div className="flex w-full items-center justify-between">
              <Link to="/">
                <h3 className="text-xl font-bold uppercase text-primary">
                  Red Wave
                </h3>
              </Link>
              <Button onClick={handleSideBar} size="icon" variant="outline">
                <HamburgerMenuIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed z-50 flex h-screen w-64 ${isSideBarVisible ? "" : "-translate-x-full"} flex-col space-y-6 border-r-2 bg-background px-3  md:translate-x-0 `}
      >
        <div className="my-8 flex h-full flex-col divide-y divide-gray-700">
          <NavLink to="/">
            <h3 className="px-3 pb-6  text-xl font-bold uppercase text-primary">
              Red Wave
            </h3>
          </NavLink>
          <ul className="flex-1 space-y-3 pb-4 pt-2 text-sm">
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span className="capitalize">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-donation-requests"
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                }
              >
                <MdBloodtype className="h-5 w-5 fill-current" />
                <span className="capitalize">My donation request</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/create-donation-request"
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                }
              >
                <MdCreate className="h-5 w-5 fill-current" />
                <span className="capitalize">Create Donation Request</span>
              </NavLink>
            </li>
            {userRole === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/all-users"
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                  }
                >
                  <FaUserFriends className="h-5 w-5 fill-current" />
                  <span className="capitalize">All users</span>
                </NavLink>
              </li>
            )}
            {(userRole === "admin" || userRole === "volunteer") && (
              <li>
                <NavLink
                  to="/dashboard/all-donation-requests"
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                  }
                >
                  <BiDonateHeart className="h-5 w-5 fill-current" />
                  <span className="capitalize">All Donation Request</span>
                </NavLink>
              </li>
            )}
            {(userRole === "admin" || userRole === "volunteer") && (
              <li>
                <NavLink
                  to="/dashboard/content-management"
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                  }
                >
                  <FaBookOpen className="h-5 w-5 fill-current" />
                  <span className="capitalize">Content management</span>
                </NavLink>
              </li>
            )}
            {(userRole === "admin" || userRole === "volunteer") && (
              <li>
                <NavLink
                  to="/dashboard/content-management/add-blog"
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                  }
                >
                  <CiPen className="h-5 w-5 fill-current" />
                  <span className="capitalize">Add blog</span>
                </NavLink>
              </li>
            )}
          </ul>
          <ul className=" space-y-3  pt-6 text-sm">
            <li>
              <NavLink
                to="/dashboard/profile"
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-primary ${isActive ? "bg-accent" : ""}`
                }
              >
                <RxAvatar className="h-5 w-5" />
                <span>View Profile</span>
              </NavLink>
            </li>
            <li>
              <Button
                onClick={handleLogOut}
                className="flex w-full items-center justify-start space-x-3 rounded-md bg-accent px-2 py-5 text-left"
              >
                <BiLogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashBoardSideBar;
