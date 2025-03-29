import React, { FC } from "react";
import { MdNavBarWrapper } from "./MdNavBar.styled";

const MdNavBar: FC = () => (
  <MdNavBarWrapper data-testid="MdNavBar">
    <div className="fixed left-0 bottom-0 w-full z-50">
      {/* Navbar Container */}
      <div className="lg:hidden h-[72px] px-2 w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-lg border-t border-green-400">
        <ul className="flex h-full w-full justify-between items-center pl-0">
          {/* Navigation Items */}
          {[
            { title: "Home", href: "#", icon: "https://www.kpnfresh.com/_next/static/media/footer-home.200a9263.svg" },
            { title: "Fresh", href: "#", icon: "https://www.kpnfresh.com/_next/static/media/footer-fresh.23353bed.svg" },
            { title: "Hot Deals", href: "/hot-deals/c/P_HOT_DEALS", icon: "https://services.kpnfresh.com/media/v1/categories/images/1c48c9d2-9f45-45fd-824b-f80d3e34da1b/hot-detals.webp?c_type=C1" },
            { title: "Groceries", href: "/categories/groceries", icon: "https://www.kpnfresh.com/_next/static/media/footer-groceries.cba21b1e.svg" },
            { title: "Reorder", href: "/reorder", icon: "https://www.kpnfresh.com/_next/static/media/footer-reorder.ee95dbea.svg" },
          ].map((item, index) => (
            <li key={index} className="h-full">
              <a
                href={item.href}
                className="flex flex-col justify-center items-center h-full text-green-100 hover:text-white transform transition-transform hover:scale-110"
                style={{ textDecoration: "none" }}
              >
                <div className="bg-gradient-to-b from-green-100 to-green-400 rounded-2xl w-14 flex justify-center items-center py-2 min-h-[40px] shadow-md hover:shadow-2xl transition-shadow">
                  <img src={item.icon} alt={item.title} title={item.title} className="h-[28px]" />
                </div>
                <span className="text-xs font-semibold mt-1">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Decorative Background */}
    <div
      className="max-h-screen w-full bg-cover bg-center shadow-inner"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/background-gradient-lights_23-2149304986.jpg?t=st=1740901027~exp=1740904627~hmac=325358306980938f6562dc89114ae87d4fa058e962ced31bd8b6e7314d55991d&w=1800')",
      }}
    />
  </MdNavBarWrapper>
);

export default MdNavBar;
