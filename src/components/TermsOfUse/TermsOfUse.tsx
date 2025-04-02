import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TermsOfUseWrapper } from './TermsOfUse.styled';

interface TermsOfUseProps {}

const TermsOfUse: FC<TermsOfUseProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <TermsOfUseWrapper data-testid="TermsOfUse">
      <div className="bg-green-100 text-gray-900 px-2 pb-3 flex justify-center" style={{paddingTop:"50px"}}>
  <div className="mt-6 p-6 bg-white/50 backdrop-blur-lg shadow-xl rounded-2xl text-gray-800 overflow-auto max-h-[85vh] w-full max-w-3xl border border-green-200 custom-scroll">
    
    <h2 className="text-2xl font-extrabold text-green-800 mb-3">Account and Registration Obligations</h2>
    <p className="mb-4">
      All buyers must register and sign in to place orders on the Site. Keep your account details up to date 
      for seamless communication. You may opt out of promotional emails anytime.
    </p>

    <h2 className="text-2xl font-extrabold text-green-800 mb-3">Price</h2>
    <p className="mb-4">
      All products will be sold at MRP unless specified. Prices at the time of order will be final, with 
      no adjustments for price fluctuations at delivery.
    </p>

    <h2 className="text-2xl font-extrabold text-green-800 mb-3">Refund & Returns</h2>
    <p className="mb-4">
      We offer a "No Questions Asked Refund Policy," allowing returns at delivery if you're unsatisfied. 
      A credit note will be issued for returned items.
    </p>

    <h2 className="text-2xl font-extrabold text-green-800 mb-3">Prohibited Uses</h2>
    <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
      <li>Distributing illegal or harmful content.</li>
      <li>Engaging in fraudulent or criminal activities.</li>
      <li>Accessing unauthorized programs or data.</li>
      <li>Disrupting website operations or networks.</li>
      <li>Copying copyright-protected materials without permission.</li>
    </ul>

    <h2 className="text-2xl font-extrabold text-green-800 mb-3">Colors</h2>
    <p className="mb-4">
      We strive to display product colors accurately, but variations may occur based on your screen settings.
    </p>
  </div>
</div>
    </TermsOfUseWrapper>
  );
};

export default TermsOfUse;
