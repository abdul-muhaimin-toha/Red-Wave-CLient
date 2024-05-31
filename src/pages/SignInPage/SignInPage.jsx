import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/auth/useAuth";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottieJson/loading-bar.json";

const SignInPage = () => {
  const [isPassVisible, SetIsPassVisible] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { emailPassLogin, googleLogin, githubLogin, isLoading, setIsLoading } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    const { email, password } = data;
    emailPassLogin(email, password)
      .then(() => {
        setIsLoading(false);
        reset();
        navigate(location?.state ? location?.state : "/");

        toast({
          title: "Congratulations!",
          description: "Successfully signed in.",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        console.error(errorMessage);
        toast({
          title: "Sorry, try again!",
          description: `${errorMessage}`,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        setIsLoading(false);
        navigate(location?.state ? location?.state : "/");
        toast({
          title: "Congratulations!",
          description: "Successfully signed in with google.",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        console.error(errorMessage);
        toast({
          title: "Sorry, try again!",
          description: `${errorMessage}`,
        });
      });
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then(() => {
        setIsLoading(false);
        navigate(location?.state ? location?.state : "/");
        toast({
          title: "Congratulations!",
          description: "Successfully signed in with github.",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        console.error(errorMessage);
        toast({
          title: "Sorry, try again!",
          description: `${errorMessage}`,
        });
      });
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center">
          <Card className="my-16 w-full md:my-24 md:w-4/5 md:p-3 lg:w-3/5 xl:w-2/5">
            {isLoading && (
              <Lottie
                animationData={groovyWalkAnimation}
                loop={true}
                className="w-full"
              />
            )}

            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-semibold  uppercase">
                Welcome Back!
              </CardTitle>
              <CardDescription className="text-md">
                Enter your email and password bellow to sign in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="grid gap-7"
              >
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "You must fill email field",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="max-w-xs pt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={isPassVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "You must fill password field",
                        },
                        minLength: {
                          value: 8,
                          message:
                            "Your password should be atleast 8 characters long",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                          message:
                            "Your password should contain both uppercase and lowercase character",
                        },
                      })}
                    />
                    <Button
                      onClick={() => SetIsPassVisible(!isPassVisible)}
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    >
                      {isPassVisible ? (
                        <EyeOpenIcon className="h-5 w-5" />
                      ) : (
                        <EyeNoneIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="max-w-xs pt-1 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button className="w-full" disabled={isLoading}>
                  Sign In
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="rounded-full bg-background px-3 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="space-x-2"
                    disabled={isLoading}
                  >
                    <FaGoogle className=" h-4 w-4" />
                    <span>Google</span>
                  </Button>
                  <Button
                    onClick={handleGithubLogin}
                    variant="outline"
                    className="space-x-2"
                    disabled={isLoading}
                  >
                    <FaGithub className=" h-4 w-4" />
                    <span>Github</span>
                  </Button>
                </div>
                <div>
                  <CardDescription className="mt-7 flex items-center justify-center gap-2 text-center">
                    Don&#39;t have an account?
                    <Link
                      to="/registration"
                      className="font-semibold text-primary transition-all duration-200 hover:underline"
                    >
                      Register now!
                    </Link>
                  </CardDescription>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
