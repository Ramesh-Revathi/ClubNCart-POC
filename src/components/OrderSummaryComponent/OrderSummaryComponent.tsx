import React, { FC, useEffect } from 'react';
import { OrderSummaryComponentWrapper } from './OrderSummaryComponent.styled';

interface OrderSummaryComponentProps {
  productTotalAmount:number,
  item:number,
  deliveryFee:number,
  handlingFee:number,
  grandTotal:number
}

const OrderSummaryComponent: FC<OrderSummaryComponentProps> = ({
  productTotalAmount,item,deliveryFee,handlingFee,grandTotal
}) => {
  useEffect(() => {

  },[productTotalAmount,item,deliveryFee,handlingFee,grandTotal])
  return (
 <OrderSummaryComponentWrapper data-testid="OrderSummaryComponent">
    <div className="flex-1 lg:w-3/6">
      {/* Redeem Section */}
      <div className="pb-2.5">

        {/* Bill Details */}
        <div>
          <div className="flex items-center text-sm my-3">
            <p className="mr-4">
              Bill Details <span className="pl-1 text-xs text-gray-400">{'('}{item} Item{')'} </span>
            </p>
            <hr
              className="flex-grow border-0 h-[1px]"
              style={{
                background: "linear-gradient(to right, rgb(229, 229, 229), rgb(255, 255, 255))",
              }}
            />
          </div>

          {/* Bill Breakdown */}
          <div className="border border-gray-300 bg-white rounded-t-xl">
            <div className="p-3">
              <div className="flex justify-between pb-3 font-medium">
                <p className="text-sm text-gray-800">Items Total</p>
                <p className="text-sm text-gray-800">₹{productTotalAmount}</p>
              </div>
              <div className="flex justify-between pb-2.5">
                <p className="text-sm text-gray-600 flex items-center">
                  Delivery Fee
                  <img
                    className="w-4 h-4 ml-1 cursor-pointer"
                    src="https://services.kpnfresh.com/media/v1/static/images/info_icon.png"
                    alt="Info Icon"
                  />
                </p>
                <p className="text-sm text-gray-800">₹{deliveryFee}</p>
              </div>
              <div className="flex justify-between pb-2.5">
                <p className="text-sm text-gray-600 flex items-center">
                  Handling Fee
                  <img
                    className="w-4 h-4 ml-1 cursor-pointer"
                    src="https://services.kpnfresh.com/media/v1/static/images/info_icon.png"
                    alt="Info Icon"
                  />
                </p>
                <p className="text-sm text-gray-800">₹{handlingFee}</p>
              </div>
              <div className="flex justify-between pb-2.5">
                <p className="text-sm text-gray-800">Order Total</p>
                <p className="text-sm text-gray-800">₹{grandTotal}</p>
              </div>
            </div>

            {/* Amount Payable */}
            <div
              className="w-full h-24 bg-cover bg-bottom"
              style={{
                backgroundImage:
                  "url('https://www.kpnfresh.com/_next/static/media/netPayableBG.5b4e8d54.png')",
              }}
            >
              <div className="flex justify-between items-center p-2.5 text-gray-800">
                <p className="text-sm font-medium">Amount Payable</p>
                <p className="text-sm font-medium">₹{grandTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Mode */}
      <div className="hidden mt-5 mb-2">
        <div className="flex items-center text-sm my-3">
          <p className="mr-4">Payment Mode</p>
          <hr
            className="flex-grow border-0 h-[1px]"
            style={{
              background: "linear-gradient(to right, rgb(229, 229, 229), rgb(255, 255, 255))",
            }}
          />
        </div>

        <div className="bg-white flex flex-col rounded-lg border border-gray-300">
          <ul className="w-full">
            <li className="w-full border-b last:border-b-0">
              <label
                htmlFor="ONLINE"
                className="cursor-pointer w-full flex items-center py-4 px-3 justify-between"
              >
                <div className="flex items-start">
                  <img
                    className="w-4 h-4 mr-2"
                    src="https://services.kpnfresh.com/media/v1/static/images/payment-options-online.svg?channel=and"
                    alt="Online Icon"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">ONLINE</p>
                    <p className="text-xs text-gray-500">
                      Credit card, Debit Card, Net Banking, UPI
                    </p>
                  </div>
                </div>
                <img
                  className="w-5"
                  src="https://www.kpnfresh.com/_next/static/media/unSelectedRadioIconWhite.f9dc0104.svg"
                  alt="Not Selected"
                />
              </label>
            </li>
            <li className="w-full">
              <label
                htmlFor="PAY-ON-DELIVERY"
                className="cursor-pointer w-full flex items-center py-4 px-3 justify-between"
              >
                <div className="flex items-start">
                  <img
                    className="w-4 h-4 mr-2"
                    src="https://services.kpnfresh.com/media/v1/static/images/payment-options-cod.svg?channel=and"
                    alt="COD Icon"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">COD</p>
                    <p className="text-xs text-gray-500">
                      Pay cash at the time of delivery
                    </p>
                  </div>
                </div>
                <img
                  className="w-5"
                  src="https://www.kpnfresh.com/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg"
                  alt="Selected"
                />
              </label>
            </li>
          </ul>
          <p className="text-xs text-red-500 mt-2">
            We recommend you use the online payment mode for contactless delivery.
          </p>
        </div>
      </div>
    </div>
 </OrderSummaryComponentWrapper>
)};

export default OrderSummaryComponent;
