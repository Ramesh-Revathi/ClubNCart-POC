import React from "react";
import { DeliveryInstructionsWrapper } from './DeliveryInstructions.styled';

interface DeliveryInstructionsProps {}

const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = () => {
  return (
   <DeliveryInstructionsWrapper data-testid="DeliveryInstructions">
        <div className="mt-5 hidden">
          <div className="flex items-center text-sm my-3">
            <p className="mr-4">Redeem</p>
            <hr
              className="flex-grow border-0 h-[1px]"
              style={{
                background: "linear-gradient(to right, rgb(229, 229, 229), rgb(255, 255, 255))",
              }}
            />
          </div>
        </div>
    <div className="rounded-lg bg-white border border-gray-200 text-sm mb-2.5 lg:w-[500px]">
      <div className="cursor-pointer">
        <div className="px-3 pt-4 pb-3 flex justify-between items-center">
          {/* Icon and Text */}
          <div className="flex items-center">
            <img
              className="w-4 h-4 mr-1"
              src="https://services.kpnfresh.com/media/v1/static/images/delivery_partner_instructions.png"
              alt="icon"
            />
            <span className="font-medium text-gray-800">Add Delivery Instructions</span>
          </div>

          {/* Arrow Icon */}
          <div className="transform rotate-90 text-lg text-gray-800"> &gt; </div>
        </div>
      </div>
    </div>
                      {/* Coupon Section */}
                      <div className="border border-gray-300 rounded-lg mb-2.5 cursor-pointer">
            <div className="py-4 px-3 flex justify-between items-center">
              <div className="flex-1">
                <p className="text-sm">Apply Coupon</p>
              </div>
              <div className="text-md"> &gt; </div>
            </div>
          </div>
    </DeliveryInstructionsWrapper>
  );
};

export default DeliveryInstructions;
