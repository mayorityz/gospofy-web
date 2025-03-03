import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="bg-gold-900/10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gold-900 font-Montserrat mb-6">
            Start Sharing Your Gospel Content Today
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of gospel artists, pastors, and podcasters who are
            reaching millions of believers worldwide through Gospofy.
          </p>
          <Button
            size="lg"
            className="bg-gold-900 hover:bg-gold-900/90 text-white px-8"
          >
            Create Your Account
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
