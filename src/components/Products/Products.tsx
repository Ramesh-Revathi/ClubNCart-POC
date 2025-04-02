import React, { FC, useState } from 'react';
import { ProductsWrapper } from './Products.styled';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface ProductsProps {}

const Products: FC<ProductsProps> = () =>{
   const { id } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddCartClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const products = [
   { id: 1, code:"AP001",description: 'Delicious fresh apples.', name: "Pink Lady Apple", price: "INR 99", minWeight:"300" , maxWeight:"360", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfarmfresh.com/media/v1/products/images/87b46eca-52ef-46db-8376-12337e82d74d/apple-green-.webp?c_type=C1" },
   { id: 2, code:"AP002",description: 'Delicious fresh apples.', name: "Apple Royal Gala", price: "INR 88", minWeight:"250" , maxWeight:"360", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfarmfresh.com/media/v1/products/images/91404703-75d5-4f7d-883b-c6544ca70f4d/apple-royal-gala.webp?c_type=C1" },
   { id: 3, code:"AP003",description: 'Delicious fresh apples.', name: "Apple Shimla", price: "INR 300", minWeight:"270" , maxWeight:"300", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfarmfresh.com/media/v1/products/images/6e56c21b-2086-4d0a-b996-77621c3d5a85/apple-shimla.webp?c_type=C1" },
   { id: 4, code:"AP004",description: 'Delicious fresh apples.', name: "Apple Royal Gala Economy - Pack of 4", price: "INR 140", minWeight:"380" , maxWeight:"300", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfresh.com/media/v1/products/images/0426da45-57f4-4f7b-a528-86bb3fddf86b/apple-royal-gala-economy-pack-of-4.webp?c_type=C1" },
   { id: 5, code:"AP005",description: 'Delicious fresh apples.', name: "Apple Washington", price: "INR 110", minWeight:"380" , maxWeight:"300", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfarmfresh.com/media/v1/products/images/4a98b505-892f-43b9-b08a-aa896ae34a5d/apple-washington.webp?c_type=C1" },
   { id: 6, code:"AP006",description: 'Delicious fresh apples.', name: "Apple Shimla Economy", price: "INR 110", minWeight:"380" , maxWeight:"300", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfresh.com/media/v1/products/images/4eb2b9b8-206c-41e8-99f2-5e466b277df9/apple-shimla-economy.webp?c_type=C1" },
   { id: 7, code:"AP007",description: 'Delicious fresh apples.', name: "Pear Green", price: "INR 110", minWeight:"300" , maxWeight:"400", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfarmfresh.com/media/v1/products/images/45a8247d-f11c-4c90-8115-2fb78a86953d/pear-green.webp?c_type=C1" },
   { id: 8, code:"AP008",description: 'Delicious fresh apples.', name: "Apple Iran", price: "INR 110", minWeight:"300" , maxWeight:"400", unit:"2", maximumQty:"5", category: "Apples & Pears", image:"https://services.kpnfresh.com/media/v1/products/images/8c506a06-0852-4b10-8c79-9795e14f8af6/apple-iran.webp?c_type=C1" },
   { id: 9, code:"BA009",description: 'Delicious fresh apples.', name: "Banana Elaichi (Yellaki)", price: "INR 99", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/dc8c2f1a-d34b-4fc2-99ea-68a19b2ff6b9/banana-elaichi.webp?c_type=C1"},
   { id: 10, code:"BA0010",description: 'Delicious fresh apples.', name: "Banana Nenthiran", price: "INR 76", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/d8742c58-99a4-47e0-8d09-c08bce753751/banana-nenthiran-semi-ripe.webp?c_type=C1"},
   { id: 11, code:"BA0011",description: 'Delicious fresh apples.', name: "Banana Poovan", price: "INR 94", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/8104dabc-33b1-4584-988d-d9fc69e297df/banana-poovan-semi-ripe.webp?c_type=C1"},
   { id: 12, code:"BA0012",description: 'Delicious fresh apples.', name: "Banana Fresh Hill - Semi Ripe", price: "INR 79", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/856d623c-5d4f-471a-9b95-ba5e02e4ba8e/banana-fresh-hill-semi-ripe.webp?c_type=C1"},
   { id: 13, code:"BA0013",description: 'Delicious fresh apples.', name: "Banana Robusta", price: "INR 49", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfarmfresh.com/media/v1/products/images/e5e10e93-4e7e-49a7-8b18-5eabc9fa9a28/morris-banana-robusta.webp?c_type=C1"},
   { id: 14, code:"BA0014",description: 'Delicious fresh apples.', name: "Banana Karpooravalli", price: "INR 89", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfarmfresh.com/media/v1/products/images/43a8de56-7c8d-4322-afe9-9223c4cfcd75/banana-karpooravalli.webp?c_type=C1"},
   { id: 15, code:"BA0015",description: 'Delicious fresh apples.', name: "Banana Red", price: "INR 89", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfarmfresh.com/media/v1/products/images/c15c2d68-33dc-41b9-8672-21eb6bb0a2d2/banana-red-sevvalai-.webp?c_type=C1"},
   { id: 16, code:"BA0016",description: 'Delicious fresh apples.', name: "Banana Raw", price: "INR 89", minWeight: "300", maxWeight: "360", unit: "2", maximumQty: "5", category: "Bananas", image: "https://services.kpnfresh.com/media/v1/products/images/e39525c9-4e47-46b0-bc0e-40119a85d154/banana-raw.webp?c_type=C1"},
   
   ];
 const product = products.find((item) => item.code === id);

  if (!product) {
    return <p>Product not found!</p>;
  }
  const isLoggedConfirm = sessionStorage.getItem("loggedUserMobNo");
  if(isLoggedConfirm){
  }
  
   return (
 <ProductsWrapper data-testid="Products">
           <header className="hidden fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="p-4">
        <div className="flex items-center w-full"><a onClick={() => navigate(-1)} className="w-7"><img src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg" alt="Bananas" /></a>
         <div className="flex justify-between items-center flex-1 w-full"><div className="text-lg pl-2 font-medium">{product.category}</div>
         <a style={{ textDecoration: "none" }} href="/search">
         <img width="22" height="22" src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg" alt="Search Product" className="w-5 h-5 m-3" /></a>
         </div></div>
        </div>
      </header>
        <div className="pt-[70px]">
      {/* <button
        className="text-blue-500 hover:underline mb-4"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button> */}
      <div className="bg-white border rounded-lg p-4 shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-500 text-lg mt-2">{product.price}</p>
        <div className="flex-1 lg:w-1/2">
  <div className="hidden lg:block">
    <ul className="flex flex-wrap">
      <li className="pr-1">
        <a style={{ textDecoration: "none" }} className="text-sm hover:underline text-gray-600" href="/">
          Home /
        </a>
      </li>
      <li className="pr-1">
        <a style={{ textDecoration: "none" }}
          className="text-sm hover:underline text-gray-600"
          href="/fresh-fruits/c/1_10"
        >
          Fresh Fruits /
        </a>
      </li>
      <li className="pr-1">
        <a
          className="text-sm hover:underline text-gray-600"
          href="/apples-pears/c/2_1010"
        >
          Apples & Pears /
        </a>
      </li>
      <li>
        <span className="text-sm text-gray-600">Apple Washington</span>
      </li>
    </ul>
    <h1 className="text-xl font-medium pt-4 pb-4">Apple Washington</h1>

    <div className="lg:mb-5">
      <div className="text-gray-600 text-base py-3">Select Unit</div>
      <ul className="w-full flex flex-col">
        {[
          { label: "2 pcs (320g - 400g)", price: "₹115", selected: true },
          { label: "4 pcs (640g - 800g)", price: "₹229", selected: false },
          { label: "6 pcs (960g - 1200g)", price: "₹344", selected: false },
        ].map((unit, index) => (
          <li
            key={index}
            className={`w-full flex justify-between text-center cursor-pointer border INR {
              unit.selected ? "border-primary" : "border-gray-300"
            } last:rounded-b-lg first:rounded-t-lg`}
          >
            <div className="h-24 p-5 flex-1 flex justify-between items-center">
              <div className="flex flex-1 sm:flex-2 h-full items-center">
                <div className="px-3 sm:px-5 h-full flex justify-center items-center">
                  <input
                    name="unitSelect"
                    type="radio"
                    id={`unit_select_INR {index}`}
                    readOnly
                    className="hidden"
                    checked={unit.selected}
                  />
                  <label htmlFor={`unit_select_INR {index}`}>
                    <img
                      className="h-6 w-6"
                      src={
                        unit.selected
                          ? "/_next/static/media/selectedRadioIconYellow.11ce8ecf.svg"
                          : "/_next/static/media/unSelectedRadioIconWhite.f9dc0104.svg"
                      }
                      alt="Radio Icon"
                    />
                  </label>
                </div>
                <div className="text-left">
                  <p className="text-gray-600 text-sm">{unit.label}</p>
                  <div>
                    <span className="text-xl sm:text-2xl mr-2">{unit.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  role="button"
                  className={`INR {
                    unit.selected ? "bg-primary" : "bg-gray-200"
                  } border border-primary w-full text-black rounded-md font-medium cursor-pointer`}
                >
                  <button className="h-9 w-24 text-sm">Add</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  <div className="mt-2 justify-center">
    <button
      type="button"
      onClick={handleAddCartClick}
      className="w-full px-4 py-2 rounded-lg font-medium bg-menuHilight text-gray hover:bg-menuHilight-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      AddCart
    </button>
</div>
  <div className="border border-gray-300 rounded-lg p-4 mt-2.5">
    <h2
      role="button"
      className="text-xl font-medium leading-none flex justify-between items-center"
    >
      <span>Product Details</span>
      <img
        src="https://www.kpnfresh.com/_next/static/media/chevron-right.254448e8.svg"
        alt="Product Details"
        className="-rotate-90 w-5"
      />
    </h2>
    <div className="block pt-5">
      <div className="pb-4">
        <div className="text-base font-medium flex items-center pb-3">
          <div>Description</div>
        </div>
        <div className="text-base text-gray-500">
          The Apple Washington, an emblem of American orchards, boasts a classic
          apple profile with a hint of tartness. Its versatility shines in both
          cooking and snacking, making it a kitchen essential.
        </div>
      </div>

      {[
        { label: "Storage Instructions", value: "Keep in a cool, shaded area or in the refrigerator." },
        { label: "Nutrient Value", value: "Rich in vitamins, dietary fiber, and antioxidants." },
        { label: "Brand", value: "KPN" },
        { label: "Country Of Origin", value: "IN" },
        { label: "Seller By", value: "KPN Farms Pvt. Ltd." },
        { label: "Fragile", value: "No" },
        { label: "SKU", value: "10000097" },
      ].map((detail, index) => (
        <div className="pb-4" key={index}>
          <div className="text-base pb-2 font-medium">{detail.label}</div>
          <div className="text-base text-gray-500">{detail.value}</div>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>
    {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Product Added to Cart</h2>
            <p className="text-gray-600 mb-4">
              {product.name} has been added to your cart.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Close
              </button>
              <Link to="/cart">
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                  View Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    
 </ProductsWrapper>
)};

export default Products;
