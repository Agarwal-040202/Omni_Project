
import './App.css';
import React, { useState, createContext } from 'react';
import LoginForm from './Component/LoginPage/LoginForm';
import Otpcode from './Component/OTPScreen/Otpcode';
import Login from './Component/LoginPage/Login';
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import Menubar from './Component/Navbar/Menubar';
import Homepage from './Component/Home/Homepage';
import Otpadmin from './Component/OTPScreen/Otpadmin';
import CommToaster from './Component/CustomToaster/CommToaster';
import MyContext from './MyContext';
import Loaderpage from './Component/LoaderPage/Loaderpage';
import FooterPage from './Component/FooterPage/FooterPage';
import Fourbox from './Component/fourbox/Fourbox';
import FieldMember from './Component/FieldMember/FieldMember';
import ShopkeeperTableDetails from './Component/Shopkeepr Details/ShopkeeperTableDetails';
import ShopKeeperList from './Component/ShopKeeper/ShopKeeperList';
import Commoncomponent from './Component/Pricelistwithorder/CommonComponent/Commoncomponent';
import Adminpannel, { } from "./Component/AdminDashboard/Adminpannel/Adminpannel"
import ContactUS from './Component/ContactUS';
import AboutUS from './Component/AboutUS';
import OrderByShopkeeper from './Component/ShopkeeperOrder/OrderByShopkeeper';
import Dashboard from './Component/AdminDashboard/Dashboard/Dashboard';
import Corporatevideo from './Component/CorporateVideo/Corporatevideo';
import Writemodemodal from './Component/WriteModeModal/Writemodemodal';
// import EditOrderModal from './Component/UpdateOrder/EditOrderModal';
import EditOrderTable from './Component/UpdateOrder/EditorderTable';
import ScrewReportPage from './Component/Screw Report/ScrewReportPage';

// Import other components here

function App() {
  // const { type, id } = useParams();
  const loaction = useLocation()
  const UserData = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""

  const [showToast, setShowToast] = useState({
    open: null,
    type: null,
    message: null,
  });

  const [showLoader, setShowLoder] = useState(false)

  // console.log('shtshowToast', UserData?.User_Role)

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

  // console.log("loaction?.statefdf",loaction?.state?.UserRole)

  return (
    <MyContext.Provider value={contextValue}>
      {showLoader == true && <><Loaderpage /></>}
      <div>
        {UserData?.User_Role == "Admin" ? <Adminpannel /> : <Menubar />}
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/otpcode" element={<Otpcode />} />
          <Route exact path="/admincode" element={<Otpadmin />} />
          <Route exact path="/memberlogin" element={<Login />} />
          <Route exact path="/adminlogin" element={<LoginForm />} />

          {UserData?.User_Role === "Field Member" && (
            <>
              <Route exact path="/addfieldmember" element={<FieldMember />} />
              <Route exact path="/addshopkeeper" element={<ShopKeeperList />} />
              {/* <Route exact path="/fourbox/pricelist" element={<Commoncomponent text={1111} />} /> */}
              <Route exact path="/fourbox/pricelist" element={<Commoncomponent text={1} />} />
              <Route exact path="/:id" element={<Commoncomponent text={1} />} />
              <Route exact path="/fourbox" element={<Fourbox />} />
              <Route exact path="/writemodemodal" element={<Writemodemodal />} />
              <Route exact path='/editordertable' element={<EditOrderTable/>}/>
              <Route exact path='/screwreportpage' element={<ScrewReportPage/>}/>


            </>
          )}

          {UserData?.User_Role === "Admin" && (
            <>
              <Route path="/admindashboard" element={<Adminpannel />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}
          <Route exact path="/contactus" element={<ContactUS />} />
          <Route exact path="/aboutus" element={<AboutUS />} />
          <Route exact path="/orderbyshopkeeper" element={<OrderByShopkeeper />} />
          {/* <Route exact path="/dashboard" element={<Dashboard/>} /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <FooterPage />
      </div>
      {showToast.open &&
        <CommToaster {...showToast} />}
    </MyContext.Provider>
  );
}

export default App;
