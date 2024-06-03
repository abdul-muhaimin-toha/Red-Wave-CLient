import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative z-30">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bg-hero-slider-1 bg-cover bg-center bg-no-repeat">
            <div className="min-h-[calc(100vh-72px)] w-full bg-gradient-to-b from-[#130e0ecb] to-[#130e0ecb] opacity-70"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-hero-slider-2 bg-cover bg-center bg-no-repeat">
            <div className="min-h-[calc(100vh-72px)] w-full bg-gradient-to-b from-[#130e0ecb] to-[#130e0ecb]  opacity-70"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-hero-slider-3 bg-cover bg-center bg-no-repeat">
            <div className="min-h-[calc(100vh-72px)] w-full bg-gradient-to-b from-[#130e0ecb] to-[#130e0ecb]  opacity-70"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-hero-slider-4 bg-cover bg-center bg-no-repeat">
            <div className="min-h-[calc(100vh-72px)] w-full bg-gradient-to-b from-[#130e0ecb] to-[#130e0eb0]  opacity-70"></div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="absolute left-1/2 top-1/2 z-50 flex  w-full -translate-x-1/2  -translate-y-1/2 items-center justify-center  p-10">
        <div className="flex max-w-full flex-col  text-center md:max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold uppercase text-white md:text-4xl">
            Join the Red Wave: Save Lives Through Blood Donation
          </h1>
          <p className="font-semibolod mb-8 text-xs text-white md:text-base">
            Connect with a Community of Donors and Volunteers, Share Your Story,
            and Make a Lasting Impact on Lives in Need. Your Contribution
            Matters More Than Ever.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row  md:gap-6">
            <Link to="/registration">
              <Button size="lg" className="uppercase">
                Join as a donor
              </Button>
            </Link>
            <Link to="/add-volunteer-post">
              <Button size="lg" className="uppercase">
                Search donors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
