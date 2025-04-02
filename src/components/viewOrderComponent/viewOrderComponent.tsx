import React, { FC, useEffect, useState } from 'react';
import { viewOrderComponentWrapper } from './viewOrderComponent.styled';
import DeliveryModeComponentCart from '../deliveryModeComponentCart/deliveryModeComponentCart';
import DeliveryInstructions from '../DeliveryInstructions/DeliveryInstructions';
import OrderSummaryComponent from '../OrderSummaryComponent/OrderSummaryComponent';
import { getOrder } from '../../services/auth-handler.service';

const ViewOrderComponent: FC = () => {
  const [userdata, setUserData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0.00);
  const [handlingFee, setHandlingFee] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0.00);
  const [gtotal, setGrandTotal] = useState<number>(0.00);
  const [orderDetail, setOrderDetail] = useState<any[]>([]);
  const [orderData, setOrderData] = useState<any>();
  const [openOrder, setOpenOrder] = useState<number | null>(null);

  useEffect(() => {
    const userDataFromStorage = sessionStorage.getItem('userData');
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage).user);
    }
  }, []);

  useEffect(() => {
    if (userdata) {
      getOrderFun();
    }
  }, [userdata]);

  const getOrderFun = async () => {
    try {
      if (!userdata?.mobile) {
        console.error('User data is missing or invalid.');
        return;
      }

      const response = await getOrder({ mobile: userdata.mobile });

      if (response?.status === 200) {
        if (response?.data?.orderitems) {
          console.log(response.data.orderitems);
          setOrderDetail(response?.data?.orderitems);
          setOrderData(response?.data?.orderitems);
        }
        cartTimesCalculation(response.data.orderitems.product);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch order.');
      }
    } catch (error) {
      console.error('Error while fetching order:', error);
    }
  };

  const cartTimesCalculation = (items: any) => {
    let totalQty = 0;
    let totalPrice = 0;
    items.forEach((item: any) => {
      totalPrice += parseFloat(item.product.price) * item.quantity;
      totalQty += item.quantity;
    });

    setCartItems(totalQty);
    setTotalAmount(totalPrice);
  };

  useEffect(() => {
    const deliverFeePrice = cartItems * 2;
    const handlingFeePrice = 2;
    setDeliveryFee(deliverFeePrice);
    setHandlingFee(handlingFeePrice);
    setGrandTotal(totalAmount + deliverFeePrice + handlingFeePrice);
  }, [cartItems, totalAmount]);

  // Handle the toggle for expanding/collapsing orders
  const toggleOrder = (index: number) => {
    setOpenOrder(openOrder === index ? null : index);
  };

  return (
    <viewOrderComponentWrapper data-testid="viewOrderComponent">
      <div className="p-0 bg-green-100">
        {/* 🌟 Sticky Order Header */}
        <header className="hidden fixed top-0 left-0 w-full bg-gradient-to-r from-green-500 to-green-600 shadow-xl z-20 flex items-center px-4 py-3 rounded-b-2xl">
          <a href="/" className="w-8">
            <img
              src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg"
              alt="Back"
            />
          </a>
          <div className="flex-grow text-lg font-semibold text-white text-center tracking-wide">
            Your Orders
          </div>
          <a href="/search">
            <img
              width="24"
              height="24"
              src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg"
              alt="Search"
            />
          </a>
        </header>

        {/* 🌟 Main Content */}
        <div className="container pt-[80px]">
          <div className="w-full p-3 bg-gradient-to-b from-green-400 to-green-200 shadow-lg rounded-xl text-center animate-fade-in">
            <span className="font-medium text-lg text-gray-900">🚀 Delivering in 11 minutes</span>
          </div>

          {/* 🌟 Orders List */}
          <h2 className="font-semibold text-xl text-green-800 mt-6 tracking-wide">Your Orders</h2>
          <div className="space-y-4 pt-4">
            {orderDetail.map((order: any, orderIndex: number) => (
              <div
                key={orderIndex}
                className="bg-white shadow-xl rounded-xl p-4 transition-all duration-300 hover:shadow-2xl hover:bg-green-50"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOrder(orderIndex)}
                >
                  <span className="text-md font-medium text-gray-800">{`Order #${order.orderID}`}</span>
                  <span className="text-green-600">
                    {openOrder === orderIndex ? 'Collapse' : 'Expand'}
                  </span>
                </div>

                {openOrder === orderIndex && (
                  <div className="pt-4">
                    {/* 🌟 Ordered Items */}
                    <h3 className="font-semibold text-lg text-green-800 mt-4">Ordered Items</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {order.product.map((pitem: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-green-50"
                        >
                          <div className="w-20 h-20 border border-green-300 rounded-full flex justify-center items-center bg-gradient-to-r from-green-100 to-white shadow-md">
                            <img
                              src={pitem.product.image}
                              className="max-w-full object-contain"
                              alt={pitem.product.name}
                            />
                          </div>
                          <span className="text-md font-medium text-gray-800 mt-3">
                            {pitem.product.name}
                          </span>
                          <span className="text-green-700 text-lg font-bold">
                            ₹{pitem.product.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 🌟 Order Summary */}
                    <div className="mt-6 bg-white shadow-md rounded-xl p-4 border border-green-300">
                      <h4 className="font-semibold text-lg text-green-800">Order Summary</h4>
                      <div className="text-green-700 font-medium">
                        <div>Payment Mode: {order.paymentMode}</div>
                        <div>Total Amount: ₹{order.productTotalAmount}</div>
                        <div>Delivery Fee: ₹{order.deliveryfee}</div>
                        <div>Handling Fee: ₹{order.handlingfee}</div>
                        <div className="mt-2 text-lg font-bold">Grand Total: ₹{order.payableAmount}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </viewOrderComponentWrapper>
  );
};

export default ViewOrderComponent;
