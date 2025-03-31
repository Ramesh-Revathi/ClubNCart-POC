import React from "react";
import { DeliveryInstructionsWrapper } from './DeliveryInstructions.styled';

interface DeliveryInstructionsProps {}

const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = () => {
  return (
   <DeliveryInstructionsWrapper data-testid="DeliveryInstructions">
    <div className="mt-5 hidden">
  <div className="flex items-center text-sm my-3">
    <p className="mr-4 font-semibold text-gray-700">Redeem</p>
    <hr className="flex-grow border-0 h-[1px] bg-gradient-to-r from-gray-300 to-transparent" />
  </div>
</div>

{/* Delivery Instructions */}
<div className="rounded-xl bg-white border border-gray-200 shadow-sm text-sm mb-3 p-3 hover:shadow-md transition-all duration-300">
  <div className="cursor-pointer flex justify-between items-center">
    {/* Icon & Text */}
    <div className="flex items-center space-x-2">
      <img
        className="w-5 h-5"
        src="https://services.kpnfresh.com/media/v1/static/images/delivery_partner_instructions.png"
        alt="icon"
      />
      <span className="font-medium text-gray-800">Add Delivery Instructions</span>
    </div>

    {/* Arrow Icon */}
    <div className="text-lg text-gray-600 transition-transform duration-200 group-hover:rotate-90">
      &gt;
    </div>
  </div>
</div>

{/* Coupon Section */}
<div className="border border-gray-300 rounded-xl bg-white shadow-sm mb-3 p-3 cursor-pointer hover:shadow-md transition-all duration-300">
  <div className="flex justify-between items-center">
    <p className="text-sm font-medium text-gray-800">Apply Coupon</p>
    <div className="text-lg text-gray-600 transition-transform duration-200 group-hover:rotate-90">
      &gt;
    </div>
  </div>
</div>
    </DeliveryInstructionsWrapper>
  );
};

export default DeliveryInstructions;
