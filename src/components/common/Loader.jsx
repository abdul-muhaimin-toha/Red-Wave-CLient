import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottieJson/loading.json";

const Loader = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex min-h-[calc(100vh-330px)] items-center justify-center">
          <Lottie
            animationData={groovyWalkAnimation}
            loop={true}
            className="mx-auto max-w-64"
          />
        </div>
      </div>
    </section>
  );
};

export default Loader;
