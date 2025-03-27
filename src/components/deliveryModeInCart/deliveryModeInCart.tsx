import React, { FC } from 'react';
import { deliveryModeInCartWrapper } from './deliveryModeInCart.styled';

interface deliveryModeInCartProps {}

const deliveryModeInCart: FC<deliveryModeInCartProps> = () => {
   return (
 <deliveryModeInCartWrapper data-testid="deliveryModeInCart">
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

      {/* Delivery Options */}
      <div className="bg-white flex flex-col rounded-lg border border-gray-300">
        <ul className="w-full h-full">
          {/* Express Delivery */}
          <li className="w-full h-full last:mb-0 opacity-100">
            <input
              className="w-0 h-0 opacity-0 absolute"
              name="delivery_mode"
              type="radio"
              id="EXPRESS"
              value="EXPRESS"
            />
            <label className="cursor-pointer w-full" htmlFor="EXPRESS">
              <div className="rounded-lg bg-white py-4 px-3">
                <div className="flex justify-between items-start mb-1 w-full">
                  <div className="h-full flex text-sm flex-col w-full">
                    <div>
                      <div className="flex items-center">
                        <img
                          className="w-4 h-4 mr-1 cursor-pointer"
                          src="https://services.kpnfresh.com/media/v1/static/images/express_delivery.png"
                          alt="icon"
                        />
                        <span className="font-medium text-gray-800">Express Delivery</span>
                      </div>
                    </div>
                    <div className="ml-5">
                      <span className="font-normal text-gray-500">Delivering in 11 minutes</span>
                    </div>
                  </div>
                  <img
                    className="w-5"
                    src="/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg"
                    alt="delivery method not selected"
                  />
                </div>
              </div>
            </label>
          </li>

          {/* Scheduled Delivery */}
          <li className="w-full h-full last:mb-0 opacity-100">
            <input
              className="w-0 h-0 opacity-0 absolute"
              name="delivery_mode"
              type="radio"
              id="SCHEDULED"
              value="SCHEDULED"
            />
            <label className="cursor-pointer w-full" htmlFor="SCHEDULED">
              <div className="rounded-lg bg-white py-4 px-3">
                <div className="flex justify-between items-start mb-1 w-full">
                  <div className="h-full flex text-sm flex-col w-full">
                    <div>
                      <div className="flex items-center">
                        <img
                          className="w-4 h-4 mr-1 cursor-pointer"
                          src="https://services.kpnfresh.com/media/v1/static/images/scheduled_delivery.png"
                          alt="icon"
                        />
                        <span className="font-medium text-gray-800">Scheduled Delivery</span>
                      </div>
                    </div>
                    <div className="ml-5">
                      <span className="font-normal text-gray-500">Select preferred time</span>
                    </div>
                    <div className="mt-2 ml-5 w-full">
                      <div className="border-b border-gray-300">
                        <button className="mr-4 py-2 text-sm focus:outline-none text-orange-500 border-b-2 border-orange-500">
                          Tomorrow
                        </button>
                      </div>
                      <div className="mt-5">
                        <div className="mt-3 flex gap-2.5 flex-wrap">
                          <button className="w-[140px] relative py-2.5 px-2 text-xs font-medium rounded-md border border-gray-300 bg-white">
                            7 AM - 8 AM
                          </button>
                          <button className="w-[140px] relative py-2.5 px-2 text-xs font-medium rounded-md border border-gray-300 bg-white">
                            8 AM - 9 AM
                          </button>
                          <button className="w-[140px] relative py-2.5 px-2 text-xs font-medium rounded-md border border-gray-300 bg-white">
                            9 AM - 10 AM
                          </button>
                          <button className="w-[140px] relative py-2.5 px-2 text-xs font-medium rounded-md border border-gray-300 bg-white">
                            10 AM - 11 AM
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </div>
 </deliveryModeInCartWrapper>
)};

export default deliveryModeInCart;
