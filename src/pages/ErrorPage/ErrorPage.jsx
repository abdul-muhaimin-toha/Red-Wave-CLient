import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottieJson/error-animation.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <section>
      <Helmet>
        <title>Red Wave - Error</title>
      </Helmet>
      <div className="mx-auto max-w-screen-2xl px-2">
        <div className="flex flex-col items-center justify-center">
          <Lottie
            animationData={groovyWalkAnimation}
            loop={true}
            className="mx-auto max-w-64 pb-12 pt-28"
          />
          <p className="mb-3 text-lg font-black uppercase text-secondary-foreground">
            Page not Found!
          </p>
          <Link to="/">
            <Button size="sm" className="space-x-2">
              <FaArrowLeft className="animate-pulse" />
              <span>Go Back Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
