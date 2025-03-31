import React, { FC } from "react";
import { AppFooterSectionWrapper } from "./AppFooterSection.styled";
import { useLocation } from "react-router-dom";

interface AppFooterSectionProps {
  routeFlag: string;
}

const AppFooterSection: FC<AppFooterSectionProps> = ({ routeFlag }) => {
  const location = useLocation();
  console.log("appfooter", routeFlag);

  return (
    <AppFooterSectionWrapper data-testid="AppFooterSection">
      {routeFlag !== "pay" ? (
        <footer
        className="bg-gradient-to-t from-green-600 via-green-500 to-transparent text-white"
        style={{
          boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.3)", // 3D shadow for footer
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div className="container mx-auto px-6 py-8 relative">
          {/* Overlapping Element for Merge Effect */}
          <div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 w-20 h-20 rounded-full opacity-80 shadow-xl"
            style={{
              filter: "blur(20px)", // Blurred effect for smooth merging
              zIndex: 1,
            }}
          ></div>
      
          {/* Download Banner */}
          <div
            id="getapp"
            className="w-full h-48 bg-cover bg-center flex flex-col justify-center items-center gap-4 rounded-lg mb-6 shadow-lg relative z-10"
            style={{
              backgroundImage:
                'url("https://www.kpnfresh.com/_next/static/media/downloadBanner.a60d7a9c.png")',
              borderRadius: "15px",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0, 0, 0, 0.4)", // Overlay for better visibility
            }}
          >
            <div
              className="text-xl font-bold text-white animate-pulse"
              style={{
                textShadow: "0 2px 6px rgba(0, 0, 0, 0.7)", // Glowing text
              }}
            >
              Browse, Tap &amp; Get Delivered
            </div>
            <div className="text-sm text-center text-gray-200">
              Download ClubNCart Farm Fresh app available on Android &amp; iOS
            </div>
            <div className="flex gap-4">
              <a
                href="https://apps.apple.com/in/app/kpn-farm-fresh/id6467404944"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-28 h-10 object-contain transition-transform transform hover:scale-105"
                  src="https://www.kpnfresh.com/_next/static/media/appstore.2e212b4b.svg"
                  alt="Download iOS App"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.kpn.android"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-28 h-10 object-contain transition-transform transform hover:scale-105"
                  src="https://www.kpnfresh.com/_next/static/media/playstore.e51a351d.svg"
                  alt="Download Android App"
                />
              </a>
            </div>
          </div>
      
          {/* Footer Links */}
          <div className="flex justify-between flex-wrap gap-4 text-center hidden">
            <a
              href="/privacy-policy"
              className="text-white text-sm hover:underline hover:text-green-300 transition-all"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              className="text-white text-sm hover:underline hover:text-green-300 transition-all"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="/about-us"
              className="text-white text-sm hover:underline hover:text-green-300 transition-all"
            >
              About Us
            </a>
            <a
              href="/contact-us"
              className="text-white text-sm hover:underline hover:text-green-300 transition-all"
            >
              Contact Us
            </a>
          </div>
      
          {/* Contact Info */}
          <div className="mt-6 text-center text-xs text-gray-300">
            <p>© 2025 Club N Cart, All Rights Reserved.</p>
            <p>
              <a
                href="mailto:support@clubncart.com"
                className="hover:underline text-green-200"
              >
                support@clubncart.com
              </a>{" "}
              |{" "}
              <a href="tel:18005714777" className="hover:underline text-green-200">
                1800 571 4777
              </a>
            </p>
          </div>
        </div>
      </footer>      
      ) : (
        <div></div>
      )}
    </AppFooterSectionWrapper>
  );
};

export default AppFooterSection;
