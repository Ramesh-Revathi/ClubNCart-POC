import React, { FC, useEffect, useState } from 'react';
import { OrderSummaryComponentWrapper } from './OrderSummaryComponent.styled';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderSummaryComponentProps {
  productTotalAmount: number,
  item: number,
  deliveryFee: number,
  handlingFee: number,
  grandTotal: number
}

const OrderSummaryComponent: FC<OrderSummaryComponentProps> = ({
  productTotalAmount, item, deliveryFee, handlingFee, grandTotal
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  useEffect(() => {

  }, [productTotalAmount, item, deliveryFee, handlingFee, grandTotal])
  return (
    <OrderSummaryComponentWrapper data-testid="OrderSummaryComponent">
      <div className="w-full max-w-md mx-auto p-2 md:p-4">
        {/* Bill Details Header */}
        <div className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
          <div className="flex items-center space-x-2">
            <img className="w-4 h-4" src="https://services.kpnfresh.com/media/v1/static/images/info_icon.png" alt="Bill Icon" />
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Bill Details
              <span className="text-xs md:text-sm text-gray-500 pl-1">({item} Items)</span>
            </h2>
          </div>
          <button
            className="flex items-center text-xs md:text-sm text-orange-600 hover:text-orange-700 transition-all whitespace-nowrap"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            {showBreakdown ? "Hide Breakdown" : "View Breakdown"}
            {showBreakdown ? (
              <ChevronUpIcon className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            )}
          </button>
        </div>

        {/* Bill Breakdown (Collapsible) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: showBreakdown ? "auto" : 0, opacity: showBreakdown ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {showBreakdown && (
            <div className="border border-gray-200 bg-white rounded-lg shadow-md mt-2 p-3 md:p-4">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-800 font-medium">
                  <p className="text-sm">Items Total</p>
                  <p className="text-sm">₹{productTotalAmount}</p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p className="text-sm flex items-center">
                    Delivery Fee
                    <img className="w-3 h-3 ml-1 cursor-pointer" src="https://services.kpnfresh.com/media/v1/static/images/info_icon.png" alt="Info Icon" />
                  </p>
                  <p className="text-sm text-gray-800">₹{deliveryFee}</p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p className="text-sm flex items-center">
                    Handling Fee
                    <img className="w-3 h-3 ml-1 cursor-pointer" src="https://services.kpnfresh.com/media/v1/static/images/info_icon.png" alt="Info Icon" />
                  </p>
                  <p className="text-sm text-gray-800">₹{handlingFee}</p>
                </div>
                <div className="flex justify-between border-t pt-2 border-gray-300 text-base font-semibold text-gray-900">
                  <p>Order Total</p>
                  <p>₹{grandTotal}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </OrderSummaryComponentWrapper>
  )
};

export default OrderSummaryComponent;
