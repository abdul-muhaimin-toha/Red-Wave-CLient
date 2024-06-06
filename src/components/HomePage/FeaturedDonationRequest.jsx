import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import FeaturedDonationCard from "./FeaturedDonationCard";

const FeaturedDonationRequest = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center ">
          <Card className="my-16 w-full border-0 md:my-24 md:w-5/6 md:p-3 lg:w-4/5 xl:w-4/5">
            <CardHeader className="space-y-2">
              <CardTitle className="text-center text-3xl  font-semibold uppercase">
                Recent blood donation request
              </CardTitle>
              <CardDescription className="text-md text-center">
                Urgent Blood Donation Needed: Help Save Lives Today!
              </CardDescription>
            </CardHeader>
            <CardContent className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeaturedDonationCard />
              <FeaturedDonationCard />
              <FeaturedDonationCard />
              <FeaturedDonationCard />
              <FeaturedDonationCard />
              <FeaturedDonationCard />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonationRequest;

// {new Date(donation_date).toLocaleDateString()}