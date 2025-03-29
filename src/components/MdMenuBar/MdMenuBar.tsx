import React, { FC, useState } from "react";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MdMenuBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-testid="MdMenuBar" className="relative z-50 bg-green-100">
      {/* Hamburger Icon */}
      <button
        className="p-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow-xl focus:outline-none transform transition-transform hover:scale-110 hover:shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Items */}
      <div
        className={`absolute top-12 right-0 w-64 bg-gradient-to-b from-green-700 to-green-500 border border-green-300 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-3 space-y-2">
          {["Home", "About", "Services", "Contact"].map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 px-4 py-3 text-white bg-green-600 rounded-lg shadow-md cursor-pointer transform transition-all hover:bg-green-500 hover:scale-105 hover:shadow-xl"
            >
              <FontAwesomeIcon
                icon={["fas", "house-chimney"]}
                className="text-lg text-green-200"
              />
              <a
                href={`#${item.toLowerCase()}`}
                className="text-lg font-semibold"
                style={{ textDecoration: "none" }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MdMenuBar;
