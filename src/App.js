import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import AdminProtectedRoute from './components/ProtectedRoutes/AdminProtectedRoute';
import UserProtectedRoute from './components/ProtectedRoutes/UserProtectedRoute';

// Pages
import Homepage from "./Pages/HomeLayout/Homepage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import FuelTracking from "./Pages/Admin/FuelTracking";
import UserManagement from "./Pages/Admin/UserManagement";
import UserDashboard from "./Pages/User/UserDashboard";
import TypeUnit from "./Pages/Admin/TypeUnit";
import ApproveSection from "./Pages/Admin/ApproveSection";
import AdminSection from "./Pages/Admin/AdminSection";
import GasSlip from "./Pages/User/GasSlip";
import RequestingParty from "./Pages/Admin/RequestingParty";

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
          <Route path="/admin/dashboard/approve-section" element={< ApproveSection />} />
          <Route path="/admin/dashboard/admin-section" element={< AdminSection />} />
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