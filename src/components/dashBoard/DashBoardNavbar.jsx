import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ThemeToggler from "../theme/ThemeToggler";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import useAuth from "@/hooks/auth/useAuth";
import { useToast } from "../ui/use-toast";

const DashBoardNavbar = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
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
    <nav className="fixed z-50 w-full transform border-b-4 bg-background transition-transform duration-300">
      <div className="mx-auto px-4  md:px-10 ">
        <div className="flex items-center justify-between gap-6 py-5 md:gap-4 lg:gap-6">
          <div className="flex items-center gap-16 md:gap-14 lg:gap-24">
            <div className="flex items-center justify-center gap-4">
              <Link to="/">
                <h3 className="font-bold uppercase text-primary">Red Wave</h3>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <ThemeToggler />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 overflow-hidden  rounded-full outline outline-1 outline-primary"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user?.photoURL}
                        className="h-7 w-7 rounded-full"
                      />
                      <AvatarFallback>
                        {user?.displayName?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-6 w-56"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex list-none gap-4 text-primary">
                <Link to="/sign-in">
                  <Button variant="default" className="text-xs uppercase">
                    Join In
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button
                    variant="default"
                    className="hidden text-xs uppercase md:block"
                  >
                    Registration
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardNavbar;
