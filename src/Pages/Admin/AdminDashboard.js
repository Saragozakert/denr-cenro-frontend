import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminCards from "../../components/cards/AdminCards";
import AdminGraph from "../../components/Graph/AdminGraph";
import AdminHeader from "../../components/Headers/AdminHeader";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("dashboard");
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
  }, [navigate]);

  const handleMenuItemClick = (itemName, itemPath) => {
    setActiveItem(itemName);
    if (itemPath && itemPath !== "#") {
      navigate(itemPath);
    }
  };

  const handleCardClick = (itemName, itemPath) => {
    handleMenuItemClick(itemName, itemPath);
  };

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("http://localhost:8000/api/admin/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      localStorage.removeItem("adminToken");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("adminToken");
      navigate("/");
    }
  };

  const cards = [
    {
      title: "Trip Tickets",
      count: 24,
      icon: "🚗",
      path: "/admin/dashboard/trip-ticket",
      priority: 1,
      thisMonth: 8,
      trend: "positive",
      colorType: "success",
      trendValue: "+12%"
    },
    {
      title: "Gas Slip Requests",
      count: 18,
      icon: "⛽",
      path: "/admin/gas-slips",
      priority: 2,
      thisMonth: 12,
      trend: "positive", 
      colorType: "info",
      trendValue: "+8%"
    },
    {
      title: "Pending Approvals",
      count: 8,
      icon: "✅",
      path: "/admin/approvals",
      priority: 3,
      thisMonth: 8,
      trend: "warning",
      colorType: "warning",
      trendValue: "+3%"
    },
    {
      title: "Total Users",
      count: 156,
      icon: "👤",
      path: "/admin/users",
      priority: 4,
      thisMonth: 23,
      trend: "positive",
      colorType: "secondary",
      trendValue: "+15%"
    }
  ];

  return (
    <AdminSidebar 
      admin={admin} 
      activeItem={activeItem} 
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        {/* Top Right Header Section */}
        <AdminHeader onSignOut={handleSignOut} />

        <AdminCards 
          cards={cards} 
          onCardClick={handleCardClick}
        />
        
        {/* Enhanced Charts Section */}
        <AdminGraph />
      </main>
    </AdminSidebar>
  );
}

export default AdminDashboard;