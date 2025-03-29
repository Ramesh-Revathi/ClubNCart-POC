import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TermsOfUseWrapper } from './TermsOfUse.styled';

interface TermsOfUseProps {}

const TermsOfUse: FC<TermsOfUseProps> = () => {
  return (
    <TermsOfUseWrapper data-testid="TermsOfUse">
      <div>
        <div className="bg-white p-3 shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Link
                className="text-gray-700"
                style={{ textDecoration: 'none' }}
                to={`/`}
              >
                <ArrowBackIcon />
              </Link>
              <h5>Terms of Use</h5>
            </div>
            <SearchIcon />
          </div>
        </div>
        <div className="p-3">
          <p className="font-bold text-lg">
            Account and registration obligations
          </p>
          <p>
            All buyers must register and sign in to place orders on the Site.
            You must keep your account and registration details up to date and
            correct for communications related to your purchase on the site. In
            accordance with the terms and conditions, the consumer agrees to
            receive promotional links and newsletters when registered. The
            customer can withdraw by unsubscribing from "My Account" or by
            contacting customer service.
          </p>
          <p className="font-bold text-lg">Price</p>
          <p>
            All products listed on the Site will be sold on MRP unless otherwise
            specified. Prices specified at the time of order will be the prices
            charged on the day of delivery. Although the prices of most products
            do not change every day but some of the goods and prices of fresh
            food change every day. In the event that prices are high or low on
            the date of delivery no additional costs will be collected or
            refunded as the situation may be at the time of delivery.
          </p>
          <p className="font-bold text-lg">Site / Customer Cancellation</p>
          <p className="font-bold text-lg"> Refund & Refunds </p>
          <p>
            "We do not have any questions about the refund policy" which allows
            all our members to return the product at the time of delivery if for
            some reason they are not satisfied with the quality or youth of the
            product. We will return the returned product with us and issue a
            credit note on the number of return products that will be added to
            your account on the Site. This can be used to pay off your next
            purchase bills.
          </p>
          <p className='font-bold text-lg' >You must not use the Site for any of the following purposes:</p>
          
         <ul className='list-decimal list-outside'>
            <li>Distribute any illegal, abusive, obscene, insulting, threatening,
            harmful, obscene, obscene, or otherwise objectionable material.</li>
<li>Transfer of property that promotes criminal conduct or that leads to
          public liability or that violates any applicable laws, regulations or
          operating code.</li>
          <li> Obtaining unauthorized access to other computer
          programs. </li>
          <li>Interrupting any other person to use or enjoy the Site.</li>
          <li>Violation of any applicable laws;</li>
          <li>Disrupting or disrupting networks or websites linked to the Site.</li>
          <li>To make, transfer or retain electronic copies of copyright-protected material without the owner's permission.</li>
         </ul>
          
          <p className='font-bold text-lg'>Colors</p>
          <p> We have made every effort to display the colors of our products
          from the Website as accurately as possible. However, since the actual
          colors you see will depend on your monitor, we cannot guarantee that
          your monitor of any color will be accurate.</p>
        </div>
      </div>
    </TermsOfUseWrapper>
  );
};

export default TermsOfUse;
