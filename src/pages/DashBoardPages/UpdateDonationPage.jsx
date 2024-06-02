import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/auth/useAuth";
import useDistricts from "@/hooks/getDataFromDB/useDistricts";
import useUpazilas from "@/hooks/getDataFromDB/useUpazilas";
import { useEffect, useState } from "react";
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
import useSingleDonationRequest from "@/hooks/getDataFromDB/useSingleDonationRequest";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDonationRequest = () => {
  const { id } = useParams();
  const { donationRequestSingle, refetch } = useSingleDonationRequest(id);
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const { districts, isDistrictsPending } = useDistricts();
  const { upazilas, isUpazilasPending } = useUpazilas();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    setDate(donationRequestSingle.donation_date);
    setTime(donationRequestSingle.donation_time);
  }, [donationRequestSingle]);

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
    axiosSecure
      .put("/donation-request-single", requestData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          console.log(res.data);
          e.target.reset();
          refetch();
          navigate("/dashboard");
          toast({
            title: "Congratulations!",
            description: "Request updated successfully.",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "Sorry!",
          description: "Update request failed.",
        });
      });
  };

  if (isDistrictsPending || isUpazilasPending) return;

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center">
          <div className="w-full border-2 p-3 md:w-4/5 md:p-8 lg:w-3/5 xl:w-2/5 ">
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold  uppercase">
                Update your donation request
              </h3>
              <p className="text-md">
                Add your necessary information bellow to update existing
                donation request.
              </p>
            </div>
            <div className="mt-10">
              <form className="grid gap-5" onSubmit={handleFormSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="requester_name">Requester Name</Label>
                  <Input
                    disabled
                    defaultValue={donationRequestSingle.requester_name}
                    id="requester_name"
                    type="text"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requester_email">Requester Email</Label>
                  <Input
                    disabled
                    id="requester_email"
                    type="email"
                    defaultValue={donationRequestSingle.requester_email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recipient_name">Recipient Name</Label>
                  <Input
                    id="recipient_name"
                    type="text"
                    placeholder="Enter recipient name here"
                    defaultValue={donationRequestSingle.recipient_name}
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
                      defaultValue={donationRequestSingle.recipient_district}
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
                      defaultValue={donationRequestSingle.recipient_upazila}
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
                      defaultValue={donationRequestSingle.hospital_name}
                    />
                  </div>
                  <div className="col-span-2 grid gap-2 md:col-span-1">
                    <Label htmlFor="full_address">full Address</Label>
                    <Input
                      id="full_address"
                      type="text"
                      placeholder="Enter full address"
                      defaultValue={donationRequestSingle.full_address}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="request_message">Request Message</Label>
                  <Textarea
                    id="request_message"
                    placeholder="Type your message here."
                    defaultValue={donationRequestSingle.request_message}
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

export default UpdateDonationRequest;
