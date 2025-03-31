import React, { FC, useState } from "react";
import { CustomCtrlNumberInputWrapper } from "./CustomCtrlNumberInput.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface CustomCtrlNumberInputProps {
  message: string | null;
  errorMessage: string | null;
  product: any;
  style:any,
  routeflag:string,
  onMessageChange: (message: string | null) => void; // Callback for message
  onErrorMessageChange: (errorMessage: string | null) => void; // Callback for errorMessage
  onAddedQuantityChange: ({ quantity, product }: { quantity: number; product: any }) => void;
  onRemoveQuantityChange: ({ quantity, product }: { quantity: number; product: any }) => void;
}

const CustomCtrlNumberInput: FC<CustomCtrlNumberInputProps> = ({
  message,
  errorMessage,
  product,
  style,
  routeflag,
  onMessageChange,
  onErrorMessageChange,
  onAddedQuantityChange,
  onRemoveQuantityChange
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [products, setproducts] = useState();

  const handleIncrement = () => {
    const newQuantity = quantity + 1;

    if (newQuantity > 3) {
      // Emit warning and error messages if the quantity exceeds the limit
      onMessageChange("warning");
      onErrorMessageChange("Quantity exceeds the limit!");
    } else {
      // Reset messages and update the quantity
      onMessageChange(null);
      onErrorMessageChange(null);
      setQuantity(newQuantity);
      if(routeflag=='cart'){
        onAddedQuantityChange({ quantity: newQuantity,product: products });
      }else{
        onAddedQuantityChange({ quantity: newQuantity, product });
      }
    }
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0;

    // Reset messages if the quantity is valid
    if (newQuantity <= 3) {
      onMessageChange(null);
      onErrorMessageChange(null);
    }

    setQuantity(newQuantity);
    
    if(routeflag=='cart'){
      onRemoveQuantityChange({ quantity: newQuantity,product: products });
    }else{
      onRemoveQuantityChange({ quantity: newQuantity, product });
    }
  };

  useState(()=>{
    if(routeflag=='cart'){
      setQuantity(product.quantity);
      setproducts(product.product);
    }
  })
  return (
    <CustomCtrlNumberInputWrapper data-testid="CustomCtrlNumberInput">
      <div
        className="d-flex align-items-center justify-content-center text-center text-black text-medium w-full border h-9 rounded-md bg-menuHilight"
        style={style}
      >
        {/* Decrement Button */}
        <button
          className="bg-menuHilight"
          onClick={handleDecrement}
          style={{
            width: "40px",
            cursor: "pointer", // Ensures a pointer cursor on hover
          }}
          disabled={quantity === 0} // Disable button if quantity is already 0
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        {/* Quantity Display */}
        <label
          className="text-center mx-2 bg-menuHilight"
          style={{
            width: "40px",
            display: "inline-block",
            padding: "4px",
            textAlign: "center",
          }}
        >
          {quantity}
        </label>

        {/* Increment Button */}
        <button
          className="bg-menuHilight"
          onClick={handleIncrement}
          style={{
            width: "40px",
            cursor: "pointer", // Ensures a pointer cursor on hover
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </CustomCtrlNumberInputWrapper>
  );
};

export default CustomCtrlNumberInput;
