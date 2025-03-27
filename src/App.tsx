import React, { useEffect, useRef, useState } from 'react';
import HomePage from './components/Home/HomePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Products from './components/Products/Products';
import About from './components/About/About';
import MainHome from './components/mainHome/mainHome';
import ProductListDisplay from './components/ProductListDisplay/ProductListDisplay';
import ShopingCartComponent from './components/shopingCartComponent/shopingCartComponent';
import AddressBook from './components/AddressBook/AddressBook';
import ProfilePage from './components/ProfilePage/ProfilePage';
import OtpVerification from './components/OtpVerification/OtpVerification';
import OtpComponentStories from './components/otpComponent/otpComponent.stories';
import OtpComponent from './components/otpComponent/otpComponent';
import TestPaymentStories from './components/testPayment/testPayment.stories';
import TestPayment from './components/testPayment/testPayment';
import PaymentServiceStories from './components/paymentService/paymentService.stories';
import PaymentService from './components/paymentService/paymentService';
import TransactionSummaryStories from './components/transactionSummary/transactionSummary.stories';
import TransactionSummary from './components/transactionSummary/transactionSummary';
import RegisterMobileNoPopup from './components/registerMobileNoPopup/registerMobileNoPopup';
import { getLoggedInUser, userlogin, loginViaEmail, loginViaMobile, saveUser, getCart } from './services/auth-handler.service';
import { useAuth } from './hooks/AuthContext';
import { useData } from './hooks/DataContext';
import StorageService from './services/storage.service';
import { setCsrfToken } from './services/axios-client';
import TosatNotifyCommon from './components/TosatNotifyCommon/TosatNotifyCommon';
import ViewCartAtBottom from './components/viewCartAtBottom/viewCartAtBottom';
import ProductSearchComponent from './components/productSearchComponent/productSearchComponent';
import ViewOrderComponent from './components/viewOrderComponent/viewOrderComponent';
import AppFooterSection from './components/AppFooterSection/AppFooterSection';
import MapLibreMap from './components/MapComponent/MapComponent';
import MapLibreWithSuggestions from './components/MapComponent/MapComponent';
// import './App.css'
interface userProfile {
  name: any,
  mailid: any,
  mobile: any,
  address: [
    {
      street: any,
      area: any,
      addressType: any
    }
  ]
}

interface CartItem {
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  code: string;
  name: string;
  price: string;
  minWeight: string;
  maxWeight: string;
  unit: string;
  maximumQty: string;
  category: string;
  image: string;
}

interface payRequest {
  total: number;
  currencyCode: string
}

const App: React.FC = () => {
  //const navigate = useNavigate();
  const { data, setData } = useData();
  const [userLoginNo, setUserLoginNo] = useState('');
  //const [disableBtn, setDisableBtn] = useState(false);
  const { setLoggedInUser, setIsAuthenticated, loggedInUser, isAuthenticated } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  //const [hoverSidebar, setHoverSidebar] = useState(false);
  const [routeFlag, setRouteFlag] = useState("list");
  const [quantity, setQuantity] = useState<{ quantity: number; product: any }[]>([]); // Initial value
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userdata, setUserData] = useState<userProfile>();
  const [userlog, setUserlog] = useState<any>();
  const [userFetched, setUserFeched] = useState(false);
  const [payReq, setPayReq] = useState<payRequest>({ total: 0.00, currencyCode: "INR" })
  const [message, setMessage] = useState<"error" | "warning" | "success">(
    "error"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const childRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [productTotalAmount, setproductTotalAmount] = useState<number | 0.00>(0.00);
  const [item, setItem] = useState<number | 0>(0);
  const [deliveryFee, setDeliveryFee] = useState<number | 0.00>(0.00);
  const [handlingFee, setHandlingFee] = useState<number | 0.00>(0.00);
  const [grandTotal, setGrandTotal] = useState<number | 0.00>(0.00);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummaryData, setCartSummaryData] = useState<any>();

  const [savedAddress, setSavedAddress] = useState<{
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    addressType: string;
  } | null>(null);
  const [cartItemQuantity, setCartItemQuantity] = useState<{ quantity: number; product: any }[]>([]); // Initial value
  let user: userProfile;
  const handleClose = () => {
    setOpen(false);
    //setOtpOpen(true);
  };

  const handleOtpClose = () => {
    setOtpOpen(false);
    setMessage("success");
    setErrorMessage("User LoggedIn Successfully !!!!")
    //setAddressOpen(true);
  };
  const handleAddressClose = () => {
    setAddressOpen(false);
  };
  const handleConfirm = async (number: string) => {
    setUserLoginNo(number); // This updates the state asynchronously
    const objUserData = await userlogin({ "mobile": ("+91-" + number) });
    sessionStorage.setItem("userData", JSON.stringify(objUserData?.data?.user));
    localStorage.setItem("userData", JSON.stringify(objUserData?.data?.user));
    getLoggedInUser()
      .then((response) => {
        const { created_using, email, phone } = response?.data;
        const loggedInId = created_using === 'email' ? email : phone;
        setLoggedInUser({
          loggedInId: loggedInId,
          loggedInUsing: created_using,
        });
        setIsAuthenticated(true);
        setUserFeched(true);
        const token = StorageService.lStorage.getTokenCsrf();
        if (token) {
          setCsrfToken(token);
        }
      })
      .catch((error) => {
        console.error(error);
        setUserFeched(true);
      });
    const isLoginIdMobileNumber = !isNaN(Number(number));
    setData({
      ...data,
      login: { userLoginId: number, loginVia: isLoginIdMobileNumber ? 'phone' : 'email' }
    });
    navigateToOtpScreen(isLoginIdMobileNumber, isLoginIdMobileNumber ? loginViaMobile : loginViaEmail, number);
  };


  const navigateToOtpScreen = (isLoginIdMobileNumber: boolean, loginCb: any, loginId: string) => {
    loginCb(loginId)
      .then((response: any) => {
        setOpen(false);
        setOtpOpen(true);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const onOtpConfirm = (number: string) => {
    setOtpOpen(false);
    setAddressOpen(true);
  }

  const handleSaveAddress = async (address: {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    addressType: string;
  }) => {
    user = { name: address.fullName, mailid: "", mobile: ('+91-' + data.login.userLoginId), address: [{ street: address.addressLine1, area: address.addressLine2, addressType: address.addressType }] };
    const objUserData = await saveUser(user); // Await the Promise here
    sessionStorage.setItem("userData", JSON.stringify(objUserData?.data));
    setUserData(objUserData.data); // Update state with the resolved data
    setSavedAddress(address); // Save the address
    setMessage('success');
    setErrorMessage("User LoggedIn SuccessFully !!!");
  };
  useEffect(() => {
    // Perform tasks like fetching data
    setisLoggedIn(!!sessionStorage.getItem("loggedUserMobNo"));
    const userdataObj = JSON.parse(sessionStorage.getItem("userData") || "[]"
    );
    getLoggedInUser()
      .then((response) => {
        const { created_using, email, phone } = response?.data;
        const loggedInId = created_using === 'email' ? email : phone;
        setLoggedInUser({
          loggedInId: loggedInId,
          loggedInUsing: created_using,
        });
        setIsAuthenticated(true);
        setUserFeched(true);
        const token = StorageService.lStorage.getTokenCsrf();
        if (token) {
          setCsrfToken(token);
        }
      })
      .catch((error) => {
        console.error(error);
        setUserFeched(true);
        setOpen(true);
      });
    if (userdataObj) {
      //loadCart(userdataObj);
    }
  }, [userLoginNo]);

  useEffect(() => {
    console.log('productTotalAmount', productTotalAmount);
  }, [productTotalAmount, item, deliveryFee, handlingFee, grandTotal])
  const handleViewCartBottomChange = (data: any[]) => {
    setCartSummaryData(data);
  }
  // const funcItem = (data:number) => {
  //   setItem(data);
  // }
  // const funcdeliveryFee = (data:number) => {
  //   setDeliveryFee(data);
  // }
  // const funcgrandTotal = (data:number) => {
  //   debugger
  //   setGrandTotal(data);
  // }
  // const funchandlingFee = (data:number) => {
  //   setHandlingFee(data);
  // }
  const initLoadCart = (data: any) => {
    console.log("initLoadCart", data);
  }
  return (
    <>
      <RouteChangeHandler
        cartItemdata={setQuantity}
        routeFlag={setRouteFlag}
        cartSummaryData={cartSummaryData}
        item={setItem}
        deliveryFee={setDeliveryFee}
        grandTotal={setGrandTotal}
        handlingFee={setHandlingFee}
        productTotalAmount={setproductTotalAmount} 
        initLoadCart={initLoadCart} />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/productlist/:id" element={<ProductListDisplay cartItemQuantity={setQuantity} />} />
        <Route path="/productview/:id" element={<Products />} />
        <Route path="/cart" element={<ShopingCartComponent globalproductTotalAmount={productTotalAmount} globalitem={item} globaldeliveryFee={deliveryFee} globalhandlingFee={handlingFee} globalgrandTotal={grandTotal} globalquantity={setQuantity} />} />
        <Route path="/cart" element={<address />} />
        <Route path="/address" element={<AddressBook />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pay" element={<PaymentService />} />
        <Route path="/testpay" element={<TestPayment />} />
        <Route path="/confirmation" element={<TransactionSummary transactionId={undefined} amount={undefined} date={undefined} />} />
        <Route path="/order" element={<ViewOrderComponent />} />
        <Route path="/search" element={<ProductSearchComponent cartItemQuantity={setQuantity} />} />
      </Routes>
      <TosatNotifyCommon
        ref={childRef}
        message={message}
        errorMessage={errorMessage} // Pass the error message
      />
      <RegisterMobileNoPopup
        open={open}
        otpOpen={otpOpen}
        addressOpen={addressOpen}
        handleOtpClose={handleOtpClose}
        handleClose={handleClose}
        handleAddressClose={handleAddressClose}
        onSaveAddress={handleSaveAddress}
        onConfirm={handleConfirm}
        onOtpConfirm={onOtpConfirm} // Pass the callback 
      />
      <ViewCartAtBottom
        routeFlag={routeFlag}
        quantity={quantity}
        style={{
          bottom: 0, // Custom bottom value
          zIndex: 1000, // Ensure it stays on top
          backgroundColor: "#f8f8f8", // Light gray background
          height: 80, // Adjust height if necessary
        }} viewCartBottomChange={handleViewCartBottomChange} payableAmount={grandTotal} />
                     <footer>
                      
             <AppFooterSection routeFlag={routeFlag} />
             </footer>
    </>


  );
};
interface RouteChangeHandlerProps {
  cartItemdata: (cartItems: any | []) => void;
  routeFlag: (flag: string | "list") => void;
  cartSummaryData: any; // Function prop
  item: (data: number | 0.00) => void;
  deliveryFee: (data: number | 0.00) => void;
  grandTotal: (data: number | 0.00) => void;
  handlingFee: (data: number | 0.00) => void;
  productTotalAmount: (data: number | 0.00) => void;
  initLoadCart: (data: any | []) => void;
}
const RouteChangeHandler: React.FC<RouteChangeHandlerProps> = ({ cartItemdata, routeFlag, cartSummaryData, item, deliveryFee, grandTotal, productTotalAmount, handlingFee, initLoadCart }) => {
  const location = useLocation();
  const [payReq, setPayReq] = useState<payRequest>({ total: 0.00, currencyCode: "INR" });
  useEffect(() => {
    console.log("Route changed:", location.pathname);
    const loggedUserData = JSON.parse(sessionStorage.getItem("userData") || '[]');
    if (location.pathname === "/cart") {
      routeFlag('cart');
    } else if (location.pathname === "/pay" || location.pathname ==="/confirmation" || location.pathname ==="/order") {
      routeFlag('pay');
    } else {
      routeFlag('list');
    }
    if (cartSummaryData !== undefined) {
      handleViewCartBottomChange(cartSummaryData);
    }
    if (sessionStorage.getItem('cartItemCount') !== "undefined") {
      const cartItems = JSON.parse(sessionStorage.getItem('cartItemCount') || '[]');
      if (cartItems.length > 0) {
        const objCartItems: any[] = [];
        objCartItems.push(cartItems);
        cartItemdata(objCartItems)
      }else{
        cartItemdata([]);
      }
    } else {
      cartItemdata([]);
    }
debugger
    if (loggedUserData) {
      console.log("loadCart",loggedUserData);
loadCart(loggedUserData);
    }
  }, [location, cartSummaryData]);

  const loadCart = async (user: any) => {
    const cartResponse = await getCart({ "mobile": user?.mobile });
    console.log('changehandler', cartResponse);
    console.log('cartResponse.data.cartitems.length',cartResponse.data.cartitems.length);
    if (cartResponse.statusText === "OK" && cartResponse.data.cartitems?.product?.length > 0) {
      const objCartItems: any[] = [];
      objCartItems.push(cartResponse.data.cartitems.product);
      initLoadCart(objCartItems);
      sessionStorage.setItem("cartItemCount", JSON.stringify(cartResponse.data.cartitems.product));
    }else{
      sessionStorage.setItem("cartItemCount", JSON.stringify([])); 
    }
  }

  const handleViewCartBottomChange = (data: any[]) => {
    if (data.length > 0) {
      productTotalAmount(data[0].amount);
      //setCartItems(data[0].item);
      const deliverFeePrice = data[0].item * 0;
      const handlingFeePrice = 0;
      deliveryFee(deliverFeePrice);
      handlingFee(handlingFeePrice);
      const amount = data[0].amount;
      const gtotal = (amount + deliverFeePrice + handlingFeePrice);
      grandTotal(gtotal);
      setPayReq({ total: gtotal, currencyCode: "INR" });
      sessionStorage.setItem("cartAmount", JSON.stringify({ total: gtotal, currencyCode: "INR" }));
    }
  };


  return null;
};
export default App;
