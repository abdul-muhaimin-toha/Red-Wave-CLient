import useAuth from "@/hooks/auth/useAuth";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FaUserFriends, FaBookOpen } from "react-icons/fa";
import { MdBloodtype, MdCreate } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { CiPen } from "react-icons/ci";

const DashBoardSideBar = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState("false");

  const handleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
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
        <div className="my-8 divide-y divide-gray-700">
          <Link to="/">
            <h3 className=" mb-5 text-xl font-bold uppercase text-primary">
              Red Wave
            </h3>
          </Link>
          <ul className="space-y-1 pb-4 pt-2 text-sm">
            <li className="">
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span className="capitalize">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-donation-requests"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <MdBloodtype className="h-5 w-5 fill-current" />
                <span className="capitalize">My donation request</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/create-donation-request"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <MdCreate className="h-5 w-5 fill-current" />
                <span className="capitalize">Create Donation Request</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/all-users"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <FaUserFriends className="h-5 w-5 fill-current" />
                <span className="capitalize">All users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/all-donation-requests"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <BiDonateHeart className="h-5 w-5 fill-current" />
                <span className="capitalize">All Donation Request</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/content-management"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <FaBookOpen className="h-5 w-5 fill-current" />
                <span className="capitalize">Content management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/content-management/add-blog"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <CiPen className="h-5 w-5 fill-current" />
                <span className="capitalize">Add blog</span>
              </Link>
            </li>
          </ul>
          <ul className="space-y-1 pb-2 pt-4 text-sm">
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                <RxAvatar className="h-5 w-5" />
                <span>View Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashBoardSideBar;
