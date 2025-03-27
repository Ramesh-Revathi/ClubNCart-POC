import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { ProfilePageWrapper } from './ProfilePage.styled';
import { logoutUser } from '../../services/auth-handler.service';
import { useAuth } from '../../hooks/AuthContext';

interface ProfilePageProps {}
interface User {
  id: number;
  name: string;
  mailid: string;
  mobile: string;
  address?: { id: number; address: { street: string; area: string; addressType: string } }[];
}
const ProfilePage: FC<ProfilePageProps> = () => {
  const { logout } = useAuth();
  const profileCard = {
    name: 'John Doe',
    phone: '1234567890',
    orders: '2',
    savings: '10',
  };

  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    console.log(storedUser,"jhxgfxf");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      console.log(parsedUser);
      setUser(parsedUser);
    }
  }, []);
  interface AccordionItem {
    title: string;
    content: JSX.Element;
    path: string; // Add a path for navigation
  }

  interface PoliciesAccordionItem {
    title: string;
    content: JSX.Element;
    path: string; 
  }

  const PoliciesAccordionItems: AccordionItem[] = [
    {
      title: 'Terms Of use',
      content: <p>Terms Of use</p>,
      path: '/trems-of-use', // Path to redirect to
    },
    {
      title: 'Privacy Policy',
      content: <p>Privacy Policy</p>,
      path: '/privacy-policy',
    },
    {
      title: 'Refund Policy',
      content: <p>Refund Policy</p>,
      path: '/refund-policy',
    },
    {
      title: 'FAQ\'s',
      content: <p>FAQ'S</p>,
      path: '/faq',
    },
  ];
  const PagesAccordionItems: AccordionItem[] = [
    {
      title: 'My Orders',
      content: <p>My Orders</p>,
      path: '/order', // Path to redirect to
    },
    {
      title: 'Refunds',
      content: <p>Refunds</p>,
      path: '/refunds',
    },
    {
      title: 'Wallet',
      content: (
        <>
          <p>Wallet</p>
          <p>Available Balance: ₹0</p>
        </>
      ),
      path: '/wallet',
    },
    {
      title: 'Loyalty Points',
      content: <p>Loyalty Points</p>,
      path: '/loyalty-points',
    },
    {
      title: 'Address Book',
      content: <p>Address Book</p>,
      path: '/address',
    },
    {
      title: 'Re-order',
      content: <p>Re-order</p>,
      path: '/reorder',
    },
    {
      title: 'Refer & Earn',
      content: <p>Refer & Earn</p>,
      path: '/refer-earn',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the specified path
  };
  const applogout = () => {
    logoutUser()
      .then(() => {
        // Clear local and session storage
        localStorage.clear();
        sessionStorage.clear();
  
        // Update app state (optional if you're using context or Redux)
        logout(); // Call your logout function to clear auth state
  
        // Navigate to login page immediately
        navigate("/", { replace: true });
  
        // Force a reload to reinitialize the app state (if needed)
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };
  
  return (
    <ProfilePageWrapper data-testid="ProfilePage">
      <div>
        <div className="bg-white p-3 shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-3">
            <Link className='text-gray-700' style={{ textDecoration: 'none' }} to={`/`}>
              <ArrowBackIcon />
              </Link>
              <h5>Profile</h5>
            </div>
            <SearchIcon />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-100 to-yellow-50 m-4 p-3 rounded">
          <div className="flex flex-col text-sm">
            <span>Hello</span> <span className="text-md">{user?.name || 'N/A'}</span>
            <span className="text-gray-500">{user?.mobile || 'N/A'}</span>
          </div>
          <div className="w-3/4 h-[2px] bg-gradient-to-r from-yellow-500 my-2 to-yellow-100"></div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">
              Your total savings from{' '}
              <span className="text-gray-600">{profileCard.orders} orders</span>{' '}
              is
            </span>
            <span>₹{profileCard.savings}</span>
          </div>
        </div>

        {/* Pages Accordion */}
        <div id="accordion-collapse" data-accordion="collapse" className="m-4">
          {PagesAccordionItems.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-200 hover:bg-yellow-100 ${
                index === PagesAccordionItems.length - 1 ? 'rounded-b-xl' : ''
              } ${index === 0 ? 'rounded-t-xl' : ''}`}
            >
              <h2 id={`accordion-collapse-heading-${index}`}>
                <button
                  type="button"
                  className={`flex items-center justify-between w-full font-normal p-3 ${
                    index === 0 ? 'rounded-t-xl' : ''
                  } gap-3`}
                  onClick={() => handleNavigation(item.path)} // Navigate on click
                  aria-expanded={false}
                  aria-controls={`accordion-collapse-body-${index}`}
                >
                  <span className="text-sm">{item.title}</span>
                  <svg
                    className="w-3 h-3 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.5"
                      d="M1 9l4-4-4-4"
                    />
                  </svg>
                </button>
              </h2>
            </div>
          ))}
        </div>

        {/* Policies Accordion */}
        <div id="accordion-collapse" data-accordion="collapse" className="m-4">
          {PoliciesAccordionItems.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-200 hover:bg-yellow-100 ${
                index === PoliciesAccordionItems.length - 1 ? 'rounded-b-xl' : ''
              } ${index === 0 ? 'rounded-t-xl' : ''}`}
            >
              <h2 id={`accordion-collapse-heading-${index}`}>
                <button
                  type="button"
                  className={`flex items-center justify-between w-full font-normal p-3 ${
                    index === 0 ? 'rounded-t-xl' : ''
                  } gap-3`}
                  onClick={() => handleNavigation(item.path)} // Navigate on click
                  aria-expanded={false}
                  aria-controls={`accordion-collapse-body-${index}`}
                >
                  <span className="text-sm">{item.title}</span>
                  <svg
                    className="w-3 h-3 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.5"
                      d="M1 9l4-4-4-4"
                    />
                  </svg>
                </button>
              </h2>
            </div>
          ))}
        </div>
        <div data-accordion="collapse" className="m-4">
          <div className="border border-gray-200 hover:bg-yellow-100 rounded-b-xl">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full font-normal p-3 gap-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={applogout} // Replace with actual logout functionality
                aria-expanded={false}
              >
                <span className="text-sm">Logout</span>
                <svg
                  className="w-3 h-3 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                  />
                </svg>
              </button>
            </h2>
          </div>
        </div>
      </div>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
