import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useEffect, useState } from 'react';
import MdAddressDetailsPopup from '../MdAddressDetailsPopup/MdAddressDetailsPopup';
import { AddressBookWrapper } from './AddressBook.styled';
import { Link } from 'react-router-dom';
import AddressMapComponentStories from '../addressMapComponent/addressMapComponent.stories';
import AddressMapComponent from '../addressMapComponent/addressMapComponent';

interface AddressBookProps {}

const AddressBook: FC<AddressBookProps> = () => {
  const [selectedAdress, setSelectedAdress] = useState(0);

  interface Address {
    fullName: string;
    addressType: string;
    street: string;
    area: string;
  }


  interface Person {
    name: string;
    addresses: Address[];
  }

  const [selectedAddress, setSelectedAddress] = useState(0);

  const handleAddressSelection = (index: number, address : any) => {
    setSelectedAddress(index);
  
    // Retrieve the existing session data
    const userData = sessionStorage.getItem("userData");
    
    if (userData) {
      let parsedData = JSON.parse(userData);
  
      // Update the selected address in session storage
      parsedData.address = address;  // Updating the address field
  
      sessionStorage.setItem("userData", JSON.stringify(parsedData));
    }
  };


  const [addressList, setAddressList] = useState<Person[]>([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userData');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const mobile = parsedUser.mobile;

      fetch(
        `http://localhost:5000/getAddress?mobile=${encodeURIComponent(mobile)}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log('Fetched Data:', data); // Debugging

          if (data.addresses) {
            // Fix: Ensure correct key from API response
            const formattedAddresses = data.addresses.map((addr: any) => ({
              fullName: addr.address.name, 
              addressType: addr.address.addressType,
              street: addr.address.street,
              area: addr.address.area,
            }));

            setAddressList([
              { name: data.name, addresses: formattedAddresses },
            ]);
          }
        })
        .catch((error) => console.error('Error fetching addresses:', error));
    }
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupAddressOpen, setIsPopupAddressOpen] = useState(false);

  const handleAddressButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddressClosePopup = () => {
    setIsPopupAddressOpen(false);
  }

  const handleSaveAddress = (address: {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    addressType: string;
  }) => {
    
    const storedUser = sessionStorage.getItem('userData');
    if (!storedUser) {
      console.error('No user data found in session storage');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const mobile = parsedUser.mobile;

    fetch('http://localhost:5000/addAddress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, address }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Address saved successfully:', data);
      })
      .catch((error) => {
        console.error('Error saving address:', error);
      });
  };
  const handleSelectedAddress = (data:any) => {
    
    setSelectedAdress(data);
    console.log("data selce", data);
  };
  useEffect(()=>{
if(selectedAdress){
  setIsPopupAddressOpen(true);
}
  },[selectedAdress]);
  return (
    <AddressBookWrapper data-testid="AddressBook">
      <div>
        {/* Header */}
        <div className="bg-white p-3 shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-3">
            <Link className='text-gray-700' style={{ textDecoration: 'none' }} to={`/`}>
              <ArrowBackIcon />
              </Link>
              <h5>Address Book</h5>
            </div>
            <SearchIcon />
          </div>
        </div>
        <div className="m-3">
          <button
            className="  py-2 w-full bg-yellow-300 text-black  rounded-xl"
            onClick={ handleAddressButtonClick}
          >
            + Add New Address
          </button>

          <AddressMapComponent open={isPopupOpen} handleClose={handleClosePopup} onSave={handleSelectedAddress}/>

          <MdAddressDetailsPopup
            open={isPopupAddressOpen}
            handleClose={handleAddressClosePopup}
            onSave={handleSaveAddress}
            mapAddr={selectedAdress}
          />
        </div>

        {/* Address List */}
        <div>
          {addressList.map((person, personIndex) => (
            <div key={personIndex}>
              {person.addresses.map((address, addressIndex) => (
                <div
                  key={addressIndex}
                  className="border-2 border-gray-100 m-3 p-2 rounded"
                  onClick={() => handleAddressSelection(addressIndex,address)}
                >
                  <div className="flex flex-col text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">{person.name}</span>
                      <span className="font-medium bg-green-100 text-green-700 p-1 rounded-md">
                        {address.addressType}
                      </span>
                      {selectedAddress === addressIndex && (
                        <span className="border-1 border-yellow-500 bg-yellow-200 p-1 rounded-md">
                          Selected Address
                        </span>
                      )}
                    </div>

                    <span className="text-gray-500">
                      {address.street}
                    </span>
                    <span className="text-gray-500">
                      {address.area}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AddressBookWrapper>
  );
};

export default AddressBook;
