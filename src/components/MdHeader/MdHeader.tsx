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
              <div className="flex items-center text-gray-600">
                <AccountCircleOutlinedIcon fontSize="large" />
              </div>
            </Link>
          </div>
          <div className="bg-white lg:relative flex items-center w-full lg:w-[350px] text-black border border-gray-200 rounded-lg">
            <FontAwesomeIcon
              icon={['fas', 'magnifying-glass']}
              width="22"
              height="22"
              className="w-5 h-5 m-3"
            />
            <a
              style={{ textDecoration: "none" }}
              className="w-full"
              href="/search"
            >
              <button className="w-full focus:outline-none text-left text-sm border-transparent pw-0 placeholder:text-sm placeholder:text-[#ACACAC]">
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
