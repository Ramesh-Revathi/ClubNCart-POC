import React, { FC } from 'react';
import { LgOfferHeaderWrapper } from './LgOfferHeader.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LgOfferHeaderProps {}

const LgOfferHeader: FC<LgOfferHeaderProps> = () => (
 <LgOfferHeaderWrapper data-testid="LgOfferHeader">
            <nav className="flex h-10 items-center justify-center bg-customYellow px-4 text-sm font-medium text-gray sm:px-6 lg:px-8">
              Get free delivery on orders over $100
              <div className="ml-auto flex items-center">
              <div className="ml-4 flow-root lg:ml-6 hidden lg:block">
                      <a href="#" className="group-m-2 flex items-center p-2">
                      <FontAwesomeIcon icon={['fas', 'gift']} className="text-500 text-white-500 text-1xl" />
                        <span className="ml-2 text-sm font-medium text-white-700 group-hover:text-gray-800">Offer</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                    <div className="ml-4 flow-root lg:ml-6 hidden lg:block">
                      <a href="#" className="group-m-2 flex items-center p-2">
                      <FontAwesomeIcon icon={['fas', 'shop-lock']} className="text-500 text-white-500 text-1xl" />
                        <span className="ml-2 text-sm font-medium text-white-300 group-hover:text-gray-300">Stores</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                    <div className="ml-4 flow-root lg:ml-6 hidden lg:block">
                      <a href="#" className="group-m-2 flex items-center p-2">
                      <FontAwesomeIcon icon={['fas', 'blog']} className="text-500 text-white-500 text-1xl" />
                        <span className="ml-2 text-sm font-medium group-hover:text-gray-300">Blogs</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                    <div className="ml-4 flow-root lg:ml-6 hidden lg:block">
                      <a href="#" className="group-m-2 flex items-center p-2">
                      <FontAwesomeIcon icon={['fas', 'mobile-screen-button']} className="text-500 text-white-500 text-1xl" />
                        <span className="ml-2 text-sm font-medium group-hover:text-gray-300">Get App</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
              </div>
            </nav>
 </LgOfferHeaderWrapper>
);

export default LgOfferHeader;
