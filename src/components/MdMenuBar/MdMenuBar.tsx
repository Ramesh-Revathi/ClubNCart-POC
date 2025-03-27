import React, { FC,useState } from 'react';
import { Menu, X } from "lucide-react";
import { MdMenuBarWrapper } from './MdMenuBar.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MdMenuBarProps {}

const MdMenuBar: FC<MdMenuBarProps> = () => 
   {
      const [isOpen, setIsOpen] = useState(false);
      return(
 <MdMenuBarWrapper data-testid="MdMenuBar">
        <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="text-gray-600 focus:outline-none sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Items */}
      <div
        className={`absolute top-10 right-0 w-40 bg-white border rounded-lg shadow-lg ${
          isOpen ? "block" : "hidden"
        } sm:hidden`}
      >
        <ul className="flex flex-col">
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#home" className='ml-2'>Home</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#about" className='ml-2'>About</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#services" className='ml-2'>Services</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#contact" className='ml-2'>Contact</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#home" className='ml-2'>Home</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#about" className='ml-2'>About</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#services" className='ml-2'>Services</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#contact" className='ml-2'>Contact</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#home" className='ml-2'>Home</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#about" className='ml-2'>About</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} />
            <a style={{ textDecoration: "none" }} href="#services" className='ml-2'>Services</a>
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={['fas','house-chimney']} className='text-1xl' />
            <a style={{ textDecoration: "none" }} href="#contact" className='ml-2'>Contact</a>
          </li>
        </ul>
      </div>
    </div>
 </MdMenuBarWrapper>
)};

export default MdMenuBar;
