import React, { FC } from 'react';
import { FreeDeliveryBannerWrapper } from './FreeDeliveryBanner.styled';

interface FreeDeliveryBannerProps {
   style?: React.CSSProperties;
}

const FreeDeliveryBanner: FC<FreeDeliveryBannerProps> = ({
   style
}) => (
 <FreeDeliveryBannerWrapper data-testid="FreeDeliveryBanner">
    <div className="flex flex-col px-2.5 py-2 gap-1 w-full text-xs text-white justify-center items-center bg-green" style={{...style, backgroundColor:"#04d476", borderRadius:"10px"}}>
      <div className="flex items-center justify-center">
        <img
          className="w-4 h-4 mr-1 cursor-pointer"
          src="https://services.kpnfresh.com/media/v1/static/images/free-delivery-icon.png"
          alt="Free delivery icon"
        />
        <div>
          <span className="font-medium text-white-700">
            Shop for <span className="ruppee-symbol-font">₹</span>173 more to get a FREE DELIVERY.
          </span>
        </div>
      </div>
      <div className="h-1 bg-gray-400 rounded-lg w-full">
        <div className="h-full bg-white rounded-lg" style={{ width: "14%" }}></div>
      </div>
    </div>
 </FreeDeliveryBannerWrapper>
);

export default FreeDeliveryBanner;
