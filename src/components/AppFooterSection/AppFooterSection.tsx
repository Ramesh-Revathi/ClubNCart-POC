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
        <footer className="bg-white">
          <div className="container px-4 py-6">
            {/* Download Banner */}
            <div
              id="getapp"
              className="w-full h-40 bg-cover bg-center flex flex-col justify-center items-center gap-4 rounded-lg mb-6"
              style={{
                backgroundImage:
                  'url("/_next/static/media/downloadBanner.a60d7a9c.png")',
              }}
            >
              <div className="text-black text-lg font-semibold text-center">
                Browse, Tap &amp; Get Delivered
              </div>
              <div className="text-sm text-center text-gray-700">
                Download ClubNCart Farm Fresh app available on Android &amp; iOS
              </div>
              <div className="flex gap-3">
                <a
                  href="https://apps.apple.com/in/app/kpn-farm-fresh/id6467404944"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-28 h-10 object-contain"
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
                    className="w-28 h-10 object-contain"
                    src="https://www.kpnfresh.com/_next/static/media/playstore.e51a351d.svg"
                    alt="Download Android App"
                  />
                </a>
              </div>
            </div>

            {/* Footer Content */}
            <div className="w-full flex flex-col gap-6">
              {/* Logo and Download Section */}
              <div className="hidden flex flex-col items-center">
                <a
                  href="/"
                  style={{ textDecoration: "none" }}
                  className="mb-4"
                >
                  {/* <img
                    className="w-24 h-24 object-contain"
                    src="https://static.wixstatic.com/media/7ad321_5f416196fa50429cae9af01c927513fe~mv2.png/v1/fill/w_84,h_87,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png"
                    alt="KPN Fresh Logo"
                  /> */
                  }
                  CLUB N CART
                </a>
                <div className="text-xs text-gray-500 text-center">
                  Download The ClubNCart Farm Fresh App
                </div>
              </div>

              {/* Footer Links */}
              <div className="hidden flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="/terms-and-conditions" className="hover:underline">
                  Terms &amp; Conditions
                </a>
                <a href="/about-us" className="hover:underline">
                  About Us
                </a>
                <a href="/contact-us" className="hover:underline">
                  Contact Us
                </a>
              </div>

              {/* Contact Info */}
              <div className="text-center text-xs text-gray-500">
                <p>© 2025 Club N Cart, All Rights Reserved.</p>
                <p>
                  <a
                    href="mailto:support@kpnfarmfresh.com"
                    className="hover:underline"
                  >
                    support@clubncart.com
                  </a>{" "}
                  |{" "}
                  <a href="tel:18005714777" className="hover:underline">
                    1800 571 4777
                  </a>
                </p>
              </div>
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
