import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/auth/useAuth";
import useDistricts from "@/hooks/getDataFromDB/useDistricts";
import useUpazilas from "@/hooks/getDataFromDB/useUpazilas";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/getDataFromDB/useUser";

const CreateDonationRequest = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState("10:00");
  const { districts, isDistrictsPending } = useDistricts();
  const { upazilas, isUpazilasPending } = useUpazilas();
  const { user } = useAuth();
  const { userFromDB } = useUser(user.email);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requester_name = e.target.requester_name.value;
    const requester_email = e.target.requester_email.value;
    const recipient_name = e.target.recipient_name.value;
    const recipient_district = e.target.Recipient_district.value;
    const recipient_upazila = e.target.Recipient_upazila.value;
    const hospital_name = e.target.hospital_name.value;
    const full_address = e.target.full_address.value;
    const request_message = e.target.request_message.value;

    const requestData = {
      requester_name,
      requester_email,
      recipient_name,
      recipient_district,
      recipient_upazila,
      donation_date: new Date(date),
      donation_time: time,
      hospital_name,
      full_address,
      request_message,
      donation_status: "pending",
    };

    if (userFromDB.status === "blocked") {
      navigate("/dashboard/my-donation-requests");
      return toast({
        title: "Sorry your id is bloced!",
        description: "Blocked user can't post any new request",
      });
    }

    axiosSecure
      .post("/donation-requests", requestData)
      .then((res) => {
        if (res.data.insertedId) {
          console.log(res.data);
          e.target.reset();
          navigate("/dashboard/my-donation-requests");
          toast({
            title: "Congratulations!",
            description: "Request posted successfully.",
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  if (isDistrictsPending || isUpazilasPending) return;

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center">
          <div className="w-full border-2 p-3 md:w-4/5 md:p-8 lg:w-3/5 xl:w-2/5 ">
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold  uppercase">
                Create a new donation request
              </h3>
              <p className="text-md">
                Add your necessary information bellow to create a new donation
                request.
              </p>
            </div>
            <div className="mt-10">
              <form className="grid gap-5" onSubmit={handleFormSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="requester_name">Requester Name</Label>
                  <Input
                    disabled
                    id="requester_name"
                    type="text"
                    defaultValue={user.displayName}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requester_email">Requester Email</Label>
                  <Input
                    disabled
                    id="requester_email"
                    type="email"
                    defaultValue={user.email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recipient_name">Recipient Name</Label>
                  <Input
                    id="recipient_name"
                    type="text"
                    placeholder="Enter recipient name here"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 grid gap-2 md:col-span-1">
                    <Label htmlFor="Recipient_district">
                      Recipient District
                    </Label>
                    <select
                      name="Recipient_district"
                      id="Recipient_district"
                      className="border bg-white p-2 text-sm text-black"
                    >
                      {districts.map((district) => (
                        <option key={district._id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 grid gap-2 md:col-span-1 ">
                    <Label htmlFor="Recipient_upazila">Recipient Upazila</Label>
                    <select
                      name="Recipient_upazila"
                      id="Recipient_upazila"
                      className="border bg-white p-2 text-sm text-black"
                    >
                      {upazilas.map((upazila) => (
                        <option key={upazila._id} value={upazila.name}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 grid gap-2 md:col-span-1 ">
                    <Label htmlFor="donation_date">Donation Date</Label>
                    <div className="col-span-1 flex">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="col-span-2 grid gap-2 md:col-span-1">
                    <Label htmlFor="full_address">Donation Time</Label>
                    <TimePicker
                      onChange={setTime}
                      value={time}
                      className="w-full border bg-white text-sm text-black"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 grid gap-2 md:col-span-1 ">
                    <Label htmlFor="hospital_name">Hospital Name</Label>
                    <Input
                      id="hospital_name"
                      type="text"
                      placeholder="Enter hospital name"
                    />
                  </div>
                  <div className="col-span-2 grid gap-2 md:col-span-1">
                    <Label htmlFor="full_address">full Address</Label>
                    <Input
                      id="full_address"
                      type="text"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="request_message">Request Message</Label>
                  <Textarea
                    id="request_message"
                    placeholder="Type your message here."
                  />
                </div>
                <Button type="submit">Request Now</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateDonationRequest;
