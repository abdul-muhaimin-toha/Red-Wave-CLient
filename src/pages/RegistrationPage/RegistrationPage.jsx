import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/auth/useAuth";
import { imageUpload } from "@/utils/imageUpload";
import { useToast } from "@/components/ui/use-toast";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottieJson/loading-bar.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import useDistricts from "@/hooks/getDataFromDB/useDistricts";
import useUpazilas from "@/hooks/getDataFromDB/useUpazilas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useAxiosPublic from "@/hooks/axios/useAxiosPublic";

const RegistrationPage = () => {
  const [picture, setPicture] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { districts, isDistrictsPending } = useDistricts();
  const { upazilas, isUpazilasPending } = useUpazilas();
  const { createNewUser, updateUserProfile, logout, isLoading, setIsLoading } =
    useAuth();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required.",
    }),
    email: z.string().min(2, {
      message: "Name is required.",
    }),
    picture: z.string({
      message: "Image is required.",
    }),
    bloodGroup: z.string({
      message: "Blood Group is required.",
    }),
    district: z.string({
      message: "District is required.",
    }),
    upazila: z.string({
      message: "Upazila is required.",
    }),
    password: z.string().min(6, {
      message: "Password should be atleast 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password should be atleast 6 characters long",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      picture: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  function onSubmit(values) {
    const {
      name,
      email,
      bloodGroup,
      district,
      upazila,
      password,
      confirmPassword,
    } = values;

    if (password !== confirmPassword) {
      return toast({
        title: "Password did not matched!",
        description: "Type carefully and try again.",
      });
    }
    if (!picture) {
      return toast({
        title: "Upload an image!",
        description: "Then try again.",
      });
    }

    imageUpload(picture)
      .then((response) => {
        const image_url = response.data.data.display_url;
        createNewUser(email, password)
          .then(() => {
            updateUserProfile(name, image_url)
              .then(() => {
                axiosPublic
                  .put("users", {
                    name,
                    email,
                    bloodGroup,
                    district,
                    upazila,
                    image_url,
                    role: "active",
                  })
                  .then((res) => {
                    if (res.data.upsertedCount > 1) {
                      console.log(res.data);
                      setIsLoading(false);
                    }
                  })
                  .catch((err) => console.log(err));
              })
              .catch((error) => {
                console.error(error.message);
              });
            logout();
            navigate("/sign-in");
            form.reset();
            toast({
              title: "Congratulations!",
              description: "Profile successfully created.",
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
      })
      .catch((error) => {
        console.error(error.message);
        toast({
          title: "Sorry, try again!",
          description: `${error.message}`,
        });
      });
  }

  if (isDistrictsPending || isUpazilasPending) return;

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
                Create new account!
              </CardTitle>
              <CardDescription className="text-md">
                Enter your information bellow to join now.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <Label htmlFor="name">Name</Label>
                        <FormControl>
                          <Input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <Label htmlFor="email">Email</Label>
                        <FormControl>
                          <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-5 md:flex-row">
                    <div className="grid w-full gap-2 self-start md:w-1/2">
                      <Label htmlFor="picture">Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        onChange={handleImageChange}
                        className="file:text-primary"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      className="grid gap-2 self-start"
                      render={({ field }) => (
                        <FormItem className="grid w-full md:w-1/2 ">
                          <Label>Blood group</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your blood group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Blood groups</SelectLabel>
                                <SelectItem value="A positive">
                                  A positive
                                </SelectItem>
                                <SelectItem value="A negative">
                                  A negative
                                </SelectItem>
                                <SelectItem value="B positive">
                                  B positive
                                </SelectItem>
                                <SelectItem value="B negative">
                                  B negative
                                </SelectItem>
                                <SelectItem value="AB positive">
                                  AB positive
                                </SelectItem>
                                <SelectItem value="AB negative">
                                  AB negative
                                </SelectItem>
                                <SelectItem value="O positive">
                                  O positive
                                </SelectItem>
                                <SelectItem value="O negative">
                                  O negative
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                      control={form.control}
                      name="district"
                      className="grid gap-2 "
                      render={({ field }) => (
                        <FormItem className="grid w-full self-start md:w-1/2">
                          <Label htmlFor="district">District</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your district" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Districts</SelectLabel>
                                {districts.map((district) => (
                                  <SelectItem
                                    key={district._id}
                                    value={district.name}
                                  >
                                    {district.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="upazila"
                      className="grid gap-2"
                      render={({ field }) => (
                        <FormItem className="grid w-full self-start md:w-1/2">
                          <Label htmlFor="upazila">Upazila</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your upazila" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Upazilas</SelectLabel>
                                {upazilas.map((upazila) => (
                                  <SelectItem
                                    key={upazila._id}
                                    value={upazila.name}
                                  >
                                    {upazila.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <Label htmlFor="password">Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <Label htmlFor="password">Confirm password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Enter your password again"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    Register Now
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div>
                  <CardDescription className="flex items-center justify-center gap-2 text-center">
                    Already have an account?
                    <Link
                      to="/sign-in"
                      className="font-semibold text-primary transition-all duration-200 hover:underline"
                    >
                      Sign In now!
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

export default RegistrationPage;
