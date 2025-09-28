import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import AdminProtectedRoute from './components/ProtectedRoutes/AdminProtectedRoute';
import UserProtectedRoute from './components/ProtectedRoutes/UserProtectedRoute';

// Homepage
import Homepage from "./Pages/HomeLayout/Homepage";

// Admin Pages
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import FuelTracking from "./Pages/Admin/FuelTracking";
import UserManagement from "./Pages/Admin/UserManagement";
import RequestingParty from "./Pages/Admin/RequestingParty";
import ApprovedSlip from "./Pages/Admin/ApprovedSlip";
import TypeUnit from "./Pages/Admin/TypeUnit";
import ApproveSection from "./Pages/Admin/ApproveSection";
import AdminSection from "./Pages/Admin/AdminSection";


// User Pages
import UserDashboard from "./Pages/User/UserDashboard";
import GasSlip from "./Pages/User/GasSlip";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Homepage />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminProtectedRoute/>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/requesting-party" element={<RequestingParty />} />
          <Route path="/admin/dashboard/fuel-tracking" element={<FuelTracking />} />
          <Route path="/admin/dashboard/user-management" element={<UserManagement />} />
          <Route path="/admin/dashboard/type-unit" element={<TypeUnit />} />
          <Route path="/admin/dashboard/approve-section" element={<ApproveSection />} />
          <Route path="/admin/dashboard/admin-section" element={<AdminSection />} />
          <Route path="/admin/dashboard/approved-slip" element={<ApprovedSlip />} />
        </Route>

        {/* User Protected Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/dashboard/gas-slip" element={<GasSlip />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;