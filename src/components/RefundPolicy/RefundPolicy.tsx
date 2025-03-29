import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { RefundPolicyWrapper } from './RefundPolicy.styled';

interface RefundPolicyProps {}

const RefundPolicy: FC<RefundPolicyProps> = () => {
  return (
    <RefundPolicyWrapper data-testid="RefundPolicy">
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
              <h5>Refund Policy</h5>
            </div>
            <SearchIcon />
          </div>
        </div>
        <div className="p-3">
          <p>
            Refunds are processed after careful evaluation of several factors.
            We consider the validity of your claim, which involves a thorough
            review of the details you provide. Additionally, any images/videos
            submitted that support your claim will be examined closely.
          </p>

          <p>
            We also consider your order history to verify previous purchases and
            ensure consistent service. Finally, our internal checks will further
            confirm the legitimacy of the request. This comprehensive process
            allows us to handle refunds fairly and efficiently.
          </p>

          <p>
            If you have further queries, please write to us at
            support@clubncart.com with relevant details, and our team can
            re-validate the issue and get back to you.
          </p>
        </div>
      </div>
    </RefundPolicyWrapper>
  );
};

export default RefundPolicy;
