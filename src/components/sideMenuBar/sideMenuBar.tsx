import React, { FC } from "react";
import { sideMenuBarWrapper } from "./sideMenuBar.styled";

// Define the types for props
interface SideMenuBarProps {
  setShowSidebar: (value: boolean) => void;
  categories: { menu: string; image: string }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showSidebar: boolean;
}

const SideMenuBar: FC<SideMenuBarProps> = ({
  setShowSidebar,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <sideMenuBarWrapper data-testid="sideMenuBar">
      {/* Sidebar */}
      <aside
  className="sticky top-0 bg-gradient-to-b from-green-200 via-white to-green-100 p-2 shadow-lg rounded-lg overflow-y-auto"
  style={{
    width: "80px", // Slightly wider for better visuals
    height: "100vh", // Full viewport height for independent scrolling
    zIndex: 0, // Lowered zIndex to avoid floating on top of other elements
  }}
>
  <ul
    className="overflow-y-auto list-none space-y-3"
    style={{
      padding: "0",
      margin: "0",
    }}
  >
    {categories.map((category) => (
      <li
        key={category.menu}
        className={`relative group rounded-lg p-2 ${
          selectedCategory === category.menu
            ? "bg-green-500 text-white shadow-lg transform scale-105"
            : "bg-green-100 text-gray-700 hover:bg-green-300 hover:shadow-md"
        } transition-all duration-300 ease-in-out`}
        onClick={() => setSelectedCategory(category.menu)}
        style={{
          cursor: "pointer",
        }}
      >
        <a
          className="flex flex-col items-center gap-2"
          style={{
            textDecoration: "none",
          }}
        >
          {/* Circular Image Container */}
          <div
            className={`rounded-full w-12 h-12 flex justify-center items-center overflow-hidden border-2 ${
              selectedCategory === category.menu
                ? "border-white"
                : "border-gray-200 group-hover:border-green-500"
            }`}
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(200, 230, 200, 1))",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle 3D shadow
            }}
          >
            <img
              className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              src={category.image}
              alt={category.menu}
            />
          </div>

          {/* Category Text */}
          <div
            className={`text-center text-xs font-medium ${
              selectedCategory === category.menu
                ? "text-white"
                : "text-gray-800 group-hover:text-green-600"
            } transition-colors duration-300`}
          >
            {category.menu}
          </div>
        </a>
      </li>
    ))}
  </ul>
</aside>

    </sideMenuBarWrapper>
  );
};

export default SideMenuBar;
