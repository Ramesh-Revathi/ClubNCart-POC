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
        className="sticky bg-white p-1 overflow-y-auto"
        style={{ width: "70px", height: "auto", maxHeight: "100%" }} // Adjust height and max-height
      >
        <ul
          className="overflow-y-auto list-none border"
          style={{ width: "70px", paddingLeft: "0", paddingBottom: "0" }} // Inline padding tweaks
        >
          {categories.map((category) => (
            <li
              className="lg:border-b lg:border-solid lg:border-gray-200 last:border-b-0"
              key={category.menu}
              style={{ marginBottom: "0" }} // Ensure no margin at the bottom
            >
              <a
                style={{ textDecoration: "none" }}
                onClick={() => setSelectedCategory(category.menu)}
                className={`cursor-pointer relative px-0.5 lg:px-4 py-1 flex justify-center lg:justify-start ${
                  selectedCategory === category.menu
                    ? "bg-menuHilight text-gray"
                    : "bg-menuHilight-200 text-gray-700 hover:bg-menuHilight-200"
                }`}
              >
                <div className="flex flex-col items-center gap-1 lg:flex-row lg:gap-3">
                  {/* Circular Image Container */}
                  <div
                    className="bg-custom-gradient rounded-full w-14 lg:w-14 h-14 lg:h-14 flex justify-center items-center overflow-hidden bg-white"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={category.image}
                      alt="P_1314"
                    />
                  </div>
                  {/* Category Text */}
                  <div className="text-center lg:text-left text-gray justify-center text-xs break-words flex-1 lg:text-sm font-medium text-black flex items-center">
                    {category.menu}
                  </div>
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
