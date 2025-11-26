import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";
import AdminCards from "../../components/cards/AdminCards";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [statsLoading, setStatsLoading] = useState(true);
  const [gasSlipRequests, setGasSlipRequests] = useState(0);
  const [tripTickets, setTripTickets] = useState(0);
  const [users, setUsers] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("adminToken"); 
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/admin/check-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setAdmin(response.data.admin);
      } catch (error) {
        localStorage.removeItem("adminToken");
        navigate("/");
      }
    };

    checkAuth();
    fetchAdminStats();
  }, [navigate]);

  const fetchAdminStats = async () => {
    try {
      setStatsLoading(true);
      // Replace these with actual API calls for admin stats
      setGasSlipRequests(24);
      setTripTickets(18);
      setUsers(156);
      setPendingApprovals(8);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleMenuItemClick = (itemName, itemPath) => {
    setActiveItem(itemName);
    if (itemPath && itemPath !== "#") {
      navigate(itemPath);
    }
  };

  const handleCardClick = (itemName, itemPath) => {
    handleMenuItemClick(itemName, itemPath);
  };

  // Admin cards data - only the 4 specific cards in the order you want
  const cards = [
    {
      title: "Trip Tickets",
      count: tripTickets,
      icon: "🎫",
      path: "/admin/trip-tickets",
      priority: 1,
      thisMonth: 15,
      trend: "positive",
      colorType: "info",
      trendValue: "+3"
    },
    {
      title: "Gas Slip Requests",
      count: gasSlipRequests,
      icon: "📋",
      path: "/admin/gas-slip-requests",
      priority: 2,
      thisMonth: 20,
      trend: "positive",
      colorType: "success",
      trendValue: "+4"
    },
    {
      title: "Pending Approvals",
      count: pendingApprovals,
      icon: "⏳",
      path: "/admin/pending-approvals",
      priority: 3,
      thisMonth: 5,
      trend: "warning",
      colorType: "warning",
      trendValue: "+3"
    },
    {
      title: "Total Users",
      count: users,
      icon: "👤",
      path: "/admin/users",
      priority: 4,
      thisMonth: 150,
      trend: "positive",
      colorType: "secondary",
      trendValue: "+6"
    }
  ];

  return (
    <AdminSidebar 
      admin={admin} 
      activeItem={activeItem} 
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        <AdminHeader 
          admin={admin} 
          title="Admin Dashboard"
          subtitle="Overview of system statistics and management"
        />
        
        <div className="dashboard-content-main">
          <AdminCards 
            cards={cards} 
            onCardClick={handleCardClick}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default AdminDashboard;