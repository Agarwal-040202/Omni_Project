
import './App.css';
import React, { useState, createContext } from 'react';
import LoginForm from './Component/LoginPage/LoginForm';
import Otpcode from './Component/OTPScreen/Otpcode';
import Login from './Component/LoginPage/Login';
import { Route, Routes } from 'react-router-dom';
import Menubar from './Component/Navbar/Menubar';
import Homepage from './Component/Home/Homepage';
import Otpadmin from './Component/OTPScreen/Otpadmin';
import CommToaster from './Component/CustomToaster/CommToaster';
import MyContext from './MyContext';
import Loaderpage from './Component/LoaderPage/Loaderpage';
import FooterPAge from './Component/FooterPage/FooterPage';
import Fourbox from './Component/fourbox/Fourbox';
import FieldMember from './Component/FieldMember/FieldMember';
import ShopkeeperTableDetails from './Component/Shopkeepr Details/ShopkeeperTableDetails';

// Import other components here

function App() {
  const [showToast, setShowToast] = useState({
    open: null,
    type: null,
    message: null,
  });

  const [showLoader, setShowLoder] = useState(false)

  console.log('showToastshowToast', showToast, showLoader)

  function handleShopToast(value, type, message) {
    setShowToast({
      open: value,
      type: type,
      message: message
    });
  }

  const contextValue = {
    handleShopToast: handleShopToast,
    setShowLoder: setShowLoder
  };

  return (
    <MyContext.Provider value={contextValue}>
      {showLoader == true && <><Loaderpage /></>}
      <div>
        <Menubar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          {/* Move the routes to separate components */}
          <Route exact path="/otpcode" element={<Otpcode />} />
          <Route exact path="/admincode" element={<Otpadmin />} />
          <Route exact path="/memberlogin" element={<Login />} />
          <Route exact path="/adminlogin" element={<LoginForm />} />
          <Route exact path="/addfieldmember" element={<FieldMember />} />
          <Route exact path="/addshopkeeper" element={<ShopkeeperTableDetails />} />
          <Route exact path="/fourbox" element={<Fourbox />} />
        </Routes>
        {/* <FieldMember/> */}
        {/* <ShopkeeperTableDetails/> */}
        <FooterPAge />
      </div>
      {showToast.open &&
        <CommToaster {...showToast} />}
    </MyContext.Provider>
  );
}

export default App;
