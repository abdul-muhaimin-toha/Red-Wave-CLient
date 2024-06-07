import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/auth/useAuth";
import useAxiosSecure from "@/hooks/axios/useAxiosSecure";

import useSingleDonationRequest from "@/hooks/getDataFromDB/useSingleDonationRequest";
import { useNavigate, useParams } from "react-router-dom";

const BloodDonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { donationRequestSingle, isDonationRequestSinglePending } =
    useSingleDonationRequest(id);

  const {
    recipient_name,
    recipient_upazila,
    recipient_district,
    requester_name,
    requester_email,
    donation_time,
    donation_date,
    hospital_name,
    full_address,
    request_message,
  } = donationRequestSingle;

  const handleDonateConfirm = (e) => {
    e.preventDefault();
    const updatedInfo = {
      donation_status: "inprogress",
      donor_name: user.displayName,
      donor_email: user.email,
      id,
    };
    axiosSecure
      .patch("/blood-donation-apply", updatedInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          console.log(res.data);
          toast({
            title: "Congratulations!",
            description: `Your donation accepted!`,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "Sorry!",
          description: `Your donation request failed!`,
        });
      });
  };

  if (isDonationRequestSinglePending) return <Loader />;

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center">
          <Card className="my-16 w-full md:my-24 md:w-4/5 md:p-3 lg:w-3/5 xl:w-2/5">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-semibold  uppercase">
                Help {recipient_name} by Donating Blood!
              </CardTitle>
              <CardDescription className="text-md">
                Your Blood Donation Can Give {recipient_name} and Others a
                Fighting Chance. Join Us in Making a Lifesaving Difference
                Today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h4 className="text-2xl font-bold">
                  Recepient Name: {recipient_name}
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-400">
                      Recepient Address:
                    </p>
                    <p>
                      {recipient_upazila}, {recipient_district}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-400">Requested By:</p>
                    <p>{requester_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-400">
                      Requester Email:
                    </p>
                    <p>{requester_email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-400">
                      Donation Time:
                    </p>
                    <p>{donation_time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-400">
                      Donation Date:
                    </p>
                    <p>{new Date(donation_date).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-400">
                      Hospital Details:
                    </p>
                    <p>{hospital_name}</p>
                    <p>{full_address}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-400">
                      Request Message:
                    </p>
                    <p>{request_message}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  {user.email === requester_email ? (
                    <p className="mx-auto text-center text-lg font-bold text-primary">
                      Sorry You can&apos;t Donate on your own requested post
                    </p>
                  ) : (
                    <Button className="w-full" type="button">
                      Donate
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="uppercase">
                      Confirm to Donate
                    </DialogTitle>
                    <DialogDescription>
                      Confirm your name and email to donate!
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleDonateConfirm}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="donor_name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="donor_name"
                          disabled
                          defaultValue={user.displayName}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="donor_email" className="text-right">
                          Email
                        </Label>
                        <Input
                          type="email"
                          id="donor_email"
                          disabled
                          defaultValue={user.email}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Confirm Now</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BloodDonationRequestDetails;
