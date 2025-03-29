import React, { FC } from 'react';
import { MdCategoryDisplayWrapper } from './MdCategoryDisplay.styled';
import { Link } from 'react-router-dom';

interface MdCategoryDisplayProps { }

const MdCategoryDisplay: FC<MdCategoryDisplayProps> = () => {
   const data =[{"categoryList":
      [
         {
           id: 1,
           code:'FF',
           name: "Fresh Fruits",
           price: "$199",
           image: "https://services.kpnfarmfresh.com/media/v1/categories/images/883ea6ac-d23a-42fe-a9bd-494cdd8b3e1d/fresh-fruits-6.webp?c_type=C3",
         },
         {
           id: 2,
           code:'FV',
           name: "Fresh Vegetables",
           price: "$299",
           image: "https://services.kpnfarmfresh.com/media/v1/categories/images/45df68d6-34fc-4cf0-beb9-a13da31c876c/fresh-vegetables-6.webp?c_type=C3",
         },
         {
           id: 3,
           code:'EX',
           name: "Exotics",
           price: "$99",
           image: "https://services.kpnfarmfresh.com/media/v1/categories/images/93737912-9d06-4c7b-afcd-e7c9161bc782/exotics.webp?c_type=C3",
         },
         {
           id: 4,
           code:'LV',
           name: "Leafy Vegetables",
           price: "$49",
           image: "https://services.kpnfarmfresh.com/media/v1/categories/images/cf284654-6591-4d61-afce-af1dc4fe7092/leafy-vegetables.webp?c_type=C3",
         },
         {
            id: 5,
            code:'SJ',
            name: "Salads & Juices",
            price: "$49",
            image: "https://services.kpnfresh.com/media/v1/categories/images/0db193b7-4b40-4453-9f83-9a7aa99d70ce/salads-juices.webp?c_type=C3",
          },
          {
            id: 6,
            code:'RF',
            name: "Regional Favourites",
            price: "$49",
            image: "https://services.kpnfresh.com/media/v1/categories/images/e5b5f39f-aca8-4744-9a10-2aaacdf56cad/regional-produce-.webp?c_type=C3",
          },
       ],"categoryName":"Fruits & Vegetables"},
      {"categoryList":[{
           id: 1,
           code:'DEB',
           name: "Dairy Eggs & Breads",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/3ddf0635-9f91-4694-91c8-023dc65bd956/dairy-eggs-bread.webp?c_type=C3",
         },{
           id: 2,
           code:'RF6',
           name: "Dairy Eggs & Breads",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/3ddf0635-9f91-4694-91c8-023dc65bd956/dairy-eggs-bread.webp?c_type=C3",
         },
        {
           id: 3,
           code:'RA',
           name: "Rice & Atta",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/e43153e6-da36-424a-aae0-5832f9e5ee88/rice-atta-dals.webp?c_type=C3",
         },
        {
           id: 4,
           code:'EOG',
           name: "Edible Oil & Ghee",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/6c7a3e89-a075-4b60-b3e4-7bc58523d157/edible-oil-ghee.webp?c_type=C3",
         }],"categoryName":"Grocery & More"},
        {"categoryList":[{
           id: 1,
           code:'RF6',
           name: "Chips & Nammkeen",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/dc42006e-98ce-4046-aa26-b0314ab8d459/munchies.webp?c_type=C3",
         },{
           id: 2,
           code:'RF6',
           name: "Drinks & Juices",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/5d0fa533-2a5e-41dc-9429-01d9a374c909/cold-drinks-juices.webp?c_type=C3",
         },
        {
           id: 3,
           code:'RF6',
           name: "Sweets & Chocolates",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/15a7dc40-a344-4a37-a11c-3537f0ea4724/sweet-tooth.webp?c_type=C3",
         },
        {
           id: 4,
           code:'RF6',
           name: "Ice Creams",
           price: "$199",
           image: "https://services.kpnfresh.com/media/v1/categories/images/dc239198-d8fb-44d7-ad8d-77083a1383c0/ice-creams.webp?c_type=C3",
         }],"categoryName":"Snacks & Drinks"}];
   const Groceries = [
      {
         id: 1,
         name: "Fresh Fruits",
         price: "FF",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/883ea6ac-d23a-42fe-a9bd-494cdd8b3e1d/fresh-fruits-6.webp?c_type=C3",
      },
      {
         id: 2,
         name: "Fresh Vegetables",
         price: "$299",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/45df68d6-34fc-4cf0-beb9-a13da31c876c/fresh-vegetables-6.webp?c_type=C3",
      },
      {
         id: 3,
         name: "Exotics",
         price: "$99",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/93737912-9d06-4c7b-afcd-e7c9161bc782/exotics.webp?c_type=C3",
      },
      {
         id: 4,
         name: "Leafy Vegetables",
         price: "$49",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/cf284654-6591-4d61-afce-af1dc4fe7092/leafy-vegetables.webp?c_type=C3",
      },
      {
         id: 5,
         name: "Laptop Stand",
         price: "$49",
         image: "https://services.kpnfresh.com/media/v1/categories/images/0db193b7-4b40-4453-9f83-9a7aa99d70ce/salads-juices.webp?c_type=C3",
      },
      {
         id: 6,
         name: "Laptop Stand",
         price: "$49",
         image: "https://services.kpnfresh.com/media/v1/categories/images/e5b5f39f-aca8-4744-9a10-2aaacdf56cad/regional-produce-.webp?c_type=C3",
      },
   ];
   return (
      <MdCategoryDisplayWrapper data-testid="MdCategoryDisplay">
         <div className="pb-0 bg-green-100 min-h-screen pt-0 p-2">
            {data.map((category) => (
               <div className="pb-4 pt-3">
                  <div className="pb-4 text-base font-medium flex justify-center items-center">
                     <span style={{ color: 'black' }}>{category.categoryName}</span>
                     <div className="border-t flex-1 ml-4 border-black-border_700">
                     </div></div>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-4">

                     {category.categoryList.map((product) => (
                        <Link style={{ textDecoration: 'none' }} to={`/productlist/${product.code}`}>
                                                <div
                           key={product.id}
                           className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col h-full"
                        >
                           <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-16 object-cover"
                           />
                           <div className="p-2 text-center flex-1 flex flex-col justify-end">
                              <h2 className="text-sm text-gray-500 font-medium text-decoration-none">{product.name}</h2>
                              {/* <p className="text-gray-600 text-xs">{product.price}</p> */}
                           </div>
                        </div>
                        </Link>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </MdCategoryDisplayWrapper>
   )
};

export default MdCategoryDisplay;
