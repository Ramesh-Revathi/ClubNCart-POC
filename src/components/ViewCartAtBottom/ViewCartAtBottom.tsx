import React, { FC, useState, useEffect } from "react";
import { ViewCartAtBottomWrapper } from "./ViewCartAtBottom.styled";
import PaymentModeComponentStories from "../paymentModeComponent/paymentModeComponent.stories";
import PaymentModeComponent from "../paymentModeComponent/paymentModeComponent";
import FreeDeliveryBanner from "../FreeDeliveryBanner/FreeDeliveryBanner";
import { getAddress, getAddressForCart, getCart } from "../../services/auth-handler.service";

interface ViewCartAtBottomProps {
  style?: React.CSSProperties; // Optional inline styles
  quantity: { quantity: number; product: any }[]; // Number of items in the cart
  routeFlag: string;
  payableAmount:number;
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

const ViewCartAtBottom: FC<ViewCartAtBottomProps> = ({ style, quantity, routeFlag, viewCartBottomChange, payableAmount }) => {
  const [hideNshow, setHideNshow] = useState<"block" | "none">("none");
  const [pgModeOpen, setPgModeOpen] = useState(false);
   const [userdata, setUserData] = useState<any>();
  let [cartItems, setCartItems] = useState<number>(0);
  let [totalAmount, setTotalAmount] = useState<number>(0.00);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const calculationData: any[] = [];

  const defaultStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0, // Default bottom position
    left: 0,
    right: 0,
    backgroundColor: "white",
    textAlign: "center",
    padding: "10px 20px",
    borderTop: "1px solid #ddd",
    zIndex: 666
  };

  const cartStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0, // Default bottom position
    left: 0,
    right: 0,
    backgroundColor: "white",
    textAlign: "center",
    padding: "0px",
    borderTop: "1px solid #ddd",
    zIndex: 999,
    height: 0,
  };

  // Example: Toggle the visibility based on quantity
  useEffect(() => {
    const userdataObj = JSON.parse(sessionStorage.getItem("userData") || "[]"
  );
    if (quantity?.length > 0) {
      clearCart();
      calculationData.push(quantity);
      cartTimesCalculation(calculationData);
      //viewCartBottomChange(calculationData);
      //setHideNshow("block"); // Show the cart banner
    } else {
      //setHideNshow("none"); // Hide the cart banner
    }
  }, [quantity]);
        const fetchAddresses = async (mobile: string) => {
        try {
  
          const response = await getAddressForCart({"mobile":mobile});
          const responseText = await response.statusText;
          debugger
          if (response?.status === 200) {

          
            if (!response?.data?.addresses) {
              throw new Error('No addresses in response');
            }
      
            setAddresses(response?.data?.addresses);
            
            // Find primary address (now with preference field)
            const primaryAddress = response?.data?.addresses?.find((addr: any) => 
              addr.preference === 'primary'
            );
            setSelectedAddress(primaryAddress || response?.data?.addresses[0]);
          }
  
          
        } catch (error) {
          console.error('Error fetching addresses:', error);
          // Set error state if needed
        }
      };
  useEffect(() => {
    const userdataObj = JSON.parse(sessionStorage.getItem("userData") || "[]"
  );
  debugger
    if(routeFlag=='cart'){
      viewCartBottomChange([{item:cartItems,amount:totalAmount}]);
    }
    if(userdataObj){
      console.log("cartItems before getcart",cartItems);
      loadCart(userdataObj);
      fetchAddresses(userdataObj?.mobile);
    }
  }, [cartItems, totalAmount]);

  useEffect(()=>{
console.log("addressess in cart", addresses)
  },[addresses])
    const loadCart = async (user:any) => {
      //clearCart();
      const cartResponse = await getCart({ "mobile": user?.mobile });
      if (cartResponse?.statusText === "OK" && cartResponse?.data?.cartitems?.length > 0) {
        const objCatItems = cartResponse.data.cartitems.product;
        setCartItems(cartResponse.data.cartitems.product);
        sessionStorage.setItem("cartItemCount", JSON.stringify(cartResponse.data.cartitems.product));
      }
    }
  const clearCart = () => {
    setCartItems(0);
    setTotalAmount(0.00);
  };


  const convertToFlatArray = (nestedArray: any) => {
    return nestedArray.flatMap((innerArray: any) => innerArray);
  };

  const cartTimesCalculation = (items: { quantity: number; product: any }[][]) => {
    clearCart(); // Reset the cart before recalculating
    const objArrItem = convertToFlatArray(items);
    objArrItem[0].forEach((item: any) => {
      const price: number = parseFloat(item.product.price) * item.quantity;
      const objquantity: number = item.quantity;

      // Use functional updates to work with the latest state
      setCartItems((prevCartItems) => prevCartItems + objquantity);
      setTotalAmount((prevTotalAmount) => prevTotalAmount + price);

      if (objquantity > 0) {
        setHideNshow("block"); // Show the cart banner
      } else {
        setHideNshow("none"); // Hide the cart banner
      }
    });
  };

  const handlePgClose = () => {
    setPgModeOpen(false);
  }
  function pgModeFun(event:any): void {
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
      <div style={{zIndex:"999"}}>
      {routeFlag === "cart" ? (
        <div>
          <FreeDeliveryBanner style={{ ...cartStyle, display: hideNshow, padding: "0px", paddingBottom: "0px", bottom:"10%", zIndex:"666" , height:"15%"}} />
          <div
  className="flex fixed-banner shadow-custom border-t border-gray-200"
  style={{
    ...cartStyle,
    display: hideNshow,
    padding: "0px",
    paddingBottom: "0px",
    borderRadius: "15px",
    height: "10%",
    bottom: "8%",
    backgroundColor: "white", // Ensures solid background
    zIndex: 1000, // Places it above other elements
  }}
>
  <div className="px-2 pt-3">
    <div className="flex justify-between items-center">
      <div className="flex-1 flex gap-1 items-center font-medium">
        <img
          className="w-4 h-4"
          src="https://www.kpnfresh.com/_next/static/media/home_address.6f5bdad8.svg"
          alt="address icon"
        />
        <span className="text-md lg:text-xs text-black">
        {selectedAddress?.address.name || 'Loading...'}
        </span>
        <span className="text-secondary-bgcolor text-xs bg-[#d5fcf8] rounded-[4px] px-1 py-0.5">
        {selectedAddress?.address.addressType || 'ADDRESS'}
        </span>
      </div>
      <div onClick={handleChangeAddressClick} className="flex-1 text-end text-semantic-alert text-[14px] font-medium lg:text-xs cursor-pointer">
        Change
      </div>
    </div>
    <div className="text-gray-500 lg:text-xs ml-5 overflow-hidden truncate w-52 text-[14px]">
    {selectedAddress?.address.street || 'Loading...'}, {selectedAddress?.address.area || 'Loading...'}
    </div>
  </div>
  <div className="flex justify-between items-center w-full h-full" style={{backgroundColor:"white"}}>
    <div className="flex w-full px-2">
      <div className="flex-1 lg:hidden cursor-pointer opacity-100">
        <div className="text-[14px] flex items-center gap-2">
          Online Payment
          <img
            className="w-5 h-5"
            src="https://www.kpnfresh.com/_next/static/media/up-arrow.769d33b0.svg"
            alt="arrow"
          />
        </div>
        <button
          style={{ textDecoration: "none" }}
          className="text-semantic-alert text-[12px] mt-[-5px]"
          onClick={pgModeFun}
        >
          Change Payment Mode
        </button>
      </div>
      <div className="flex-1 flex h-full justify-between items-center rounded-lg lg:rounded-2xl bg-menuHilight py-2 px-4 cursor-pointer">
        <div>
          <div className="text-xs">Total Payable</div>
          <div className="text-sm font-bold text-start">
            <span className="ruppee-symbol-font">₹</span>{payableAmount}
          </div>
        </div>
        <a href="/pay" className="text-sm font-bold" style={{textDecoration: "none"}}>Pay Now</a>
      </div>
    </div>
  </div>
</div>
{addressModalOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 "
                style={{ zIndex: 9999 }}
                onClick={handleAddressModalClose}
              >
                <div 
                  className="bg-white rounded-lg p-4 w-full max-w-md max-h-[80vh] overflow-y-auto"
                  style={{ ...cartStyle,display: hideNshow,
                    padding: '0px',
                    paddingBottom: '0px',
                    borderRadius: '15px',
                    height: '50%',
                    // bottom: '8%',
                    backgroundColor: 'white', // Ensures solid background
                    zIndex: 1000, // Places it above other elements 
                     }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Select Address</h2>
                    <button 
                      onClick={handleAddressModalClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div 
                        key={address.id}
                        className={`p-3 border rounded-lg cursor-pointer ${
                          selectedAddress?.id === address.id 
                            ? 'border-primary bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => handleAddressSelect(address)}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {address.address.name}
                          </span>
                          <span className="text-xs bg-[#d5fcf8] rounded px-1 py-0.5">
                            {address.address.addressType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.address.street}, {address.address.area}
                        </p>
                        {address.address.preference === 'primary' && (
                          <span className="text-xs text-green-600">Primary</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* <button
                    className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
                    onClick={handleAddressModalClose}
                  >
                    Confirm Address
                  </button> */}
                </div>
              </div>
            )}

        </div>
      ) :routeFlag !== "pay" ? (
        <div
          className="flex fixed-banner shadow-custom border-t border-gray-200"
          style={{ ...defaultStyle, ...style, display: hideNshow }} // Merge styles and control visibility
        >
          <div className="flex justify-between items-center w-full h-full">
            <div className="flex-1">
              <div className="flex">
                <div className="text-gray-subtext text-sm">{cartItems} Items in cart</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-lg">
                  <span className="ruppee-symbol-font">₹</span> {totalAmount}
                </div>
              </div>
            </div>
            <a
              style={{ textDecoration: "none" }}
              className="flex flex-col justify-center items-center h-12 bg-menuHilight border-primary text-black-300 rounded-lg w-36"
              href="/cart"
            >
              View Cart
            </a>
          </div>
        </div>
      ):(<div></div>)}
                <PaymentModeComponent
            pgOpen={pgModeOpen}
            handlePgClose={handlePgClose}
            totalAmount={totalAmount}
          />
      </div>
    </ViewCartAtBottomWrapper>
  );

};

export default ViewCartAtBottom;
