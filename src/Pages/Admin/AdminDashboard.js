import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminCards from "../../components/cards/AdminCards";
import AdminGraph from "../../components/Graph/AdminGraph";
import AdminHeader from "../../components/Headers/AdminHeader";
import { useAdminAuth, useDashboardStats, useAdminLogout } from "../../hooks/AdminDashboardHooks";
import { NavigationUtils, CardDataUtils } from "../../utils/AdminDashboardUtils";

function AdminDashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  
  // Custom hooks
  const { admin } = useAdminAuth();
  const { stats, statsLoading, fetchStats } = useDashboardStats();
  const { handleLogout } = useAdminLogout();

  useEffect(() => {
    if (admin) {
      fetchStats();
    }
  }, [admin, fetchStats]);

  // Navigation handlers
  const handleMenuItemClick = NavigationUtils.handleMenuItemClick(setActiveItem, navigate);
  const handleCardClick = NavigationUtils.handleCardClick(setActiveItem, navigate);

  // Generate cards data
  const cards = CardDataUtils.generateCardsData(stats);

  return (
    <AdminSidebar 
      admin={admin} 
      activeItem={activeItem} 
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        <AdminHeader onSignOut={handleLogout} />
        <AdminCards 
          cards={cards} 
          onCardClick={handleCardClick}
        />   
        <AdminGraph />
      </main>
    </AdminSidebar>
  );
}

export default AdminDashboard;