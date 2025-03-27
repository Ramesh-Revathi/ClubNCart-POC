import { FC } from 'react';
import ReactTypescriptTemplateLogo from '../../assets/images/react-typescript-template.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const HomePage: FC = () => {
  const categories = [
    { id: 1, name: "Fresh Fruits", image: "https://services.kpnfresh.com/media/v1/categories/images/7e8481fb-d50a-4e1a-973a-69b9c815ab17/fresh-fruits.webp?c_type=C3" },
    { id: 2, name: "Suhoor Picks", image: "https://services.kpnfresh.com/media/v1/categories/images/d19b1f9d-3d5e-4025-9cec-9488a6e91f72/suhoor-picks.webp?c_type=C3" },
    { id: 3, name: "Iftar Delights", image: "https://services.kpnfresh.com/media/v1/categories/images/9fa0d6e3-f6af-4213-8112-bbbeb9b4db13/iftar-delights.webp?c_type=C3" },
    { id: 4, name: "Fresh Dairy", image: "https://services.kpnfresh.com/media/v1/categories/images/f3e10578-5ecb-4e4c-b816-6d2b61110931/fresh-dairy.webp?c_type=C3" },
    { id: 5, name: "Dry Fruits", image: "https://services.kpnfresh.com/media/v1/categories/images/847adf02-8010-419e-9e4f-f1b737a7ed0d/dry-fruits.webp?c_type=C3" },
    { id: 6, name: "Sweet Treats", image: "https://services.kpnfresh.com/media/v1/categories/images/f6ff6bab-e563-47e5-8b10-4214727003ff/sweets.webp?c_type=C3" },
    { id: 7, name: "Meal Prep", image: "https://services.kpnfresh.com/media/v1/categories/images/acc752c5-1c2b-4552-9200-24227991e9a5/meal-prep.webp?c_type=C3" },
    { id: 8, name: "Slip & Snacks", image: "https://services.kpnfresh.com/media/v1/categories/images/cb2c9554-a3ee-454e-886e-9e1ce5eda98b/sip-snacks.webp?c_type=C3" },
    { id: 5, name: "Dry Fruits", image: "https://services.kpnfresh.com/media/v1/categories/images/847adf02-8010-419e-9e4f-f1b737a7ed0d/dry-fruits.webp?c_type=C3" },
    { id: 6, name: "Sweet Treats", image: "https://services.kpnfresh.com/media/v1/categories/images/f6ff6bab-e563-47e5-8b10-4214727003ff/sweets.webp?c_type=C3" }
  ];
  const data =[{"categoryList":
    [
       {
         id: 1,
         code:'ff1',
         name: "Fresh Fruits",
         price: "$199",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/883ea6ac-d23a-42fe-a9bd-494cdd8b3e1d/fresh-fruits-6.webp?c_type=C3",
       },
       {
         id: 2,
         code:'fv2',
         name: "Fresh Vegetables",
         price: "$299",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/45df68d6-34fc-4cf0-beb9-a13da31c876c/fresh-vegetables-6.webp?c_type=C3",
       },
       {
         id: 3,
         code:'EX3',
         name: "Exotics",
         price: "$99",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/93737912-9d06-4c7b-afcd-e7c9161bc782/exotics.webp?c_type=C3",
       },
       {
         id: 4,
         code:'LV4',
         name: "Leafy Vegetables",
         price: "$49",
         image: "https://services.kpnfarmfresh.com/media/v1/categories/images/cf284654-6591-4d61-afce-af1dc4fe7092/leafy-vegetables.webp?c_type=C3",
       },
       {
          id: 5,
          code:'SJ5',
          name: "Salads & Juices",
          price: "$49",
          image: "https://services.kpnfresh.com/media/v1/categories/images/0db193b7-4b40-4453-9f83-9a7aa99d70ce/salads-juices.webp?c_type=C3",
        },
        {
          id: 6,
          code:'RF6',
          name: "Regional Favourites",
          price: "$49",
          image: "https://services.kpnfresh.com/media/v1/categories/images/e5b5f39f-aca8-4744-9a10-2aaacdf56cad/regional-produce-.webp?c_type=C3",
        },
     ],"categoryName":"Fruits & Vegetables"},
    {"categoryList":[{
         id: 1,
         code:'RF6',
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
         code:'RF6',
         name: "Rice & Atta",
         price: "$199",
         image: "https://services.kpnfresh.com/media/v1/categories/images/e43153e6-da36-424a-aae0-5832f9e5ee88/rice-atta-dals.webp?c_type=C3",
       },
      {
         id: 4,
         code:'RF6',
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
  return (
<div className="lg:pt-3 pb-2 flex justify-center items-center">
  <div className="w-full pb-1 lg:pb-1">
    <div className="-ml-4 -mr-4 h-[230px] bg-cover bg-center bg-no-repeat py-4 pl-4 bg-[url(https://t3.ftcdn.net/jpg/01/45/59/12/240_F_145591293_3fUNngBm3W7XGHaZJUW28wcI3JEapLfi.jpg)]">
      <div className="text-center">
        <span className="text-3xl">𝐹𝓇𝑒𝓈𝒽 𝐹𝒾𝓃𝒹𝓈, 𝐸𝓋𝑒𝓇𝓎 𝒯𝒾𝓂𝑒</span>
      </div>
      <div className="flex flex-col justify-end">
        <div className="pb-2">
          <div className="w-full overflow-x-auto scrollbar-thin justify-center items-center">
            <div className="flex space-x-1 p-1 justify-center items-center">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 w-28 h-28 bg-white shadow-md rounded-lg flex flex-col items-center justify-center p-4"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <h3 className="mt-2 text-center text-xs font-medium">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 pb-24 bg-white-100">
            {data.map((category) => (
               <div className="pb-4">
                  <div className="pb-4 text-base font-medium flex justify-center items-center">
                     <span style={{ color: 'black' }}>{category.categoryName}</span>
                     <div className="border-t flex-1 ml-4 border-gray-border_100">
                     </div></div>
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4">

                     {category.categoryList.map((product) => (
                        <Link style={{ textDecoration: 'none' }} to={`/productlist/${product.code}`}>
                                                <div
                           key={product.id}
                           className="bg-white shadow-md rounded-xl overflow-hidden"
                        >
                           <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover"
                           />
                           <div className="p-2 text-center">
                              <h2 className="text-sm font-medium text-decoration-none text-gray-500">{product.name}</h2>
                              {/* <p className="text-gray-600 text-xs">{product.price}</p> */}
                           </div>
                        </div>
                        </Link>
                     ))}
                  </div>
               </div>
            ))}
         </div>
  </div>
</div>
  );
};

export default HomePage;
