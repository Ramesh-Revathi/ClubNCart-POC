import React, { useState, FC, useEffect, useRef } from 'react';
import { ProductListDisplayWrapper } from './ProductListDisplay.styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomCtrlNumberInput from '../CustomCtrlNumberInput/CustomCtrlNumberInput';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import SideMenuBar from '../sideMenuBar/sideMenuBar';
import ProductListDisplayChild from '../productListDisplayChild/productListDisplayChild';
import RegisterMobileNoPopup from '../registerMobileNoPopup/registerMobileNoPopup';
import ViewCartAtBottom from '../viewCartAtBottom/viewCartAtBottom';
import TosatNotifyCommon from '../TosatNotifyCommon/TosatNotifyCommon';
import { toast } from 'react-toastify';
import { useAuth } from "../../hooks/AuthContext";
import { useData } from '../../hooks/DataContext';
import { generateCsrfToken } from '../../services/tokens.service';
import { setCsrfToken } from '../../services/axios-client';
import { addCart, getLoggedInUser, getProductByHcode, loginViaEmail, loginViaMobile, logoutUser, saveUser } from '../../services/auth-handler.service';
import AppFooterSection from '../AppFooterSection/AppFooterSection';
import StorageService from '../../services/storage.service';

interface ProductListDisplayProps {
  cartItemQuantity: (cartItems: any | []) => void;
}
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

const ProductListDisplay: FC<ProductListDisplayProps> = ({ cartItemQuantity }) => {
  const location = useLocation();
  const { data, setData } = useData();
  const [productCode, setProductCode] = useState<string | null>(null);
  const [products, setProducts] = useState<any | null>(null);
  const [fProducts, setFProducts] = useState<any | null>(null);
  const [cProducts, setCProducts] = useState<any | null>(null);
  const [categories, setCategories] = useState<any | null>(null);
  const [userLoginNo, setUserLoginNo] = useState('');
  //const [disableBtn, setDisableBtn] = useState(false);
  const { isAuthenticated, loggedInUser } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [quantity, setQuantity] = useState<{ quantity: number; product: any }[]>([]); // Initial value
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userdata, setUserData] = useState<any>();
  const [userFetched, setUserFeched] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [message, setMessage] = useState<"error" | "warning" | "success">(
    "error"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const childRef = useRef<any>(null);

  const handleClickOpen = () => {
    //setOpen(true);
  };

  const [paddingBottom, setPaddingBottom] = useState(0); // Initial padding-bottom in px
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 8; // Number of items to show per page
  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {
    // Extract the last part of the URL
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    setProductCode(lastPart);
    getProductByHcodeFun({"code":lastPart});
    console.log("lastPart", lastPart);
  }, [location]);
  useEffect(() => {
  },[products])
  useEffect(() => {
  },[fProducts])
  useEffect(() => {
  },[currentPage])
  useEffect(() => {

  },[categories])
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
      const pathParts = location.pathname.split("/");
      const lastPart = pathParts[pathParts.length - 1];
      getProductByHcodeFun({ code: lastPart });
    }
  };
  
  const filProdFun = (selectedCategory: any, productdata: any[]) => {
    const filterProd =
      selectedCategory === "All"
        ? productdata
        : productdata.filter((product: any) => product.category === selectedCategory);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProd = filterProd.slice(startIndex, startIndex + itemsPerPage);
    
    setCProducts(currentProd);
    setTotalPage(Math.ceil(filterProd.length / itemsPerPage)); // Update totalPage state
    setFProducts(filterProd);
  };
  
  useEffect(() => {
    // Perform tasks like fetching data
    setisLoggedIn(!!sessionStorage.getItem("loggedUserMobNo"));
    setUserData(JSON.parse(sessionStorage.getItem("userData") || "[]"
    ));
  }, [userLoginNo]);
  useEffect(() => {
    if (userdata) {

    }
  }, [userdata])
  useEffect(() => {
    console.log("selectedCategory",selectedCategory);
    if(selectedCategory){
      const pathParts = location.pathname.split("/");
      const lastPart = pathParts[pathParts.length - 1];
      setProductCode(lastPart);
      getProductByHcodeFun({"code":lastPart});
    }
  }, [selectedCategory])


 

  const getProductByHcodeFun = async (data: any) => {
    const prodResp = await getProductByHcode(data);
    if(prodResp && prodResp.status === 200 && prodResp?.data?.productlist?.data){
      setProducts(prodResp?.data?.productlist?.data);
      setCategories(prodResp?.data?.productlist?.scategory)
      filProdFun(selectedCategory,prodResp?.data?.productlist?.data);
    }
    console.log("API product List", products);
  };

  const checkForCsrfToken = () => {
    // if (!isAuthenticated) {
    generateCsrfToken()
      .then((response) => {
        setCsrfToken(response?.data?.token);
      })
      .catch((error) => {
        console.error(error);
      });
    // }
  };
  const handleOnMessageChangeChild = (newMessage: string | null) => {
    setMessage(newMessage as "error" | "warning" | "success");
  };

  const handleOnErrorMessageChangeChild = (newErrorMessage: string | null) => {
    setErrorMessage(newErrorMessage);
  };
  const addedQuantityChangeChild = (cartItems: { quantity: number; product: any }[]) => {
    const objCartItems: any[] = [];
    objCartItems.push(cartItems);
    console.log('addedQuantityChangeChild', addedQuantityChangeChild);
    setQuantity(objCartItems);
    cartItemQuantity(objCartItems);
    if (quantity.length > 0) {
      setPaddingBottom((prev) => prev + 100);
    } else {
      setPaddingBottom(0);
    }
    sessionStorage.setItem('cartItemCount', JSON.stringify(cartItems));
  }
  const removeQuantityChangeChild = (cartItems: { quantity: number; product: any }[]) => {
    const objCartItems: any[] = [];
    objCartItems.push(cartItems);
    console.log('removeQuantityChangeChild', addedQuantityChangeChild);
    setQuantity(objCartItems);
    cartItemQuantity(objCartItems);
    if (quantity.length > 0) {
      setPaddingBottom((prev) => prev + 100);
    } else {
      setPaddingBottom(0);
    }
    sessionStorage.setItem('cartItemCount', JSON.stringify(cartItems));
  }

  return (
    <ProductListDisplayWrapper data-testid="ProductListDisplay">
      <div className="flex bg-white-700" style={{ height: "50%" }}>
      <header
  className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-500 via-green-400 to-green-300 shadow-lg z-10 backdrop-blur-lg"
  style={{ height: "8%" }} // Reduced height
>
  <div className="p-2 relative flex items-center justify-between">
    {/* Back Button */}
    <a
      href="/"
      style={{ textDecoration: "none" }}
      className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md transform transition-transform hover:scale-110"
    >
      <img
        src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg"
        alt="Back"
        className="w-4 h-4" // Reduced size
      />
    </a>

    {/* Category Title */}
    <div className="text-sm font-semibold text-white text-center flex-grow">
      {selectedCategory}
    </div>

    {/* Search Button */}
    <a
      href="/search"
      style={{ textDecoration: "none" }}
      className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md transform transition-transform hover:scale-110"
    >
      <img
        src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg"
        alt="Search"
        className="w-4 h-4" // Reduced size
      />
    </a>
  </div>
</header>

        <main>
          <div className="flex pt-[60px] bg-green-100" style={{
            paddingBottom: `${paddingBottom}px`,
          }}>
            {categories && categories.length > 0 && (
            <SideMenuBar
            setShowSidebar={setShowSidebar}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            showSidebar={showSidebar}
          />
            )}
            {cProducts && cProducts.length > 0 && fProducts && fProducts.length > 0 && (
  <ProductListDisplayChild
    isLoggedIn={isLoggedIn}
    message={message}
    errorMessage={errorMessage}
    currentProducts={cProducts}
    filteredProducts={fProducts}
    itemsPerPage={itemsPerPage}
    totalPages={totalPage}
    currentPage={currentPage}
    goToPage={goToPage}
    handleClickOpen={handleClickOpen}
    handleOnMessageChangeChild={handleOnMessageChangeChild}
    handleOnErrorMessageChangeChild={handleOnErrorMessageChangeChild}
    addedQuantityChangeChild={addedQuantityChangeChild}
    removeQuantityChangeChild={removeQuantityChangeChild}
  />
)}

            {/* <ProductListDisplayChild
              isLoggedIn={isLoggedIn}
              message={message}
              errorMessage={errorMessage}
              currentProducts={cProducts}
              filteredProducts={fProducts}
              itemsPerPage={itemsPerPage}
              totalPages={totalPage}
              currentPage={currentPage}
              goToPage={goToPage}
              handleClickOpen={handleClickOpen}
              handleOnMessageChangeChild={handleOnMessageChangeChild}
              handleOnErrorMessageChangeChild={handleOnErrorMessageChangeChild}
              addedQuantityChangeChild={addedQuantityChangeChild}
              removeQuantityChangeChild={removeQuantityChangeChild}
            /> */}

            <TosatNotifyCommon
              ref={childRef}
              message={message}
              errorMessage={errorMessage} // Pass the error message
            />

          </div>
          {/* <ViewCartAtBottom
            routeFlag={'list'}
            quantity={quantity}
            style={{
              bottom: 0, // Custom bottom value
              zIndex: 1000, // Ensure it stays on top
              backgroundColor: "#f8f8f8", // Light gray background
              height: 80, // Adjust height if necessary
            }} viewCartBottomChange={function (data: any[]): void {
              throw new Error('Function not implemented.');
            }} /> */}
        </main>
      </div>
    </ProductListDisplayWrapper>
  )
};

export default ProductListDisplay;
