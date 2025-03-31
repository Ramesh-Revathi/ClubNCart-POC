import React, { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { productSearchComponentWrapper } from './productSearchComponent.styled';
import ProductListDisplayChild from "../productListDisplayChild/productListDisplayChild";
import TosatNotifyCommon from "../TosatNotifyCommon/TosatNotifyCommon";
import { useAuth } from "../../hooks/AuthContext";
import { useData } from "../../hooks/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getProductByHcode, getProductBySearchQuery } from "../../services/auth-handler.service";

interface productSearchComponentProps {
  cartItemQuantity: (cartItems: any | []) => void;
}

const productSearchComponent: FC<productSearchComponentProps> = ({ cartItemQuantity }) => {
  //const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, setData } = useData();
  const [userLoginNo, setUserLoginNo] = useState('');
  //const [disableBtn, setDisableBtn] = useState(false);
  const { isAuthenticated, loggedInUser } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [quantity, setQuantity] = useState<{ quantity: number; product: any }[]>([]); // Initial value
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userdata, setUserData] = useState<any>();
  const [userFetched, setUserFeched] = useState(false);
    const [products, setProducts] = useState<any | null>(null);
    const [fProducts, setFProducts] = useState<any | null>(null);
    const [cProducts, setCProducts] = useState<any | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 8; // Number of items to show per page
    const [totalPage, setTotalPage] = useState(0);
  const [message, setMessage] = useState<"error" | "warning" | "success">(
    "error"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const childRef = useRef<any>(null);
  let selCat: any;

  const handleClickOpen = () => {
    //setOpen(true);
  };

  const [paddingBottom, setPaddingBottom] = useState(0); // Initial padding-bottom in px

  useEffect(() => {
    if (products) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentProd = products.slice(startIndex, startIndex + itemsPerPage);
      setCProducts(currentProd);
    }
  },[products,currentPage])
  useEffect(() => {
  },[fProducts])
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const getProductByHcodeFun = async (data: any) => {
    
    let prodDataPush : any[] = [];
    const prodResp = await getProductBySearchQuery(data);
    console.log(prodResp?.data.productlist);
    if(prodResp && prodResp.status === 200 && prodResp?.data){
      console.log( prodResp?.data.productlist);
      setProducts(prodResp?.data.productlist);
      setCProducts(prodResp?.data.productlist);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentProd= prodResp?.data.productlist.slice(
        startIndex,
        startIndex + itemsPerPage
      );
     setCProducts(currentProd)
      setTotalPage(Math.ceil(prodResp?.data.productlist.length / itemsPerPage));
      setFProducts(prodDataPush);
    }
    console.log("API product List", products);
  };

    useEffect(() => {
      console.log("searchQuery",searchQuery);
      if(searchQuery){
        getProductByHcodeFun({"code":searchQuery});
      }
    }, [searchQuery])
  useEffect(() => {
    // Perform tasks like fetching data
    setisLoggedIn(!!sessionStorage.getItem("loggedUserMobNo"));
    setUserData(JSON.parse(sessionStorage.getItem("userData") || "[]"
    ));
  }, [userLoginNo]);
  useEffect(() => {
    if (userdata) {
      getProductByHcodeFun({"code":searchQuery});
    }
  }, [userdata])
  useEffect(() => {
  }, [products])
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
    <productSearchComponentWrapper data-testid="productSearchComponent">
      <div className="min-h-screen p-1 bg-gray-50">
        <header
          className="fixed top-0 left-0 w-full z-10 shadow-lg bg-gradient-to-r from-green-500 via-green-400 to-green-300 rounded-b-lg backdrop-blur-lg flex items-center"
          style={{ height: "56px" }} // Fixed height for consistency
        >
          <div className="w-full flex items-center justify-between px-4">
            {/* Back Button */}
            <a
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md transition-transform hover:scale-110"
              style={{
                background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.5)",
              }}
            >
              <img src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg" alt="Back" className="w-5 h-5" />
            </a>

            {/* Title */}
            <div className="text-lg font-semibold text-white text-center flex-1 drop-shadow-lg truncate">
              {selCat}
            </div>

            {/* Search Button */}
            <a
              href="/search"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md transition-transform hover:scale-110"
              style={{
                background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.5)",
              }}
            >
              <img src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg" alt="Search" className="w-5 h-5" />
            </a>
          </div>
        </header>
        <div className="flex bg-white-700" style={{ height: "50%" }}>
          <main>
          <div className="mb-1 pt-[60px] flex justify-center px-1 bg-green-100">
  <div className="relative w-full max-w-md">
    {/* 🔍 FontAwesome Search Icon */}
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-500">
      <FontAwesomeIcon icon={faSearch} className="w-5 h-5 opacity-80 transition-opacity duration-300 hover:opacity-100" />
    </div>

    {/* Input Field with Green Theme & 3D Glass Effect */}
    <input
      type="text"
      placeholder="Search for products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-3 pl-14 pr-4 rounded-2xl shadow-lg border border-green-400 bg-white/80 backdrop-blur-lg
                 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-60
                 transition-all duration-300 ease-in-out text-gray-700
                 hover:shadow-2xl hover:-translate-y-1 text-base md:text-lg"
      style={{
        boxShadow: "0 5px 20px rgba(0, 128, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
      }}
    />
  </div>
</div>

            <div className="flex pt-[0px]" style={{
              paddingBottom: `${paddingBottom}px`,
            }}>
              {products && products.length > 0 && (
              <ProductListDisplayChild
              isLoggedIn={isLoggedIn}
              message={message}
              errorMessage={errorMessage}
              currentProducts={products}
              filteredProducts={products}
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
      </div>
    </productSearchComponentWrapper>
  )
};

export default productSearchComponent;
