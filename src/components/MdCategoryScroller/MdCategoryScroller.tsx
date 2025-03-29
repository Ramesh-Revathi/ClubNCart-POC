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
                  <div className="lg:pt-3 pb-0">
                  <main className="p-0 space-y-4 pt-0 pb-0">
  <div className="w-full z-10 h-[300px] bg-green-700"> {/* Adjust height as needed */}
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      className="z-0 h-full" 
    >      <SwiperSlide className="h-full flex items-center justify-center">
    <img 
      src="https://cdn.intellemo.ai/int-stock/618e0dfef844f6e433a9587f/618e0dfff844f6e433a95880-v334/bringing_fresh_fruits_l.jpg"
      alt="Slide 3"
      className="w-full h-full object-cover"
    />
  </SwiperSlide>
      <SwiperSlide className="h-full flex items-center justify-center">
        <img 
          src="https://i.pinimg.com/736x/f7/b5/97/f7b597493cbd83ce92e2c7a0df0c7b4c.jpg" 
          alt="Slide 1" 
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide className="h-full flex items-center justify-center">
        <img 
          src="https://i.pinimg.com/736x/04/8e/66/048e662532e17355e9e426744b82c2ee.jpg" 
          alt="Slide 2"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide className="h-full flex items-center justify-center">
        <img 
          src="https://i.pinimg.com/736x/cf/98/c3/cf98c3b94def79439808d0a1a7de0b46.jpg" 
          alt="Slide 3"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide className="h-full flex items-center justify-center">
        <img 
          src="https://www.creativehatti.com/wp-content/uploads/edd/2022/06/Banner-template-of-fresh-fruits-and-vegetables-16-large.jpg"
          alt="Slide 3"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide className="h-full flex items-center justify-center">
        <img 
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fruits-%26-vegetables-shop-ad-design-template-a3151298c6e271a0ec9139d0eb2017fe_screen.jpg?ts=1613202719"
          alt="Slide 3"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</main>
        <div className="w-full pb-1 lg:pb-1 hidden">
        <div className="-ml-4 -mr-4 h-[230px] bg-cover bg-center bg-no-repeat py-4 pl-4 bg-[url(https://t3.ftcdn.net/jpg/01/45/59/12/240_F_145591293_3fUNngBm3W7XGHaZJUW28wcI3JEapLfi.jpg)]">
        <div className='text-center' ><span className='text-3xl'>𝐹𝓇𝑒𝓈𝒽 𝐹𝒾𝓃𝒹𝓈, 𝐸𝓋𝑒𝓇𝓎 𝒯𝒾𝓂𝑒</span></div>
        <div className="flex flex-col justify-end">
        <div className="pb-2">
        <div className="w-full overflow-x-auto hidden">
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
{/* swipper */}

        </div>
        </div>
        </div>
        </div>
         </MdCategoryScrollerWrapper>
        );
}

export default MdCategoryScroller;
