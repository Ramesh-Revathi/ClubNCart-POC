import React, { FC, useState } from 'react';
import { deliveryModeComponentCartWrapper } from './deliveryModeComponentCart.styled';

interface deliveryModeComponentCartProps {}

const deliveryModeComponentCart: FC<deliveryModeComponentCartProps> = () => {
   const [selectedMode, setSelectedMode] = useState("EXPRESS");
   const [selectedTime, setSelectedTime] = useState("");
 
   const handleSelection = (mode: string) => {
     setSelectedMode(mode);
   };
 
   const handleTimeSelection = (time: string) => {
     setSelectedTime(time);
   };
   return (
 <deliveryModeComponentCartWrapper data-testid="deliveryModeComponentCart">
  <div className="mt-5 mb-2 px-1">
  {/* Header */}
  <div className="flex items-center text-sm my-3">
    <p className="mr-4 text-gray-700 font-semibold">Delivery Mode</p>
    <hr className="flex-grow border-t border-gray-300" />
  </div>

  {/* Delivery Mode Container */}
  <div className="bg-white flex flex-col rounded-lg border border-gray-300 shadow-sm">

    {/* Express Delivery Option */}
    <label
      className={`cursor-pointer flex items-center justify-between py-4 px-4 rounded-t-lg transition-all ${
        selectedMode === "EXPRESS" ? "bg-[rgba(255,183,0,0.15)] border-l-4 border-[rgba(255,183,0,0.95)]" : "bg-white"
      }`}
      onClick={() => handleSelection("EXPRESS")}
    >
      <div className="flex items-center space-x-3">
        <img className="w-6 h-6" src="https://services.kpnfresh.com/media/v1/static/images/express_delivery.png" alt="Express" />
        <div>
          <p className="font-medium text-gray-800">Express Delivery</p>
          <p className="text-xs text-gray-500">Arrives in 11 minutes</p>
        </div>
      </div>
      <input type="radio" name="delivery_mode" value="EXPRESS" className="hidden" />
      {selectedMode === "EXPRESS" && (
        <img className="w-5" src="https://www.kpnfresh.com/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg" alt="Selected" />
      )}
    </label>

    {/* Scheduled Delivery Option */}
    <label
      className={`cursor-pointer flex flex-col py-4 px-4 rounded-b-lg transition-all ${
        selectedMode === "SCHEDULED" ? "bg-[rgba(255,183,0,0.15)] border-l-4 border-[rgba(255,183,0,0.95)]" : "bg-white"
      }`}
      onClick={() => handleSelection("SCHEDULED")}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img className="w-6 h-6" src="https://services.kpnfresh.com/media/v1/static/images/scheduled_delivery.png" alt="Scheduled" />
          <div>
            <p className="font-medium text-gray-800">Scheduled Delivery</p>
            <p className="text-xs text-gray-500">Pick a time slot</p>
          </div>
        </div>
        <input type="radio" name="delivery_mode" value="SCHEDULED" className="hidden" />
        {selectedMode === "SCHEDULED" && (
          <img className="w-5" src="https://www.kpnfresh.com/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg" alt="Selected" />
        )}
      </div>

      {/* Time Selection (Only Visible for Scheduled Delivery) */}
      {selectedMode === "SCHEDULED" && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-600">Available Slots</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM"].map((time) => (
              <button
                key={time}
                className={`py-2 text-sm font-medium rounded-lg border transition ${
                  selectedTime === time ? "border-[rgba(255,183,0,0.95)] bg-[rgba(255,183,0,0.15)]" : "border-gray-300 bg-white"
                }`}
                onClick={() => handleTimeSelection(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </label>
  </div>
</div>
 </deliveryModeComponentCartWrapper>
)};

export default deliveryModeComponentCart;
