import ContactUs from "@/components/HomePage/ContactUs";
import FeaturedDonationRequest from "@/components/HomePage/FeaturedDonationRequest";
import Hero from "@/components/HomePage/Hero";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Red Wave</title>
      </Helmet>
      <Hero />
      <FeaturedDonationRequest />
      <ContactUs />
    </>
  );
};

export default HomePage;
