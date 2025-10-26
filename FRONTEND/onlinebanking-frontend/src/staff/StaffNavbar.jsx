import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaUserCheck, 
  FaMoneyCheckAlt, 
  FaExclamationTriangle, 
  FaUsers, 
  FaFileAlt, 
  FaSignOutAlt 
} from "react-icons/fa";
import "../admin/admincss/AdminNavbar.css";   
import { useAuth } from "../contextapi/AuthContext.jsx";
import { FaUserCircle } from "react-icons/fa";
 

import NotFound from "../main/NotFound.jsx";
import Transactions from './Transcations';
import ViewAllCustomers from './ViewAllCustomers';
import StaffDashboard from './StaffDashboard';
import StaffProfile from './StaffProfile';
import LoanApproval from './LoanApproval';
 
 
export default function StaffNavBar() {
  const navigate = useNavigate();
  const { setIsStaffLoggedIn } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsStaffLoggedIn(false);
    navigate("/stafflogin", { replace: true });
  };

  return (
    <>
      {/* 🔹 Top Navbar */}
      <nav className="admin-navbar">
        <div className="logo">Staff Portal</div>

        <div className="nav-links">
          <NavLink to="/dashboard" end>
            Dashboard
          </NavLink>
          <NavLink to="/transactions">
           Transactions
          </NavLink>
          <NavLink to="/staffloans">
            Loan Approvals
          </NavLink>
           
        
          <NavLink to="/customers">
            Customers
          </NavLink>
 
<NavLink to="/profile">
  <FaUserCircle className="navbar-icon" />
</NavLink>


          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </nav>

      {/* 🔹 Routed Content */}
      <main className="content">
        <Routes>
          {/* <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/account-approvals" element={<AccountApprovals />} />
          <Route path="/staff/loan-approvals" element={<LoanApprovals />} />
          <Route path="/staff/transactions" element={<TransactionMonitoring />} />
          <Route path="/staff/manage-customers" element={<ManageCustomers />} />
          <Route path="/staff/reports" element={<Reports />} />
          <Route path="/staff/profile" element={<StaffProfile />} /> */}
          <Route path="*" element={<NotFound />} />

            <Route path="/dashboard" element={<StaffDashboard/>} /> 
              <Route path="/profile" element={<StaffProfile/>} /> 
              <Route path="/staffloans" element={<LoanApproval/>} /> 
           <Route path="/transactions" element={<Transactions/>} /> 
           <Route path="/customers" element={<ViewAllCustomers/>} /> 
        </Routes>
      </main>
    </>
  );
}
