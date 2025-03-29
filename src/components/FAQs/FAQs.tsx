import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FAQsWrapper } from './FAQs.styled';

interface FAQsProps {}

const FAQs: FC<FAQsProps> = () => {
  return (
    <FAQsWrapper data-testid="FAQs">
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
              <h5>FAQ's</h5>
            </div>
            <SearchIcon />
          </div>
        </div>
        <div className="p-3">
          <p className="font-semibold text-xl">Account Management</p>
          <p className="font-bold text-lg">
            Q. What is the ClubNCart Customer Care Number and Customer Support
            Email address?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              You can reach us at 1800-571-4777 and support@clubncart.com,
              our team will be right there to assist you.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. Where can I change my phone number?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              You can't change the phone number once you have registered in the
              ClubNCart app. You can go into the "My Account" section of the app and
              click on the edit button in the top left-hand corner. This will
              lead to "Profile Details" and you will see an option to edit your
              details.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. Can I unsubscribe from promotional links and newsletters?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Yes, you can easily unsubscribe from promotional links and
              newsletters. There should be an "unsubscribe" option at the bottom
              of the emails you receive.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. How can I log out of my account?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              You can log out from the app by navigating to "My Account" and
              scrolling down to the Logout option.
            </span>
          </p>
          <p className="font-bold text-lg">Q. I'm not receiving OTP.</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Please check if your app is due for an update. If not, please
              share the details via support@clubncart.com.
            </span>
          </p>
          <p className="font-semibold text-xl">Orders & Delivery</p>
          <p className="font-bold text-lg">
            Q. Is there a minimum order value?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              No, there is no minimum order value. You're free to order as
              little or as much as you want, and we'll do our best to deliver it
              to you promptly.
            </span>
          </p>
          <p className="font-bold text-lg">Q. Do you charge for delivery?</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Delivery charges can vary depending on the city and the total
              value of your order. You can check for the details in the cart
              page.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. How long will it take for my order to be delivered?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Delivery time can vary depending on your location, traffic,
              weather, and the current delivery load. Once you input your
              delivery address at checkout, we will provide an estimated
              delivery timeframe.
            </span>
          </p>
          <p className="font-bold text-lg">Q. What are your delivery hours?</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              We are operational between 7 AM to 10 PM on the app and our
              offline stores.
            </span>
          </p>
          <p className="font-bold text-lg">Q. Do you support bulk orders?</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              While we strive to cater to bulk orders, we must also ensure all
              customers have access to our products and services. Therefore,
              depending on stock availability, there may be some limitations on
              the quantity of certain items.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. What should I do if I receive a damaged or defective item?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Although we aim to offer the best products, if you receive a
              damaged, defective, or incorrect item, please contact our customer
              support team immediately at 1800-571-4777.
            </span>
          </p>
          <p className="font-semibold text-xl">
            Order Modifications & Cancellations
          </p>
          <p className="font-bold text-lg">Q. Can I cancel my order?</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Please be advised that orders can only be canceled before they are
              sent your way to prevent any inconvenience. Once the order is on
              the way, it will not be possible to cancel it.
            </span>
          </p>
          <p className="font-bold text-lg">Q. Can I edit my order?</p>
          <p>
            <span className="font-bold">A.</span>
            <span> After placing the order, no changes can be made.</span>
          </p>
          <p className="font-bold text-lg">
            Q. Are there any conditions for order cancellation?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Orders can be canceled anytime, except once they're out for
              delivery. However, please note that we reserve the right to cancel
              orders if we suspect fraud or a violation of our terms of service.
            </span>
          </p>
          <p className="font-semibold text-xl">Refunds</p>
          <p className="font-bold text-lg">Q. What is the refund policy?</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              We aim to ensure complete customer satisfaction. If you are
              unsatisfied with the quality or freshness of any product upon
              delivery, we will look into the issue and offer a suitable
              resolution.
            </span>
          </p>
          <p className="font-bold text-lg">Q. How will I receive my refund?</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Refunds can be instantly added to your wallet and used for future
              orders or refunded to the source account.
            </span>
          </p>
          <p className="font-bold text-lg">Q. When will I get my refund?</p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Once the refund process has been initiated, the amount will be
              returned to your bank account/wallet within 7 business days. If
              you haven't received your refund within 7 business days, please
              write us at support@clubncart.com or call 1800-571-4777.
            </span>
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Refunds to your wallet will be processed within 48 hours, and
              funds should arrive in your bank account within five to seven
              business days.
            </span>
          </p>
          <p className="font-semibold text-xl">Services</p>
          <p className="font-bold text-lg">
            Q. Where does ClubNCart Fresh source its products?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              We source our fresh produce directly from farms, ensuring high
              quality and freshness. Other products are sourced from authorized
              distributors or directly from manufacturers.
            </span>
          </p>
          <p className="font-semibold text-xl">Payment</p>
          <p className="font-bold text-lg">
            Q. What if I made a double payment?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              If you've accidentally made a double payment, contact our customer
              support team immediately, and they will provide you with the
              details of the transaction and your order number. We will
              investigate and initiate a refund for the excess additional
              payment as soon as possible if applicable.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. Can I use multiple payment methods for a single order?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Yes, you can. If you have cash in your ClubNCart Fresh wallet or Loyalty
              Points, you can use them during checkout along with various
              payment methods such as credit/debit cards, net banking, and
              digital wallets to make your payment.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. What is the expiry date of the amount in my wallet?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              The expiry date for each wallet credit transaction is mentioned in
              the app under the wallet transaction.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. What are the payment methods that you accept?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              We accept payments via UPI, NetBanking, Wallets, Debit and Credit
              cards, as well as cash.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. What should I do if money is deducted from my account but I do
            not receive an order confirmation?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              In such a case, the amount will be automatically refunded within 5
              to 7 business days. If you experience a delay, please write us at
              support@clubncart.com or call 1800-571-4777 for assistance.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. If I have any questions about my order or payment, where can I
            reach you?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              For any concerns or queries related to your orders or payments,
              please get in touch with us via support@clubncart.com or call
              1800-571-4777 for assistance.
            </span>
          </p>
          <p className="font-semibold text-xl">Order Tracking</p>
          <p className="font-bold text-lg">
            Q. Why can't I track my order online?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              If you're unable to track your order online, it might be due to a
              delay in updating the tracking information after the order has
              been dispatched. Please try restarting the app and, if the issue
              persists contact our customer support team at 1800-571-4777 for
              help.
            </span>
          </p>
          <p className="font-semibold text-xl">Membership</p>
          <p className="font-bold text-lg">
            Q. Can I update my account information?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Yes, you can update your account information anytime by visiting
              'My Account' and selecting 'Edit Profile'.
            </span>
          </p>
          <p className="font-semibold text-xl">Product Information</p>
          <p className="font-bold text-lg">
            Q. Can I request a product that's not listed on the App/website?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              If you're unable to find a product on our website, you're welcome
              to contact our customer service. We strive to fulfill all customer
              requests and will make every effort to stock the product you're
              looking for.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. Do you sell internationally sourced products?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Yes, we sell a variety of products sourced from different
              countries. The product descriptions on our website usually include
              information about the product's origin.
            </span>
          </p>
          <p className="font-semibold text-xl">Contact Us</p>
          <p className="font-bold text-lg">
            Q. Can I email my queries instead of calling customer service?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Absolutely! We welcome all types of queries. You can email us at
              support@clubncart.com, and our customer service team will
              respond as soon as possible.
            </span>
          </p>
          <p className="font-bold text-lg">
            Q. Do you have multilingual customer support?
          </p>
          <p>
            <span className="font-bold">A.</span>
            <span>
              {' '}
              Yes, our customer support team includes multilingual members to
              cater to a diverse range of customers. Please let us know your
              preferred language when you reach out to us.
            </span>
          </p>

        </div>
      </div>
    </FAQsWrapper>
  );
};
export default FAQs;
