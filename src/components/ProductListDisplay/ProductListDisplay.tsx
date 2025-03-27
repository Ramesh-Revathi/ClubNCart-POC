import React, { useState, FC, useEffect, useRef } from 'react';
import { ProductListDisplayWrapper } from './ProductListDisplay.styled';
import { Link, useNavigate } from 'react-router-dom';
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
import { addCart, getLoggedInUser, loginViaEmail, loginViaMobile, logoutUser, saveUser } from '../../services/auth-handler.service';
import AppFooterSection from '../AppFooterSection/AppFooterSection';
import StorageService from '../../services/storage.service';

interface ProductListDisplayProps { 
  cartItemQuantity:(cartItems:any | []) => void;
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

const ProductListDisplay: FC<ProductListDisplayProps> = ({cartItemQuantity}) => {
  //const navigate = useNavigate();
  const { data, setData } = useData();
  const [userLoginNo, setUserLoginNo] = useState('');
  //const [disableBtn, setDisableBtn] = useState(false);
  const { isAuthenticated, loggedInUser } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [quantity, setQuantity] = useState<{ quantity: number; product: any }[]>([]); // Initial value
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userdata, setUserData] = useState<any>();
  const [userFetched, setUserFeched] = useState(false);
  const [message, setMessage] = useState<"error" | "warning" | "success">(
    "error"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const childRef = useRef<any>(null);

  const handleClickOpen = () => {
    //setOpen(true);
  };

  const [paddingBottom, setPaddingBottom] = useState(0); // Initial padding-bottom in px


  const products = [
    { id: 1, code: "AP001", name: "Pink Lady Apple", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfarmfresh.com/media/v1/products/images/87b46eca-52ef-46db-8376-12337e82d74d/apple-green-.webp?c_type=C1" },
    { id: 2, code: "AP002", name: "Apple Royal Gala", price: "1", minWeight: "250", maxWeight: "360", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfarmfresh.com/media/v1/products/images/91404703-75d5-4f7d-883b-c6544ca70f4d/apple-royal-gala.webp?c_type=C1" },
    { id: 3, code: "AP003", name: "Apple Shimla", price: "1", minWeight: "270", maxWeight: "300", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfarmfresh.com/media/v1/products/images/6e56c21b-2086-4d0a-b996-77621c3d5a85/apple-shimla.webp?c_type=C1" },
    { id: 4, code: "AP004", name: "Apple Royal Gala Economy - Pack of 4", price: "1", minWeight: "380", maxWeight: "300", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfresh.com/media/v1/products/images/0426da45-57f4-4f7b-a528-86bb3fddf86b/apple-royal-gala-economy-pack-of-4.webp?c_type=C1" },
    { id: 5, code: "AP005", name: "Apple Washington", price: "1", minWeight: "380", maxWeight: "300", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfarmfresh.com/media/v1/products/images/4a98b505-892f-43b9-b08a-aa896ae34a5d/apple-washington.webp?c_type=C1" },
    { id: 6, code: "AP006", name: "Apple Shimla Economy", price: "1", minWeight: "380", maxWeight: "300", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfresh.com/media/v1/products/images/4eb2b9b8-206c-41e8-99f2-5e466b277df9/apple-shimla-economy.webp?c_type=C1" },
    { id: 7, code: "AP007", name: "Pear Green", price: "1", minWeight: "300", maxWeight: "400", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfarmfresh.com/media/v1/products/images/45a8247d-f11c-4c90-8115-2fb78a86953d/pear-green.webp?c_type=C1" },
    { id: 8, code: "AP008", name: "Apple Iran", price: "1", minWeight: "300", maxWeight: "400", unit: "2", maximumQty: "5", category: "Apples & Pears", image: "https://services.kpnfresh.com/media/v1/products/images/8c506a06-0852-4b10-8c79-9795e14f8af6/apple-iran.webp?c_type=C1" },
    { id: 9, code: "BA009", name: "Banana Elaichi (Yellaki)", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/dc8c2f1a-d34b-4fc2-99ea-68a19b2ff6b9/banana-elaichi.webp?c_type=C1" },
    { id: 10, code: "BA0010", name: "Banana Nenthiran", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/d8742c58-99a4-47e0-8d09-c08bce753751/banana-nenthiran-semi-ripe.webp?c_type=C1" },
    { id: 11, code: "BA0011", name: "Banana Poovan", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/8104dabc-33b1-4584-988d-d9fc69e297df/banana-poovan-semi-ripe.webp?c_type=C1" },
    { id: 12, code: "BA0012", name: "Banana Fresh Hill - Semi Ripe", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/856d623c-5d4f-471a-9b95-ba5e02e4ba8e/banana-fresh-hill-semi-ripe.webp?c_type=C1" },
    { id: 13, code: "BA0013", name: "Banana Robusta", price: "49", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfarmfresh.com/media/v1/products/images/e5e10e93-4e7e-49a7-8b18-5eabc9fa9a28/morris-banana-robusta.webp?c_type=C1" },
    { id: 14, code: "BA0014", name: "Banana Karpooravalli", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfarmfresh.com/media/v1/products/images/43a8de56-7c8d-4322-afe9-9223c4cfcd75/banana-karpooravalli.webp?c_type=C1" },
    { id: 15, code: "BA0015", name: "Banana Red", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfarmfresh.com/media/v1/products/images/c15c2d68-33dc-41b9-8672-21eb6bb0a2d2/banana-red-sevvalai-.webp?c_type=C1" },
    { id: 16, code: "BA0016", name: "Banana Raw", price: "1", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/e39525c9-4e47-46b0-bc0e-40119a85d154/banana-raw.webp?c_type=C1" }
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const categories = [
    { menu: "All", image: "https://services.kpnfresh.com/media/v1/categories/images/7e8481fb-d50a-4e1a-973a-69b9c815ab17/fresh-fruits.webp?c_type=C1" },
    { menu: "Apples & Pears", image: "https://services.kpnfarmfresh.com/media/v1/categories/images/363b6aa0-cde4-46af-a183-dcdb91065aab/apples-pears.webp?c_type=C1" },
    { menu: "Bananas", image: "https://services.kpnfarmfresh.com/media/v1/categories/images/84810e4a-40c4-49dd-bf46-6fc7dc0ec26c/bananas.webp?c_type=C1" },
    { menu: "Citrus", image: "https://services.kpnfarmfresh.com/media/v1/categories/images/1e63777a-b182-473f-9d81-a32ff49e309b/citrus.webp?c_type=C1" }
  ];

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 8; // Number of items to show per page

  // Calculate the indices for slicing products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    // Perform tasks like fetching data
    setisLoggedIn(!!sessionStorage.getItem("loggedUserMobNo"));
    setUserData(JSON.parse(sessionStorage.getItem("userData")|| "[]"
  ));
  }, [userLoginNo]);
  useEffect(() => {
    if (userdata) {

    }
  }, [userdata])
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
    console.log('addedQuantityChangeChild',addedQuantityChangeChild);
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
    console.log('removeQuantityChangeChild',addedQuantityChangeChild);
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
        <header className="fixed top-0 left-0 w-full bg-white z-10" style={{ height: "10%" }}>
          <div className="p-4">
            <div className="flex items-center w-full"><a style={{ textDecoration: "none" }} href="/" className="w-7"><img src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg" alt="Bananas" /></a>
              <div className="flex justify-between items-center flex-1 w-full"><div className="text-lg pl-2 font-medium">{selectedCategory}</div>
                <a style={{ textDecoration: "none" }} href="/search">
                  <img width="22" height="22" src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg" alt="Search Product" className="w-5 h-5 m-3" /></a>
              </div></div>
          </div>
        </header>
        <main>
          <div className="flex pt-[70px]" style={{
            paddingBottom: `${paddingBottom}px`,
          }}>
            <SideMenuBar
              setShowSidebar={setShowSidebar}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showSidebar={showSidebar}
            />
            <ProductListDisplayChild
              isLoggedIn={isLoggedIn}
              message={message}
              errorMessage={errorMessage}
              currentProducts={currentProducts}
              filteredProducts={filteredProducts}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              currentPage={currentPage}
              goToPage={goToPage}
              handleClickOpen={handleClickOpen}
              handleOnMessageChangeChild={handleOnMessageChangeChild}
              handleOnErrorMessageChangeChild={handleOnErrorMessageChangeChild}
              addedQuantityChangeChild={addedQuantityChangeChild}
              removeQuantityChangeChild={removeQuantityChangeChild}
            />

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
