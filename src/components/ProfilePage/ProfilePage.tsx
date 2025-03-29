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
    {/* Header Section */}
    <div className="bg-gradient-to-r from-green-300 via-white to-green-200 p-3 shadow-xl rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            className="text-gray-700 flex items-center hover:text-green-600 transition-colors duration-300"
            style={{ textDecoration: 'none' }}
            to={`/`}
          >
            <ArrowBackIcon className="transform hover:scale-110 transition-transform duration-300" />
          </Link>
          <h5 className="text-lg font-semibold text-gray-800">Profile</h5>
        </div>
        <SearchIcon className="text-gray-600 hover:text-green-600 transform hover:scale-110 transition-transform duration-300 cursor-pointer" />
      </div>
    </div>

    {/* User Info Card */}
    <div className="bg-gradient-to-r from-green-100 to-green-50 m-4 p-6 rounded-lg shadow-xl">
      <div className="flex flex-col text-sm text-gray-700">
        <span className="text-lg font-semibold text-green-700">Hello</span>
        <span className="text-2xl font-bold text-gray-800">{user?.name || 'N/A'}</span>
        <span className="text-gray-500">{user?.mobile || 'N/A'}</span>
      </div>
      <div className="w-full h-[2px] bg-gradient-to-r from-green-500 to-green-300 my-4"></div>
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm">
          Your total savings from{' '}
          <span className="text-gray-700 font-semibold">{profileCard.orders} orders</span>{' '}
          is
        </span>
        <span className="text-3xl font-bold text-green-700">₹{profileCard.savings}</span>
      </div>
    </div>

    {/* Pages Accordion */}
    <div id="accordion-collapse" className="m-4 space-y-3">
      {PagesAccordionItems.map((item, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-transform duration-300`}
        >
          <button
            className="flex items-center justify-between w-full text-gray-800 px-4 py-3 text-lg hover:text-green-700"
            onClick={() => handleNavigation(item.path)}
          >
            <span>{item.title}</span>
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                d="M1 9l4-4-4-4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>

    {/* Policies Accordion */}
    <div id="accordion-collapse" className="m-4 space-y-3">
      {PoliciesAccordionItems.map((item, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-transform duration-300`}
        >
          <button
            className="flex items-center justify-between w-full text-gray-800 px-4 py-3 text-lg hover:text-green-700"
            onClick={() => handleNavigation(item.path)}
          >
            <span>{item.title}</span>
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                d="M1 9l4-4-4-4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>

    {/* Logout Section */}
    <div className="m-4">
      <button
        className="w-full flex items-center justify-between bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-red-600 transform hover:scale-105 transition-transform duration-300"
        onClick={applogout}
      >
        <span className="text-lg">Logout</span>
        <svg
          className="w-4 h-4"
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
    </div>
  </div>
</ProfilePageWrapper>

  );
};

export default ProfilePage;
