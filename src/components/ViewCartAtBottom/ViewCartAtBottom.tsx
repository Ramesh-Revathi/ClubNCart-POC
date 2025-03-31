import React, { FC, useEffect, useState } from 'react';
import {
  getAddressForCart,
  getCart,
} from '../../services/auth-handler.service';
import FreeDeliveryBanner from '../FreeDeliveryBanner/FreeDeliveryBanner';
import PaymentModeComponent from '../paymentModeComponent/paymentModeComponent';
import { ViewCartAtBottomWrapper } from './ViewCartAtBottom.styled';

interface ViewCartAtBottomProps {
  style?: React.CSSProperties; // Optional inline styles
  quantity: { quantity: number; product: any }[]; // Number of items in the cart
  routeFlag: string;
  payableAmount: number;
  viewCartBottomChange: (data: any[]) => void; // Function prop
}

interface Address {
  id: number;
  address: {
    name: string;
    street: string;
    area: string;
    addressType: string;
    preference?: string;
  };
}

const ViewCartAtBottom: FC<ViewCartAtBottomProps> = ({
  style,
  quantity,
  routeFlag,
  viewCartBottomChange,
  payableAmount,
}) => {
  const [hideNshow, setHideNshow] = useState<'block' | 'none'>('none');
  const [pgModeOpen, setPgModeOpen] = useState(false);
  const [userdata, setUserData] = useState<any>();
  let [cartItems, setCartItems] = useState<number>(0);
  let [totalAmount, setTotalAmount] = useState<number>(0.0);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const calculationData: any[] = [];

  const defaultStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0, // Default bottom position
    left: 0,
    right: 0,
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '10px 20px',
    borderTop: '1px solid #ddd',
    zIndex: 666,
  };

  const cartStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0, // Default bottom position
    left: 0,
    right: 0,
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '0px',
    borderTop: '1px solid #ddd',
    zIndex: 999,
    height: 0,
  };

  // Example: Toggle the visibility based on quantity

  useEffect(() => {
    const userdataObj = JSON.parse(sessionStorage.getItem('userData') || '[]');
    ;
    console.log('quantity - yourd', quantity);
    if (quantity?.length > 0) {
      clearCart();
      calculationData.push(quantity);
      cartTimesCalculation(calculationData);
      //viewCartBottomChange(calculationData);
      //setHideNshow("block"); // Show the cart banner
    } else {
      setHideNshow("none");
    }
  }, [quantity]);

  const fetchAddresses = async (mobile: string) => {
    try {
      const response = await getAddressForCart({ mobile: mobile });
      const responseText = await response.statusText;
      ;
      if (response?.status === 200) {
        if (!response?.data?.addresses) {
          throw new Error('No addresses in response');
        }

        setAddresses(response?.data?.addresses);

        // Find primary address (now with preference field)
        const primaryAddress = response?.data?.addresses?.find(
          (addr: any) => addr.preference === 'primary'
        );
        setSelectedAddress(primaryAddress || response?.data?.addresses[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      // Set error state if needed
    }
  };
  useEffect(() => {
    const userdataObj = JSON.parse(sessionStorage.getItem('userData') || '[]');
    ;
    if (routeFlag == 'cart') {
      viewCartBottomChange([{ item: cartItems, amount: totalAmount }]);
    }
    if (userdataObj) {
      console.log('cartItems before getcart', cartItems);
      loadCart(userdataObj);
      fetchAddresses(userdataObj?.mobile);
    }
  }, [cartItems, totalAmount]);

  useEffect(() => {
    console.log('addressess in cart', addresses);
  }, [addresses]);
  const loadCart = async (user: any) => {
    //clearCart();
    const cartResponse = await getCart({ mobile: user?.mobile });
    if (
      cartResponse?.statusText === 'OK' &&
      cartResponse?.data?.cartitems?.length > 0
    ) {
      const objCatItems = cartResponse.data.cartitems.product;
      setCartItems(cartResponse.data.cartitems.product);
      sessionStorage.setItem(
        'cartItemCount',
        JSON.stringify(cartResponse.data.cartitems.product)
      );
    }
  };
  const clearCart = () => {
    setCartItems(0);
    setTotalAmount(0.0);
  };

  const convertToFlatArray = (nestedArray: any) => {
    return nestedArray.flatMap((innerArray: any) => innerArray);
  };

  const cartTimesCalculation = (
    items: { quantity: number; product: any }[][]
  ) => {
    clearCart(); // Reset the cart before recalculating
    const objArrItem = convertToFlatArray(items);
    objArrItem[0].forEach((item: any) => {
      const price: number = parseFloat(item.product.price) * item.quantity;
      const objquantity: number = item.quantity;

      // Use functional updates to work with the latest state
      setCartItems((prevCartItems) => prevCartItems + objquantity);
      setTotalAmount((prevTotalAmount) => prevTotalAmount + price);

      console.log('objquantity', objquantity);

      if (objquantity > 0) {
        setHideNshow('block'); // Show the cart banner
      } else {
        setHideNshow('none'); // Hide the cart banner
      }
    });
  };

  const handlePgClose = () => {
    setPgModeOpen(false);
  };
  function pgModeFun(event: any): void {
    setPgModeOpen(true);
  }
  const handleAddressModalClose = () => {
    setAddressModalOpen(false);
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setAddressModalOpen(false);
  };

  const handleChangeAddressClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddressModalOpen(true);
  };
  return (
    <ViewCartAtBottomWrapper data-testid="ViewCartAtBottom">
      <div style={{ zIndex: '999' }}>
        {routeFlag === 'cart' ? (
          <div
          className="fixed-banner flex shadow-xl border-t border-gray-300"
          style={{
            ...cartStyle,
            display: hideNshow,
            padding: "0px",
            borderRadius: "20px",
            height: "12%",
            bottom: "18%",
            background: "linear-gradient(145deg, rgba(76, 175, 80, 1), rgba(102, 187, 106, 1))", // Fully opaque gradient
            zIndex: 1000,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)", // Slightly deeper shadow
          }}
        >
          <div
            className="px-4 pt-4"
            style={{
              height: "160%",
              background: "linear-gradient(145deg, rgba(76, 175, 80, 1), rgba(102, 187, 106, 1))", // Fully opaque gradient
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1 flex gap-2 items-center font-medium text-white">
                <img
                  className="w-6 h-6 rounded-full shadow-md"
                  src="https://www.kpnfresh.com/_next/static/media/home_address.6f5bdad8.svg"
                  alt="address icon"
                />
                <span className="text-lg">
                  {selectedAddress?.address.name || "Loading..."}
                </span>
                <span className="text-white bg-green-900 bg-opacity-95 text-sm rounded-lg px-2 py-1 shadow">
                  {selectedAddress?.address.addressType || "ADDRESS"}
                </span>
              </div>
              <div
                onClick={handleChangeAddressClick}
                className="flex-1 text-end text-white text-base font-medium cursor-pointer hover:text-opacity-90 transition-all"
              >
                Change
              </div>
            </div>
            <div className="text-white text-opacity-95 mt-2 text-sm truncate w-full flex justify-between items-center">
              {selectedAddress?.address.street || "Loading..."},{" "}
              {selectedAddress?.address.area || "Loading..."}
            </div>
          </div>
          <div
            className="flex justify-between items-center w-full h-full"
            style={{
              background: "rgba(255, 183, 0, 0.95)", // Darker semi-transparent background
              backdropFilter: "blur(5px)", // Softer blur for readability
              borderRadius: "5px",
            }}
          >
            <div className="flex w-full px-4 items-center gap-3">
              <div className="flex-1 text-green-100 text-base flex items-center gap-2 cursor-pointer hover:scale-105 transform transition">
                Online Payment
                <img
                  onClick={pgModeFun}
                  className="w-5 h-5 hover:rotate-90 transition-transform duration-300"
                  src="https://www.kpnfresh.com/_next/static/media/up-arrow.769d33b0.svg"
                  alt="arrow"
                />
              </div>
              <div className="flex-1 flex justify-between items-center bg-green-700 text-white rounded-lg px-6 py-3 cursor-pointer hover:shadow-xl transition-shadow">
                <div>
                  <div className="text-sm">Total Payable</div>
                  <div className="text-xl font-bold">
                    <span className="ruppee-symbol-font">₹</span>
                    {payableAmount}
                  </div>
                </div>
                <a
                  href="/pay"
                  className="text-sm font-semibold text-yellow-400 underline"
                  style={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                  }}
                >
                  Pay Now
                </a>
              </div>
            </div>
          </div>
        </div>                   
        ) : routeFlag !== 'pay' ? (
          <div
  className="flex fixed-banner shadow-xl border-t border-gray-200"
  style={{
    ...defaultStyle,
    ...style,
    display: hideNshow,
    background: "linear-gradient(145deg, rgba(34, 139, 34, 0.9), rgba(46, 204, 113, 0.9))", // Premium green gradient
    borderRadius: "20px",
    padding: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)", // Deep 3D shadow
  }}
>
  <div className="flex justify-between items-center w-full h-full">
    {/* Left Section */}
    <div className="flex-1 px-4">
      <div className="flex items-center">
        <div className="text-gray-100 text-sm">
          <span className="animate-bounce">{cartItems}</span> Items in cart
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div
          className="font-medium text-xl text-white"
          style={{
            textShadow: "0 3px 6px rgba(0, 0, 0, 0.5)", // Text shadow for premium feel
          }}
        >
          <span className="ruppee-symbol-font">₹</span> {totalAmount}
        </div>
      </div>
    </div>

    {/* Right Section */}
    <a
      href="/cart"
      style={{ textDecoration: "none" }}
      className="flex flex-col justify-center items-center h-12 bg-green-600 border-green-500 text-white rounded-lg w-36 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-green-700"
    >
      <span
        className="font-bold text-base"
        style={{
          textShadow: "0 2px 5px rgba(0, 0, 0, 0.4)", // Text shadow for a glowing effect
        }}
      >
        View Cart
      </span>
    </a>
  </div>
</div>

        ) : (
          <div></div>
        )}
        <PaymentModeComponent
          pgOpen={pgModeOpen}
          handlePgClose={handlePgClose}
          totalAmount={totalAmount}
        />
      </div>
      {addressModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity animate-fade-in"
    style={{ zIndex: 9999 }}
    onClick={handleAddressModalClose}
  >
    <div
      className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg transform animate-slide-up"
      style={{ zIndex: 1000 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">Select Address</h2>
        <button
          onClick={handleAddressModalClose}
          className="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 border rounded-lg transition-all transform ${selectedAddress?.id === address.id
              ? "border-green-500 bg-green-50 scale-105 shadow-md"
              : "border-gray-300"
              }`}
            onClick={() => handleAddressSelect(address)}
          >
            <div className="flex justify-between">
              <span className="font-medium text-green-900">
                {address.address.name}
              </span>
              <span className="text-xs bg-green-300 text-white rounded px-2 py-1">
                {address.address.addressType}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {address.address.street}, {address.address.area}
            </p>
            {address.address.preference === "primary" && (
              <span className="text-xs text-green-600">Primary</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </ViewCartAtBottomWrapper>
  );
};

export default ViewCartAtBottom;
