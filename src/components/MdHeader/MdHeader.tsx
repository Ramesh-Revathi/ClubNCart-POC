import React, { FC, useState } from 'react';
import { Menu, ShoppingBagIcon, X } from "lucide-react";
import { MdHeaderWrapper } from './MdHeader.styled';
import MdMenuBar from '../MdMenuBar/MdMenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

interface MdHeaderProps { }

const MdHeader: FC<MdHeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MdHeaderWrapper data-testid="MdHeader">
      <div className="p-4 w-auto bg-[url('https://png.pngtree.com/background/20210711/original/pngtree-fresh-fruit-and-vegetable-poster-picture-image_1123378.jpg')] bg-cover bg-center">
        <div className="flex w-full flex-col">
          <div className="flex justify-between mb-3">
            <div className="cursor-pointer flex-1">
              <div className="text-xl bg-gray text-green-900 font-bold">Delivery in 20 mins</div>
              <div className="text-sm text-gray-subtext truncate w-[250px] bg-gray text-green-700 font-bold">Mylapore, Chennai</div>
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
            <a href="/search" className="w-full" style={{ textDecoration: "none" }}>
  <button
    className="relative w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-lime-400 to-lime-300 
               text-orange-500 text-sm font-medium rounded-full shadow-lg hover:shadow-2xl focus:outline-none transition-transform duration-500"
    style={{
      perspective: "1200px",
      transform: "translateZ(0)",
    }}
  >
    {/* Animated 3D Bulge Effect */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(144, 238, 144, 0.3) 80%)",
        transform: "scale(1.1)",
        mixBlendMode: "screen",
        animation: "bulge-effect 3s infinite ease-in-out",
      }}
      aria-hidden="true"
    ></div>

    {/* Glowing Edges Effect */}
    <div
      className="absolute inset-0 rounded-full border-2 border-lime-300"
      style={{
        filter: "blur(8px)",
        opacity: "0.6",
      }}
      aria-hidden="true"
    ></div>

    {/* Background Animation */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(173, 255, 47, 0.2), transparent)",
        animation: "background-move 6s infinite linear",
      }}
      aria-hidden="true"
    ></div>

    {/* Text Content */}
    <span
      className="relative z-10"
      style={{
        color: "rgb(255, 165, 0)", // Bright orange color
        textShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)", // Enhances visibility
        fontWeight: "bold",
        letterSpacing: "0.5px",
      }}
    >
      Search for goodness...
    </span>
  </button>

  {/* Keyframes for 3D and background animations */}
  <style>
    {`
      @keyframes bulge-effect {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }

      @keyframes background-move {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 100% 50%;
        }
      }
    `}
  </style>
</a>

          </div>

        </div>
      </div>
    </MdHeaderWrapper>
  );
};

export default MdHeader;
