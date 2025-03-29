import React, { FC, useState } from 'react';
import { Menu, ShoppingBagIcon, X } from "lucide-react";
import { MdHeaderWrapper } from './MdHeader.styled';
import MdMenuBar from '../MdMenuBar/MdMenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

interface MdHeaderProps {}

const MdHeader: FC<MdHeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MdHeaderWrapper data-testid="MdHeader">
      <div className="p-4 w-auto bg-[url('https://png.pngtree.com/background/20210711/original/pngtree-fresh-fruit-and-vegetable-poster-picture-image_1123378.jpg')] bg-cover bg-center">
        <div className="flex w-full flex-col">
          <div className="flex justify-between mb-3">
            <div className="cursor-pointer flex-1">
              <div className="font-medium text-xl bg-gray">Delivery in 20 mins</div>
              <div className="text-sm text-gray-subtext truncate w-[250px] bg-gray">Mylapore, Chennai</div>
            </div>
            <Link to="/profile">
  <div
    className="flex items-center justify-center w-14 h-14 bg-gradient-to-b from-white/40 to-white/20 
               text-gray-600 rounded-full shadow-[inset_5px_5px_15px_rgba(255,255,255,0.3),_5px_5px_15px_rgba(0,0,0,0.2)] 
               backdrop-blur-lg border border-white/40 
               transition-all duration-300 hover:shadow-[inset_8px_8px_20px_rgba(255,255,255,0.4),_8px_8px_20px_rgba(0,0,0,0.3)] 
               hover:scale-105 cursor-pointer"
  >
    <AccountCircleOutlinedIcon fontSize="large" className="text-gray-700" />
  </div>
</Link>

          </div>
          <div className="relative flex items-center w-full lg:w-[350px] bg-white text-black 
                border border-gray-200 rounded-lg shadow-[5px_5px_10px_rgba(0,0,0,0.15),_-5px_-5px_10px_rgba(255,255,255,0.8)] 
                p-3 transition-all duration-300 hover:shadow-[8px_8px_15px_rgba(0,0,0,0.2),_-8px_-8px_15px_rgba(255,255,255,0.9)]">
  
  {/* Search Icon with 3D effect */}
  <FontAwesomeIcon
    icon={['fas', 'magnifying-glass']}
    width="22"
    height="22"
    className="w-5 h-5 mx-3 text-gray-600"
  />

  {/* Search Input Button with Smooth UI */}
  <a href="/search" className="w-full">
    <button className="w-full focus:outline-none text-left text-sm text-green-500 
                       bg-transparent placeholder-gray-400">
      Search for goodness...
    </button>
  </a>
</div>

        </div>
      </div>
    </MdHeaderWrapper>
  );
};

export default MdHeader;
