import React, { FC, useEffect, useState } from 'react';
import { productListDisplayChildWrapper } from './productListDisplayChild.styled';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import CustomCtrlNumberInput from '../CustomCtrlNumberInput/CustomCtrlNumberInput'; // Adjust path based on your file structure
import { useAuth } from '../../hooks/AuthContext';
import { addCart, getCart, removeCart } from '../../services/auth-handler.service';

interface Product {
  id: number; // Change this from string to number
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
interface ProductListDisplayChildProps {
  isLoggedIn: boolean;
  message:string|null,
  errorMessage:string|null,
  currentProducts: Product[];
  filteredProducts: Product[];
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  handleClickOpen: () => void;
  handleOnMessageChangeChild: (message: string | null) => void; // Callback for message
  handleOnErrorMessageChangeChild: (errorMessage: string | null) => void; // Callback for errorMessage
  addedQuantityChangeChild: (cartItems:any | []) => void;
  removeQuantityChangeChild: (cartItems:any | []) => void;
}

const ProductListDisplayChild: FC<ProductListDisplayChildProps> = ({
  isLoggedIn,
  handleOnMessageChangeChild,
  handleOnErrorMessageChangeChild,
  currentProducts,
  filteredProducts,
  itemsPerPage,
  totalPages,
  currentPage,
  goToPage,
  handleClickOpen,
  addedQuantityChangeChild,
  removeQuantityChangeChild
}) => {
  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("userData")|| "[]"
  ));
  }, []);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addedQuantities, setAddedQuantities] = useState<{ quantity: number; product: any }[]>([]);
  const { isAuthenticated } = useAuth();
  const [userdata, setUserData] = useState<any>();
 // Callback for quantity changes
 const handleAddedQuantityChange = async ({ quantity, product }: { quantity: number; product: any }) => {
  // Update the added quantities for the specific product
  const cartResponse = await addCart({mobile:userdata?.mobile,item:{ quantity, product }});
  debugger
  if(cartResponse.statusText === "OK"){
    const cartGetResponse = await getCart({"mobile":userdata?.mobile});
    if (cartGetResponse?.statusText === "OK" && cartGetResponse?.data?.cartitems?.product?.length > 0) {
      addedQuantityChangeChild(cartGetResponse.data.cartitems.product);
    }
  }
  // setAddedQuantities((prev) => {
  //   const existingEntryIndex = prev.findIndex((entry) => entry.product.id === product.id);
  //   if (existingEntryIndex > -1) {
  //     // Update the existing product entry
  //     const updatedQuantities = [...prev];
  //     updatedQuantities[existingEntryIndex].quantity = quantity;
  //     addedQuantityChangeChild(updatedQuantities);
  //     return updatedQuantities;
  //   } else {
  //     // Add a new product entry
  //     addedQuantityChangeChild([...prev, { quantity, product }]);
  //     return [...prev, { quantity, product }];
  //   }
  // });

};

const handleRemoveQuantityChange = async ({ quantity, product }: { quantity: number; product: any }) => {
  // Update the added quantities for the specific product
  const cartResponse = await removeCart({mobile:userdata?.mobile,item:{ quantity, product }});
  if(cartResponse.statusText === "OK"){
    const cartGetResponse = await getCart({"mobile":userdata?.mobile});
    if (cartGetResponse?.statusText === "OK" && cartGetResponse?.data?.cartitems?.product?.length > 0) {
      removeQuantityChangeChild(cartGetResponse.data.cartitems.product);
    }
  }
  // setAddedQuantities((prev) => {
  //   const existingEntryIndex = prev.findIndex((entry) => entry.product.id === product.id);
  //   if (existingEntryIndex > -1) {
  //     // Update the existing product entry
  //     const updatedQuantities = [...prev];
  //     updatedQuantities[existingEntryIndex].quantity = quantity;
  //     addedQuantityChangeChild(updatedQuantities);
  //     return updatedQuantities;
  //   } else {
  //     // Add a new product entry
  //     addedQuantityChangeChild([...prev, { quantity, product }]);
  //     return [...prev, { quantity, product }];
  //   }
  // });

};

  const handleOnMessageChange = (newMessage: string | null) => {
    setMessage(newMessage);
    handleOnMessageChangeChild(newMessage)
  };

  const handleOnErrorMessageChange = (newErrorMessage: string | null) => {
    setErrorMessage(newErrorMessage);
    handleOnErrorMessageChangeChild(newErrorMessage)
  };
  return (
<productListDisplayChildWrapper data-testid="productListDisplayChild">
  <div className="flex min-h-screen">
    {/* Main Content */}
    <main className="flex-1 bg-gradient-to-b from-green-200 to-green-100 p-2 relative">
      {/* Subtle Water Droplets Effect */}
      <div className="absolute inset-0 bg-green-50 opacity-30 pointer-events-none overflow-hidden">
        {/* Water droplet effect */}
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-gradient-to-br from-white to-green-200 opacity-40 blur-md"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-b from-green-50 to-green-100 rounded-lg shadow-md overflow-hidden 
                       transform transition-transform hover:scale-105 hover:shadow-lg"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Link to={`/productview/${product.code}`} style={{ textDecoration: "none" }}>
              <div className="flex flex-col items-center p-3">
                {/* Product Image */}
                <img
                  loading="lazy"
                  className="w-full h-24 object-contain bg-gray-50 rounded-md"
                  src={product.image}
                  alt={product.name}
                  title={product.name}
                />
                {/* Product Name and Price */}
                <div className="mt-1 text-center">
                  <h3
                    className="text-xs font-medium text-gray-900 line-clamp-2"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="text-green-700 text-sm font-semibold mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </Link>

            {/* Add to Cart */}
            <div className="p-2">
              {isAuthenticated ? (
                <CustomCtrlNumberInput
                  message={message}
                  product={product}
                  routeflag="list"
                  errorMessage={errorMessage}
                  onMessageChange={handleOnMessageChange}
                  onErrorMessageChange={handleOnErrorMessageChange}
                  onAddedQuantityChange={handleAddedQuantityChange}
                  onRemoveQuantityChange={handleRemoveQuantityChange}
                  style={{
                    maxWidth: "140px",
                    margin: "0 auto",
                    padding: "3px",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <button
                  onClick={handleClickOpen}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-xs"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-3 text-xs">
          No products found.
        </p>
      )}

      {/* Pagination Controls */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-3 space-x-2">
          <button
            className="px-3 py-1 bg-green-300 text-white rounded-full shadow hover:bg-green-400 disabled:bg-gray-200 disabled:text-gray-400 text-xs"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-full shadow text-xs ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-green-300 text-gray-800"
              } hover:bg-green-400`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-green-300 text-white rounded-full shadow hover:bg-green-400 disabled:bg-gray-200 disabled:text-gray-400 text-xs"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  </div>
</productListDisplayChildWrapper>

  );
};

export default ProductListDisplayChild;
