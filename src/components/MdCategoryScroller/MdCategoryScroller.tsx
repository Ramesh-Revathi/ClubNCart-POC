import React, { FC } from 'react';
import { MdCategoryScrollerWrapper } from './MdCategoryScroller.styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
interface MdCategoryScrollerProps {}

const MdCategoryScroller: FC<MdCategoryScrollerProps> = () =>{
       const categories = [
         { id: 1, name: "Fresh Fruits", image: "https://services.kpnfresh.com/media/v1/categories/images/7e8481fb-d50a-4e1a-973a-69b9c815ab17/fresh-fruits.webp?c_type=C3" },
         { id: 2, name: "Suhoor Picks", image: "https://services.kpnfresh.com/media/v1/categories/images/d19b1f9d-3d5e-4025-9cec-9488a6e91f72/suhoor-picks.webp?c_type=C3" },
         { id: 3, name: "Iftar Delights", image: "https://services.kpnfresh.com/media/v1/categories/images/9fa0d6e3-f6af-4213-8112-bbbeb9b4db13/iftar-delights.webp?c_type=C3" },
         { id: 4, name: "Fresh Dairy", image: "https://services.kpnfresh.com/media/v1/categories/images/f3e10578-5ecb-4e4c-b816-6d2b61110931/fresh-dairy.webp?c_type=C3" },
         { id: 5, name: "Dry Fruits", image: "https://services.kpnfresh.com/media/v1/categories/images/847adf02-8010-419e-9e4f-f1b737a7ed0d/dry-fruits.webp?c_type=C3" },
         { id: 6, name: "Sweet Treats", image: "https://services.kpnfresh.com/media/v1/categories/images/f6ff6bab-e563-47e5-8b10-4214727003ff/sweets.webp?c_type=C3" },
         { id: 7, name: "Meal Prep", image: "https://services.kpnfresh.com/media/v1/categories/images/acc752c5-1c2b-4552-9200-24227991e9a5/meal-prep.webp?c_type=C3" },
         { id: 8, name: "Slip & Snacks", image: "https://services.kpnfresh.com/media/v1/categories/images/cb2c9554-a3ee-454e-886e-9e1ce5eda98b/sip-snacks.webp?c_type=C3" },
       ];

       return  (
         <MdCategoryScrollerWrapper data-testid="MdCategoryScroller">
                  <div className="lg:pt-3 pb-2">
        <div className="w-full pb-1 lg:pb-1">
        <div className="-ml-4 -mr-4 h-[230px] bg-cover bg-center bg-no-repeat py-4 pl-4 bg-[url(https://t3.ftcdn.net/jpg/01/45/59/12/240_F_145591293_3fUNngBm3W7XGHaZJUW28wcI3JEapLfi.jpg)]">
        <div className='text-center'><span className='text-3xl'>𝐹𝓇𝑒𝓈𝒽 𝐹𝒾𝓃𝒹𝓈, 𝐸𝓋𝑒𝓇𝓎 𝒯𝒾𝓂𝑒</span></div>
        <div className="flex flex-col justify-end">
        <div className="pb-2">
        <div className="w-full overflow-x-auto">
              <div className="flex space-x-1 p-1">
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
          <main className="p-0 space-y-4 pt-3 pb-3">
          <div className="w-full z-10">
            <Swiper
                       modules={[Autoplay]} // Include the autoplay module
                       autoplay={{
                         delay: 3000, // Delay between slides in milliseconds (3 seconds)
                         disableOnInteraction: false, // Keeps autoplay active after user interaction
                       }}
                       spaceBetween={50} // Space between slides
                       slidesPerView={1} // Number of slides visible at a time
                       loop={true} // Enable infinite looping
                       className='z-0'
            >
              <SwiperSlide><img src="https://vegease.in/blog/wp-content/uploads/slider/cache/99ae52b073860b250e3a927714f2fbeb/cebd4da9-213f-47ef-872e-6d609df7b1fb.jpg" alt="Slide 1" /></SwiperSlide>
              <SwiperSlide><img src="https://www.dryfruithub.com/image/cache/catalog/Slider/9-1349x407.jpg" alt="Slide 2"/></SwiperSlide>
              <SwiperSlide><img src="https://cdn.shopify.com/s/files/1/0278/2307/9508/files/Slider-_5.jpg?v=1644055205"></img></SwiperSlide>
            </Swiper>
            </div>
          </main>
        </div>
        </div>
        </div>
        </div>
         </MdCategoryScrollerWrapper>
        );
}

export default MdCategoryScroller;
