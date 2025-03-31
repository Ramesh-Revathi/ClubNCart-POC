import { FC, useEffect, useState } from 'react';
import {
  addCart,
  getCart,
  removeCart,
} from '../../services/auth-handler.service';
import CustomCtrlNumberInput from '../CustomCtrlNumberInput/CustomCtrlNumberInput';
import DeliveryInstructions from '../DeliveryInstructions/DeliveryInstructions';
import DeliveryModeComponentCart from '../deliveryModeComponentCart/deliveryModeComponentCart';
import OrderSummaryComponent from '../OrderSummaryComponent/OrderSummaryComponent';

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

interface CartItem {
  quantity: number;
  product: Product;
}

interface payRequest {
  total: number;
  currencyCode: string;
}

interface ShoppingCartComponentProps {
  globalproductTotalAmount: number;
  globalitem: number;
  globaldeliveryFee: number;
  globalhandlingFee: number;
  globalgrandTotal: number;
  globalquantity: (cartItems: any | []) => void;
}
const ShoppingCartComponent: FC<ShoppingCartComponentProps> = ({
  globalproductTotalAmount,
  globalitem,
  globaldeliveryFee,
  globalgrandTotal,
  globalhandlingFee,
  globalquantity,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [payReq, setPayReq] = useState<payRequest>({
    total: 0.0,
    currencyCode: 'INR',
  });
  const [productQuantities, setProductQuantities] = useState<
    { quantity: number; product: Product }[]
  >([]);
  const [quantity, setQuantity] = useState<
    { quantity: number; product: any }[]
  >([]); // Initial value
  const [productTotalAmount, setproductTotalAmount] = useState<number | 0.0>(
    0.0
  );
  const [item, setItem] = useState<number | 0>(0);
  const [deliveryFee, setDeliveryFee] = useState<number | 0.0>(0.0);
  const [handlingFee, setHandlingFee] = useState<number | 0.0>(0.0);
  const [grandTotal, setGrandTotal] = useState<number | 0.0>(0.0);
  const [userdata, setUserData] = useState<any>();
  let objCartItems: any[] = [];
  const [currentTime, setCurrentTime] = useState<string>("");
  const [deliveryMinutes, setDeliveryMinutes] = useState<number>(11);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

      setDeliveryMinutes((prev) => Math.max(0, prev - 1));
    };

    // Initial update
    updateClock();

    // Update every second
    const interval = setInterval(updateClock, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    try {
      setUserData(JSON.parse(sessionStorage.getItem('userData') || '[]'));
      const data: CartItem[] = JSON.parse(
        sessionStorage.getItem('cartItemCount') || 'null'
      );
      if (data.length > 0) {
        setCartItems(data);
        setProductQuantities(data);
        objCartItems.push(productQuantities);
        setQuantity(objCartItems);
        globalquantity(objCartItems);
        handleViewCartBottomChange(data);
      }
    } catch (error) {
      console.error('Error parsing cart data from sessionStorage:', error);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('cartItemCount', JSON.stringify(productQuantities));
    objCartItems.push(productQuantities);
    setQuantity(objCartItems);
    globalquantity(objCartItems);
  }, [
    productQuantities,
    productTotalAmount,
    grandTotal,
    deliveryFee,
    handlingFee,
  ]);

  const handleOnMessageChange = (newMessage: string | null) => {
    setMessage(newMessage);
  };

  const handleOnErrorMessageChange = (newErrorMessage: string | null) => {
    setErrorMessage(newErrorMessage);
  };

  const handleAddedQuantityChange = async (input: {
    quantity: number;
    product: Product;
  }) => {
    const cartResponse = await addCart({
      mobile: userdata?.mobile,
      item: input,
    });
    debugger;
    if (cartResponse.statusText === 'OK') {
      const cartGetResponse = await getCart({ mobile: userdata?.mobile });
      if (
        cartGetResponse?.statusText === 'OK' &&
        cartGetResponse?.data?.cartitems?.product?.length > 0
      ) {
        setProductQuantities(cartGetResponse.data.cartitems.product);
      }
    }
    // setProductQuantities((prev) => {
    //   const existingEntryIndex = prev.findIndex(
    //     (entry) => entry.product.id === input.product.id
    //   );

    //   if (existingEntryIndex > -1) {
    //     const updatedQuantities = [...prev];
    //     if (input.quantity === 0) {
    //       updatedQuantities.splice(existingEntryIndex, 1);
    //     } else {
    //       updatedQuantities[existingEntryIndex].quantity = input.quantity;
    //     }
    //     return updatedQuantities;
    //   } else {
    //     return input.quantity > 0 ? [...prev, { quantity: input.quantity, product: input.product }] : prev;
    //   }
    // });
  };

  const handleRemoveQuantityChange = async (input: {
    quantity: number;
    product: Product;
  }) => {
    const cartResponse = await removeCart({
      mobile: userdata?.mobile,
      item: input,
    });
    debugger;
    console.log('cartResponse', cartResponse);
    if (cartResponse.statusText === 'OK') {
      const cartGetResponse = await getCart({ mobile: userdata?.mobile });
      console.log('cartResponse', cartGetResponse.data.cartitems.product);
      if (
        cartGetResponse?.statusText === 'OK' &&
        cartGetResponse?.data?.cartitems?.product?.length > 0
      ) {
        setProductQuantities(cartGetResponse.data.cartitems.product);
      } else {
        setProductQuantities([]);
        globalquantity(null);
      }
    }

    // setProductQuantities((prev) => {
    //   const existingEntryIndex = prev.findIndex(
    //     (entry) => entry.product.id === input.product.id
    //   );

    //   if (existingEntryIndex > -1) {
    //     const updatedQuantities = [...prev];
    //     if (input.quantity === 0) {
    //       updatedQuantities.splice(existingEntryIndex, 1);
    //     } else {
    //       updatedQuantities[existingEntryIndex].quantity = input.quantity;
    //     }
    //     return updatedQuantities;
    //   } else {
    //     return input.quantity > 0 ? [...prev, { quantity: input.quantity, product: input.product }] : prev;
    //   }
    // });
  };

  const viewCartBottomChange = (data: any[] | []) => { };
  const handleViewCartBottomChange = (data: any[]) => {
    if (data.length > 0) {
      setproductTotalAmount(data[0].amount);
      setCartItems(data[0].item);
      const deliverFeePrice = data[0].item * 0;
      const handlingFeePrice = 0;
      setDeliveryFee(deliverFeePrice);
      setHandlingFee(handlingFeePrice);
      const gtotal = productTotalAmount + deliverFeePrice + handlingFeePrice;
      setGrandTotal(gtotal);
      setPayReq({ total: grandTotal, currencyCode: 'INR' });
      sessionStorage.setItem('cartAmount', JSON.stringify(payReq));
    }
  };

  return (
    <div className="p-0 bg-green-100">
      <header
        className="fixed top-0 left-0 w-full z-10 shadow-lg bg-gradient-to-r from-green-500 via-green-400 to-green-300 rounded-b-lg backdrop-blur-lg"
        style={{
          height: "8%", // Compact header height
        }}
      >
        <div className="p-2 relative flex items-center justify-between">
          {/* Back Button */}
          <a
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md transform transition-transform hover:scale-110"
            style={{
              background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.5)",
            }}
          >
            <img
              src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg"
              alt="Back"
              className="w-4 h-4"
            />
          </a>

          {/* Title */}
          <div
            className="text-sm font-semibold text-white text-center drop-shadow-lg flex-grow"
            style={{
              textShadow: "0 0 4px rgba(255, 255, 255, 0.8), 0 0 6px rgba(255, 255, 255, 0.5)",
            }}
          >
            Shopping Cart
          </div>

          {/* Search Button */}
          <a
            href="/search"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md transform transition-transform hover:scale-110"
            style={{
              background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.5)",
            }}
          >
            <img
              src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg"
              alt="Search"
              className="w-4 h-4"
            />
          </a>
        </div>
      </header>




      {productQuantities.length === 0 ? (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-700">
        <div
          className="relative bg-gradient-to-b from-green-600 via-green-500 to-green-400 rounded-lg shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.03] flex flex-col items-center justify-center w-[90%] max-w-sm h-[50%] p-4"
          style={{ perspective: "800px" }}
        >
          {/* Background Glow */}
          <div
            className="absolute inset-0 rounded-lg bg-gradient-to-b from-green-500 via-green-400 to-green-300 transform rotate-x-[10deg] opacity-80 transition-transform duration-500 hover:rotate-x-0 shadow-inner"
          ></div>
      
          {/* Floating Shadow */}
          <div
            className="absolute -bottom-2 left-2 right-2 h-4 rounded-lg bg-green-700/40 blur-lg transform -skew-x-3"
          ></div>
      
          {/* Empty Cart Icon */}
          <div className="relative z-10 mb-4">
            <img
              src="https://png.pngtree.com/png-clipart/20240730/original/pngtree-shopping-cart-convenient-icon-png-image_15666221.png" // Replace with your image URL
              alt="Empty Cart"
              className="h-20 w-20 object-contain"
            />
          </div>
      
          {/* Message */}
          <p className="relative z-10 text-white text-lg font-bold text-center leading-tight drop-shadow-md">
            Your cart is empty
          </p>
          <p className="relative z-10 text-white text-sm mt-2 opacity-80 text-center">
            Start adding your favorite items now!
          </p>
      
          {/* Call-to-Action Button */}
          <a
            href="/"
            className="relative z-10 mt-4 px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 max-w-full"
          >
            Shop Now
          </a>
        </div>
      </div>      
      ) : (
        <div
  className="container mx-auto p-6 bg-green-100 rounded-2xl shadow-xl pt-[60px]"
  style={{ zIndex: 555 }}
>
  {/* Header or Card Title */}
  <h2 className="hidden text-lg font-bold text-green-800 mb-4">Your Cart</h2>
  {productQuantities.length !== 0 && (
        <div className="container mb-2">
          <div
            className="relative w-full p-3 rounded-md bg-gradient-to-b from-green-600 to-green-400 shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-[1.02] flex items-center h-[60px]"
          >
            {/* Background Animation */}
            <div
              className="absolute inset-0 rounded-md bg-gradient-to-b from-green-500 to-green-300 opacity-90 transform hover:opacity-100 transition-opacity duration-300"
            ></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center w-full">
              <span className="text-white text-sm font-bold leading-tight">
                Delivering in{" "}
                <span className="text-yellow-200 font-extrabold">{deliveryMinutes}</span> minutes
              </span>
              <span
                className="hidden text-xs text-gray-800 bg-white px-2 py-0.5 rounded-md shadow-sm mt-1"
                style={{
                  background: "linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))",
                }}
              >
                Time: <span className="text-green-700">{currentTime}</span>
              </span>
            </div>
          </div>
        </div>



      )}

  {/* Product List */}
  <ul className="divide-y divide-gray-200 pl-0">
    {productQuantities.map((item) => (
      <li
        key={item.product.id}
        className="flex items-center gap-4 py-4 px-4 hover:bg-green-50 transition-colors duration-200"
      >
        {/* Product Image */}
        <a
          href={`/product/${item.product.id}`}
          className="flex-none w-16 h-16 border border-green-200 rounded-lg flex justify-center items-center overflow-hidden shadow-sm"
          style={{ textDecoration: "none" }}
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            className="max-w-full"
          />
        </a>

        {/* Product Details */}
        <div className="flex-1">
          <a
            href={`/product/${item.product.id}`}
            className="block text-sm font-bold text-green-700 hover:underline"
          >
            {item.product.name}
          </a>
          <div className="text-xs text-gray-500 mt-1">
            Weight: {item.product.minWeight}g - {item.product.maxWeight}g
          </div>
          <div className="text-sm text-green-800 font-semibold mt-1">
            ₹ {item.product.price}
          </div>
        </div>

        {/* Quantity Input */}
        <div className="flex-none">
          <CustomCtrlNumberInput
            message={message}
            product={item}
            routeflag={"cart"}
            errorMessage={errorMessage}
            onMessageChange={handleOnMessageChange}
            onErrorMessageChange={handleOnErrorMessageChange}
            onAddedQuantityChange={handleAddedQuantityChange}
            onRemoveQuantityChange={handleRemoveQuantityChange}
            style={{
              maxWidth: "75px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </li>
    ))}
  </ul>

  {/* Summary and Actions */}
  <div className="mt-6">
    <DeliveryModeComponentCart />
    <DeliveryInstructions />
    <OrderSummaryComponent
      productTotalAmount={globalproductTotalAmount}
      item={globalitem}
      deliveryFee={globaldeliveryFee}
      handlingFee={globalhandlingFee}
      grandTotal={globalgrandTotal}
    />
  </div>
</div>

      )}
      {/* <ViewCartAtBottom
        quantity={quantity}
        routeFlag={'cart'}
        viewCartBottomChange={handleViewCartBottomChange}
        style={{
          bottom: 70,
          zIndex: 999,
          backgroundColor: "#f8f8f8",
          height: 80,
        }}
      /> */}
    </div>
  );
};

export default ShoppingCartComponent;
