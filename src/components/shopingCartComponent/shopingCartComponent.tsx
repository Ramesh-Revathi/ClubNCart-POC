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

  const viewCartBottomChange = (data: any[] | []) => {};
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
    <div className="p-0">
      <header
        className="fixed top-0 left-0 w-full bg-white z-10"
        style={{ height: '10%' }}
      >
        <div className="p-3">
          <div className="flex items-center w-full">
            <a style={{ textDecoration: 'none' }} href="/" className="w-7">
              <img
                src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg"
                alt="Bananas"
              />
            </a>
            <div className="flex justify-between items-center flex-1 w-full">
              <div className="text-lg pl-2 font-medium">Shopping Cart</div>
              <a style={{ textDecoration: 'none' }} href="/search">
                <img
                  width="22"
                  height="22"
                  src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg"
                  alt="Search Product"
                  className="w-5 h-5 m-3"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      {productQuantities.length !== 0 && (
        <div className="container mb-1 pt-[70px]">
          <div className="w-full p-2 rounded-t-lg lg:hidden border border-gray-200 bg-gradient-to-b from-green-200 to-white flex justify-flex-star items-center h-[100px]">
            <span className="font-medium text-sm text-gray-800">
              Delivering in 11 minutes
            </span>
          </div>
        </div>
      )}
      {productQuantities.length === 0 ? (
        <div className="flex justify-center items-center ">
          <p className="text-gray-500 pt-[72px]">Your cart is empty.</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1  pt-[2px]"
          style={{ zIndex: '555' }}
        >
          {productQuantities.map((item) => (
            <div key={item.product.id} className="container mb-1">
              <div className="lg:w-[850px] m-auto">
                <li className="flex gap-1 justify-between w-full py-4 px-[10px] border-b last:border-b-0 border-gray-200">
                  <div className="flex-1">
                    <a
                      style={{ textDecoration: 'none' }}
                      target="_self"
                      rel="noreferrer"
                      className="flex gap-1"
                      href={`/product/${item.product.id}`}
                    >
                      <div className="w-16 lg:w-12 h-16 lg:h-12 border border-gray-200 rounded-md flex justify-center items-center p-0.5">
                        <img
                          src={item.product.image}
                          className="max-w-full"
                          alt={item.product.name}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-black text-gray-300 text-sm font-medium">
                          {item.product.name}
                        </div>
                        <div className="text-gray text-xs text-gray-700 font-light flex gap-3 items-center py-1.5">
                          <span className="leading-none">
                            Weight: {item.product.minWeight}g -{' '}
                            {item.product.maxWeight}g
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">
                          <span className="font-medium">
                            ₹ {item.product.price}
                          </span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <CustomCtrlNumberInput
                    message={message}
                    product={item}
                    routeflag={'cart'}
                    errorMessage={errorMessage}
                    onMessageChange={handleOnMessageChange}
                    onErrorMessageChange={handleOnErrorMessageChange}
                    onAddedQuantityChange={handleAddedQuantityChange}
                    style={{
                      maxWidth: '75px',
                      margin: '0 auto',
                      padding: '10px',
                      borderRadius: '10px',
                    }}
                    onRemoveQuantityChange={handleRemoveQuantityChange}
                  />
                </li>
              </div>
            </div>
          ))}
          <div className="container mb-1">
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
