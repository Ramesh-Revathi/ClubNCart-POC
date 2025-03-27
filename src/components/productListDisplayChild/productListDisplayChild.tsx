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
  {/* Main Content */}
  <main
    className="flex-1 p-1 overflow-y-auto"
    style={{ height: "auto", paddingBottom: "0" }} // Adjust height and padding
  >
    {/* Product Grid */}
    <div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1"
      style={{ width: "100%" }}
    >
      {currentProducts.map((product) => (
        <div
          key={product.id}
          className="relative bg-white border rounded-lg hover:shadow-lg pb-4" // Reduce padding at the bottom
        >
          <Link
            to={`/productview/${product.code}`}
            style={{ textDecoration: "none" }}
          >
            <div>
              <img
                loading="lazy"
                className="w-30 h-30 object-cover p-2 rounded-md"
                src={product.image}
                alt={product.name}
                title={product.name}
              />
              <div className="mt-2 p-2">
                <h3 className="text-sm font-semibold text-gray-700">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  <span className="ruppee-symbol-font">₹</span>
                  {product.price}
                </p>
              </div>
            </div>
          </Link>
          <div className="absolute bottom-2 left-2 right-2">
            {isAuthenticated ? (
              <CustomCtrlNumberInput
                message={message}
                product={product}
                routeflag={'list'}
                errorMessage={errorMessage}
                onMessageChange={handleOnMessageChange}
                onErrorMessageChange={handleOnErrorMessageChange}
                onAddedQuantityChange={handleAddedQuantityChange}
                onRemoveQuantityChange={handleRemoveQuantityChange}
                style={{
                  maxWidth: "300px",
                  margin: "0 auto",
                  padding: "10px",
                  borderRadius:"10px"
                }}
              />
            ) : (
              <button
                onClick={handleClickOpen}
                className="w-full bg-menuHilight hover:bg-menuHilight text-gray py-2 px-4 rounded"
              >
                Add
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* No Products Message */}
    {filteredProducts.length === 0 && (
      <p className="text-gray-500 mt-4">No products found.</p>
    )}

    {/* Pagination Controls */}
    {filteredProducts.length > itemsPerPage && (
      <div className="flex flex-wrap justify-center items-center mt-4 space-x-2">
        <button
          className="px-3 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-2 text-sm sm:text-base ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } rounded hover:bg-gray-300`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    )}
  </main>
</productListDisplayChildWrapper>
  );
};

export default ProductListDisplayChild;
