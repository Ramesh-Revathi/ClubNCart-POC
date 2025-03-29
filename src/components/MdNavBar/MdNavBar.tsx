import React, { FC } from 'react';
import { MdNavBarWrapper } from './MdNavBar.styled';
import LgOfferHeader from '../LgOfferHeader/LgOfferHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface MdNavBarProps {}

const MdNavBar: FC<MdNavBarProps> = () => (
 <MdNavBarWrapper data-testid="MdNavBar">
  <div className="fixed left-0 bottom-0 w-full z-zIndexMobileFooterBar" style={{zIndex: 1000}}>
    <div className="lg:hidden h-[72px] px-2 w-full bg-white z-zIndexMobileFooterBar shadow-custom border-t border-gray-200">
      <ul className="flex h-full w-full justify-between items-center pl-[0px]">
        <li className="h-full">
          <a style={{ textDecoration: "none" }} className="flex flex-col justify-center items-center h-full" href="#">
          <div className="hover:bg-orange-300 bg-white-300 rounded-2xl w-12 flex justify-center items-center py-1.5 min-h-[38px]">
            <img src="https://www.kpnfresh.com/_next/static/media/footer-home.200a9263.svg" alt="Home" title="Home" className="h-[24px]" />
            </div>
            <span className="text-gray text-sm leading-none pt-1">Home</span>
            </a>
            </li>
            <li className="h-full">
              <a style={{ textDecoration: "none" }} className="flex flex-col justify-center items-center h-full" href="#">
              <div className="hover:bg-orange-300 bg-white rounded-2xl w-12 flex justify-center items-center py-1.5 min-h-[38px]">
                <img src="https://www.kpnfresh.com/_next/static/media/footer-fresh.23353bed.svg" alt="Fresh" title="Fresh" className="h-[24px]" />
                </div>
                <span className="text-gray text-sm leading-none pt-1">Fresh</span>
                </a>
                </li>
                <li className="h-full"><a style={{ textDecoration: "none" }} className="flex flex-col justify-center items-center h-full" href="/hot-detals/c/P_HOT_DEALS">
                <div className="hover:bg-primary-300 bg-white rounded-2xl w-12 flex justify-center items-center py-1.5 min-h-[38px]">
                  <img src="https://services.kpnfresh.com/media/v1/categories/images/1c48c9d2-9f45-45fd-824b-f80d3e34da1b/hot-detals.webp?c_type=C1" alt="Hot Deals" title="Hot Deals" className="h-[24px]" />
                  </div><span className="text-gray text-sm leading-none pt-1">Hot Deals</span>
                  </a></li>
                  <li className="h-full"><a style={{ textDecoration: "none" }} className="flex flex-col justify-center items-center h-full" href="/categories/groceries">
                  <div className="hover:bg-primary-300 bg-white rounded-2xl w-12 flex justify-center items-center py-1.5 min-h-[38px]">
                    <img src="https://www.kpnfresh.com/_next/static/media/footer-groceries.cba21b1e.svg" alt="Groceries" title="Groceries" className="h-[24px]" />
                    </div><span className="text-gray text-sm leading-none pt-1">Groceries</span></a></li>
                    <li className="h-full"><a style={{ textDecoration: "none" }} className="flex flex-col justify-center items-center h-full" href="/reorder">
                    <div className="hover:bg-primary-300 bg-white rounded-2xl w-12 flex justify-center items-center py-1.5 min-h-[38px]">
                      <img src="https://www.kpnfresh.com/_next/static/media/footer-reorder.ee95dbea.svg" alt="Reorder" title="Reorder" className="h-[24px]" />
                      </div><span className="text-gray text-sm leading-none pt-1">Reorder</span>
                      </a></li>
                      </ul></div>
                      </div>

    <div className="max-h-screen w-full bg-[url('https://img.freepik.com/free-photo/background-gradient-lights_23-2149304986.jpg?t=st=1740901027~exp=1740904627~hmac=325358306980938f6562dc89114ae87d4fa058e962ced31bd8b6e7314d55991d&w=1800')] bg-cover bg-center shadow-md">
    </div>
 </MdNavBarWrapper>
);

export default MdNavBar;
