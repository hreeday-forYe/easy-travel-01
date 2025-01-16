import { Button } from "./ui/button";

const Top = () => {
  return (
    <>
      <section className="px-4 md:px-10 lg:px-20 mt-[120px]  mb-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-0">
          <div className="flex-1">
            <p className="font-bold text-lg text-[#586BAF] mt-5 md:mt-0">
              Get Started
            </p>

            <h1 className="font-bold sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight hidden md:block">
              We <span className="text-[#586BAF]">Guarantee</span> <br />
              The Worthiness Of <br /> Every{" "}
              <span className="text-[#586BAF]">Money</span> Transaction.
            </h1>

            <h1 className="font-bold text-4xl  leading-snug md:hidden ">
              We <span className="text-[#586BAF]">Guarantee</span> The
              Worthiness Of Every <span className="text-[#586BAF]">Money</span>{" "}
              Transaction.
            </h1>
            <p className="my-7 font-semibold text-lg  ">
              The easy-to-use zero-based budgeting app that helps you keep tabs
              on your money at a glance—anytime, anywhere.
            </p>
            <Button>Create Your Free Account</Button>
          </div>
          <div className="-mt-12">
            <img
              src="./girl3.png"
              alt="bg"
              className=" h-auto  w-[400px] sm:w-[420px] md:w-[400px] lg:w-[480px]"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Top;