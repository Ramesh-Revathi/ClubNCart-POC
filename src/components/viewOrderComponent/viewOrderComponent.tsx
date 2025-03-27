import React, { FC, useEffect, useState } from 'react';
import { viewOrderComponentWrapper } from './viewOrderComponent.styled';
import DeliveryModeComponentCart from '../deliveryModeComponentCart/deliveryModeComponentCart';
import DeliveryInstructions from '../DeliveryInstructions/DeliveryInstructions';
import OrderSummaryComponent from '../OrderSummaryComponent/OrderSummaryComponent';
import { getOrder } from '../../services/auth-handler.service';

interface viewOrderComponentProps { }

const viewOrderComponent: FC<viewOrderComponentProps> = () => {
  const [userdata, setUserData] = useState<any>();
  let orderItem, gTotal, productTotalAmount:number;
  const [isLoading, setIsLoading] = useState<boolean>(true);
    let [cartItems, setCartItems] = useState<number>(0);
    let [totalAmount, setTotalAmount] = useState<number>(0.00);
    let [handlingFee, sethandlingFee] = useState<number>(0);
    let [deliveryFee, setdeliveryFee] = useState<number>(0.00);
    let [gtotal, setGrandTotal] = useState<number>(0.00);
    
    let [orderDetail, setOrderDetail] = useState<any[]>([]);
    let [orderData, setOrderData] = useState<any>();
    // Fetch userdata on initial render
    useEffect(() => {
      const userDataFromStorage = localStorage.getItem("userData");
      if (userDataFromStorage) {
        setUserData(JSON.parse(userDataFromStorage));
      }
    }, []);
  
    // Call getOrderFun when userdata is available
    useEffect(() => {
      if (userdata) {
        getOrderFun();
      }
    }, [userdata]);

  const getOrderFun = async () => {
    try {
      if (!userdata || !userdata.mobile) {
        console.error("User data is missing or invalid. Cannot place order.");
        return;
      }

      const payload = {
        mobile: userdata.mobile
      };

      console.log("Placing order with payload:", payload);

      const response = await getOrder(payload);

      if (response?.status === 200) {
        if(response?.data?.orderitems){
          cartTimesCalculation(response.data.orderitems.product);
          setOrderDetail(response.data.orderitems.product);
          setOrderData(response.data.orderitems)
          console.log("Order Get successfully:", response);
        }
        setIsLoading(false);
        // Add any additional acti)ons here, like updating UI or state
      } else {
        console.error("Failed to place order. Response:", response);
      }
    } catch (error) {
      console.error("Error while placing order:", error);
    }
  };


  const cartTimesCalculation = (items: any) => {
    console.log(items)
    items.forEach((item: any) => {
      console.log("item",item);
      const price: number = parseFloat(item.product.price) * item.quantity;
      const objquantity: number = item.quantity;

      // Use functional updates to work with the latest state
      setCartItems((prevCartItems) => prevCartItems + objquantity);
      setTotalAmount((prevTotalAmount) => prevTotalAmount + price);
      console.log("cartItems",cartItems);
      console.log("setTotalAmount",totalAmount);
    });
  };

    useEffect(() => {
      console.log(cartItems);
      //setCartItems(data[0].item);
      const deliverFeePrice = cartItems * 2;
      const handlingFeePrice = 2;
      setdeliveryFee(deliverFeePrice);
      sethandlingFee(handlingFeePrice);
      const gtotal = (totalAmount + deliverFeePrice + handlingFeePrice);
      setGrandTotal(gtotal);
      console.log("orderData",orderData);
    }, [cartItems, totalAmount, orderDetail, orderData]);

  return (
    <viewOrderComponentWrapper data-testid="viewOrderComponent">
      return (
      <div className="p-0">
        <header className="fixed top-0 left-0 w-full bg-white z-10" style={{ height: "10%" }}>
          <div className="p-3">
            <div className="flex items-center w-full"><a style={{ textDecoration: "none" }} href="/" className="w-7"><img src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg" alt="Bananas" /></a>
              <div className="flex justify-between items-center flex-1 w-full"><div className="text-lg pl-2 font-medium">Your Order - # {orderData?.orderID} </div>
                <a style={{ textDecoration: "none" }} href="/search">
                  <img width="22" height="22" src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg" alt="Search Product" className="w-5 h-5 m-3" /></a>
              </div></div>
          </div>
        </header>
        <div className="container mb-1 pt-[70px]">

          <div className="w-full p-2 rounded-t-lg lg:hidden border border-gray-200 bg-gradient-to-b from-green-200 to-white flex justify-flex-star items-center h-[60px]">
            <span className="font-medium text-sm text-gray-800">
              Delivering in 11 minutes
            </span>
          </div>
          <span className="font-medium text-sm text-gray-800">
              Ordered Item's
            </span>
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-1  pt-[5px]" style={{zIndex:"555"}}>
          {orderDetail.map((pitem:any) => (
            <div className="container mb-1">
              <div className="lg:w-[850px] m-auto">
              <div className="w-16 lg:w-12 h-16 lg:h-12 border border-gray-200 rounded-md flex justify-center items-center p-0.5 pt-[5px]">
                        <img
                          src={pitem.product.image}
                          className="max-w-full"
                          alt={pitem.product.name}
                        />
                      </div>
                </div>
                </div>
          ))}
                </div>

          <div className="container mb-1">
            {/* <DeliveryModeComponentCart />
            <DeliveryInstructions /> */}
            <OrderSummaryComponent
              productTotalAmount={totalAmount}
              item={cartItems}
              deliveryFee={deliveryFee}
              handlingFee={handlingFee}
              grandTotal={gtotal}
            />
          </div>
        </div>
      </div>
    </viewOrderComponentWrapper>
  )
};

export default viewOrderComponent;
