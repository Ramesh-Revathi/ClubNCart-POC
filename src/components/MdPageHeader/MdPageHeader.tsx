import React, { FC, useEffect } from 'react';
import { MdPageHeaderWrapper } from './MdPageHeader.styled';

interface MdPageHeaderProps {
   routeFlag:string;
   selectedCategory:string;
   pageName:string;
}

const MdPageHeader: FC<MdPageHeaderProps> = ({routeFlag,selectedCategory,pageName}) => {
   useEffect(() => {
      console.log("routeFlag in header", routeFlag);  
      console.log("pageName in header", pageName);      
   },[routeFlag,selectedCategory,pageName])
   return (
 <MdPageHeaderWrapper data-testid="MdPageHeader">
   <div>
   {pageName !== '/' ? (
          <header
          className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-500 via-green-400 to-green-300 shadow-lg z-10 backdrop-blur-lg"
          style={{ height: "8%" }} // Reduced height
        >
          <div className="p-2 relative flex items-center justify-between">
            {/* Back Button */}
            <a
              href="/"
              style={{ textDecoration: "none" }}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md transform transition-transform hover:scale-110"
            >
              <img
                src="https://www.kpnfresh.com/_next/static/media/back-button-arrow.8ac29b56.svg"
                alt="Back"
                className="w-4 h-4" // Reduced size
              />
            </a>
        
            {/* Category Title */}
            {pageName.includes("productlist")? (
            <div className="text-sm font-semibold text-white text-center flex-grow">
              {selectedCategory}
            </div>):(
                         <div className="text-sm font-semibold text-white text-center flex-grow">
                         {pageName}
                       </div>
            )}
        
            {/* Search Button */}
            <a
              href="/search"
              style={{ textDecoration: "none" }}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md transform transition-transform hover:scale-110"
            >
              <img
                src="https://www.kpnfresh.com/_next/static/media/search.bc83239a.svg"
                alt="Search"
                className="w-4 h-4" // Reduced size
              />
            </a>
          </div>
        </header>
   ): (
      <div></div>
    )}
   </div>
 </MdPageHeaderWrapper>
)};

export default MdPageHeader;
