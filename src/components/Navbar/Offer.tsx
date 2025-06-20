import { ChevronLeft, ChevronRight } from "lucide-react";

const Offer = () => {
  return (
    <div className="bg-accent">
      <div className="container mx-auto px-6">
        <div className="flex gap-4 items-center justify-center lg:py-2 py-1 text-sm">
          <ChevronLeft size={18} className="cursor-pointer" />
          <p className="lg:font-medium ">Get 10% off on business sign up</p>
          <ChevronRight size={18} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Offer;
