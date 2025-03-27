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
    <div className="mt-5 mb-2">
      {/* Header */}
      <div className="flex items-center text-sm my-3">
        <p className="mr-4">Delivery Mode</p>
        <hr
          className="flex-grow"
          style={{
            background: "linear-gradient(to right, rgb(229, 229, 229), rgb(255, 255, 255))",
            border: "none",
            height: "1px",
          }}
        />
      </div>

      {/* Radio Group */}
      <div className="bg-white flex flex-col rounded-lg border border-gray-300">
        {/* Express Delivery Option */}
        <label
          className={`cursor-pointer rounded-lg py-4 px-3 flex justify-between items-start ${
            selectedMode === "EXPRESS" ? "bg-gray-100 border-orange-500" : "bg-white"
          }`}
          onClick={() => handleSelection("EXPRESS")}
        >
          <div className="h-full flex text-sm flex-col w-full">
            <div className="flex items-center">
              <img
                className="w-4 h-4 mr-1"
                src="https://services.kpnfresh.com/media/v1/static/images/express_delivery.png"
                alt="Express Delivery"
              />
              <span className="font-medium text-gray-800">Express Delivery</span>
            </div>
            <span className="ml-5 text-gray-500 font-normal">Delivering in 11 minutes</span>
          </div>
          <input
            type="radio"
            name="delivery_mode"
            value="EXPRESS"
            checked={selectedMode === "EXPRESS"}
            onChange={() => handleSelection("EXPRESS")}
            className="hidden"
          />
          {selectedMode === "EXPRESS" && (
            <img
              className="w-5"
              src="https://www.kpnfresh.com/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg"
              alt="Selected"
            />
          )}
        </label>

        {/* Scheduled Delivery Option */}
        <label
          className={`cursor-pointer rounded-lg py-4 px-3 flex flex-col ${
            selectedMode === "SCHEDULED" ? "bg-gray-100 border-orange-500" : "bg-white"
          }`}
          onClick={() => handleSelection("SCHEDULED")}
        >
          <div className="flex justify-between items-start">
            <div className="h-full flex text-sm flex-col w-full">
              <div className="flex items-center">
                <img
                  className="w-4 h-4 mr-1"
                  src="https://services.kpnfresh.com/media/v1/static/images/scheduled_delivery.png"
                  alt="Scheduled Delivery"
                />
                <span className="font-medium text-gray-800">Scheduled Delivery</span>
              </div>
              <span className="ml-5 text-gray-500 font-normal">Select preferred time</span>
            </div>
            <input
              type="radio"
              name="delivery_mode"
              value="SCHEDULED"
              checked={selectedMode === "SCHEDULED"}
              onChange={() => handleSelection("SCHEDULED")}
              className="hidden"
            />
            {selectedMode === "SCHEDULED" && (
              <img
                className="w-5"
                src="https://www.kpnfresh.com/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg"
                alt="Selected"
              />
            )}
          </div>

          {/* Time Selection (Visible for Scheduled Delivery) */}
          {selectedMode === "SCHEDULED" && (
            <div className="mt-2 ml-5 w-full">
              <div className="border-b border-gray-300">
                <button className="mr-4 py-2 text-sm focus:outline-none text-orange-500 border-b-2 border-orange-500">
                  Tomorrow
                </button>
              </div>
              <div className="mt-5">
                <div className="mt-3 flex gap-2.5 flex-wrap">
                  {["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM"].map((time) => (
                    <button
                      key={time}
                      className={`w-[140px] relative py-2.5 px-2 text-xs font-medium rounded-md border ${
                        selectedTime === time ? "border-orange-500 bg-gray-100" : "border-gray-300 bg-white"
                      }`}
                      onClick={() => handleTimeSelection(time)}
                    >
                      {time}
                      {selectedTime === time && (
                        <img
                          className="absolute top-2 right-2 w-4 h-4"
                          src="https://www.kpnfresh.com/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg"
                          alt="Selected"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
 </deliveryModeComponentCartWrapper>
)};

export default deliveryModeComponentCart;
