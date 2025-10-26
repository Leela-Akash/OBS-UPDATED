import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Routes, Route } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contextapi/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
// Customer pages
import DepositWithdraw from "./DepositWithdraw";
import Statements from "./Statements";

import "../admin/admincss/AdminNavbar.css";
import Home from './../main/Home';
import Transferfunds from './Transferfunds';
import CustomerProfile from "./CustomerProfile";
import Loans from './Loans';
import CustomerUpdateProfile from './UpdateProfile';
import Notifications from './Notifications';

export default function CustomerNavBar() {
  const navigate = useNavigate();
  const { setIsCustomerLoggedIn } = useAuth(); // auth context

  const [customer, setCustomer] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedCustomer = JSON.parse(sessionStorage.getItem("customer"));
    if (!storedCustomer) {
      navigate("/customerlogin", { replace: true });
      return;
    }
    setCustomer(storedCustomer);
    fetchUnreadCount(storedCustomer.id);
    
    // Auto-refresh unread count every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount(storedCustomer.id);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [navigate]);
  
  const fetchUnreadCount = async (customerId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/notification/customer/${customerId}/unread/count`);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsCustomerLoggedIn(false);
    navigate("/customerlogin", { replace: true });  
  };

  return (
    <>
      {/* 🔹 Top Navigation */}
      <nav className="admin-navbar">
        <div className="logo">OnlineBank</div>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/customer/deposit-withdraw">Deposit / Withdraw</NavLink>
          
          <NavLink to="/customer/statements">Statements</NavLink>

          <NavLink to="/funds">Fund Transfer</NavLink>
        
          <NavLink to="/loans">Loans</NavLink>
          
          <NavLink to="/notifications">
            Notifications
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </NavLink>

          
  
          <NavLink to="/update">Update Profile</NavLink>
  <NavLink to="/profile">
  <FaUserCircle className="navbar-icon" />
</NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
          
        </div>

     {customer && (
  <span className="welcome" style={{ color: 'white', fontWeight: 'bold' }}>
    Welcome, {customer.fullName}
  </span>
)}

      </nav>

      {/* 🔹 Routed Pages */}
      <main className="content">
        <Routes>
          {/* <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      
    
          <Route path="/customer/bill-payments" element={<BillPayments />} />
          
         
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/update" element={<UpdateProfile />} /> */}

           <Route path="/" element={<Home/>} />
           <Route path="/customer/statements" element={<Statements />} />
               <Route path="/customer/deposit-withdraw" element={<DepositWithdraw />} />
                     <Route path="/funds" element={<Transferfunds/>} />
                          <Route path="/profile" element={<CustomerProfile/>} />
                          <Route path="/loans" element={<Loans/>} />
                          <Route path="/notifications" element={<Notifications/>} />
                    <Route path="/update" element={<CustomerUpdateProfile/>} />
        </Routes>
      </main>
    </>
  );
}
