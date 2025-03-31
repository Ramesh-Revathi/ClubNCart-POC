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
  <div className="flex-1 lg:w-3/6 relative">
  {/* Redeem Section */}
  <div className="pb-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-100 to-white overflow-hidden relative">
    {/* 3D Gradient Effect */}
    <div
      className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-green-300 to-transparent opacity-50 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: -1 }}
    ></div>
    <div
      className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-t from-green-200 to-transparent opacity-40 rounded-full filter blur-2xl transform translate-x-1/3 translate-y-1/3"
      style={{ zIndex: -1 }}
    ></div>

    {/* Bill Details */}
    <div className="p-6">
      <div className="flex items-center text-sm mb-4">
        <p className="mr-4 text-gray-700 font-semibold">
          Bill Details <span className="pl-1 text-xs text-gray-500">{`(${item} Item)`}</span>
        </p>
        <hr
          className="flex-grow border-0 h-[1px]"
          style={{
            background: "linear-gradient(to right, #d1d5db, #ffffff)",
          }}
        />
      </div>

      {/* Bill Breakdown */}
      <div className="bg-white rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
        <div className="p-4">
          <div className="flex justify-between pb-4 font-medium">
            <p className="text-sm text-gray-800">Items Total</p>
            <p className="text-sm text-gray-800">₹{productTotalAmount}</p>
          </div>
          <div className="flex justify-between pb-4">
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
          <div className="flex justify-between pb-4">
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
          <div className="flex justify-between pb-4">
            <p className="text-sm text-gray-800 font-semibold">Order Total</p>
            <p className="text-sm text-gray-800 font-semibold">₹{grandTotal}</p>
          </div>
        </div>

        {/* Amount Payable */}
        <div
          className="w-full h-28 bg-cover bg-bottom rounded-b-xl"
          style={{
            backgroundImage:
              "url('https://www.kpnfresh.com/_next/static/media/netPayableBG.5b4e8d54.png')",
          }}
        >
          <div className="flex justify-between items-center p-4 text-gray-800">
            <p className="text-sm font-medium">Amount Payable</p>
            <p className="text-sm font-medium">₹{grandTotal}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Payment Mode */}
  <div className="mt-5">
    <div className="flex items-center text-sm mb-4">
      <p className="mr-4 text-gray-700 font-semibold">Payment Mode</p>
      <hr
        className="flex-grow border-0 h-[1px]"
        style={{
          background: "linear-gradient(to right, #d1d5db, #ffffff)",
        }}
      />
    </div>
    <div className="bg-white flex flex-col rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transform transition-transform duration-300">
      <ul className="w-full">
        <li className="w-full border-b last:border-b-0 hover:bg-gray-100">
          <label
            htmlFor="ONLINE"
            className="cursor-pointer w-full flex items-center py-4 px-4 justify-between"
          >
            <div className="flex items-start">
              <img
                className="w-5 h-5 mr-2"
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
              className="w-6"
              src="https://www.kpnfresh.com/_next/static/media/unSelectedRadioIconWhite.f9dc0104.svg"
              alt="Not Selected"
            />
          </label>
        </li>
        <li className="w-full hover:bg-gray-100">
          <label
            htmlFor="PAY-ON-DELIVERY"
            className="cursor-pointer w-full flex items-center py-4 px-4 justify-between"
          >
            <div className="flex items-start">
              <img
                className="w-5 h-5 mr-2"
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
              className="w-6"
              src="https://www.kpnfresh.com/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg"
              alt="Selected"
            />
          </label>
        </li>
      </ul>
      <p className="text-xs text-red-500 mt-2 px-4">
        We recommend you use the online payment mode for contactless delivery.
      </p>
    </div>
  </div>
</div>

 </OrderSummaryComponentWrapper>
)};

export default OrderSummaryComponent;
