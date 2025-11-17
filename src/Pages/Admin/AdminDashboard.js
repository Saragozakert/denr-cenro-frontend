import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("dashboard");
  const stats = useState({
    gasSlipRequests: 24,
    tripTickets: 18,
    requestingParties: 12,
    users: 156,
    pendingApprovals: 8,
    unitTypes: 6
  });
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

  const cards = [
    {
      title: "Trip Ticket",
      count: stats.tripTickets,
      icon: "🚗",
      color: "#065f46",
      path: "/admin/dashboard/trip-ticket",
      badge: stats.tripTickets > 15 ? "Active" : null,
      priority: 1
    },
    {
      title: "Gas Slip Request",
      count: stats.gasSlipRequests,
      icon: "⛽",
      color: "#047857",
      path: "/admin/gas-slips",
      badge: stats.gasSlipRequests > 20 ? "High" : null,
      priority: 2
    },
    {
      title: "Approve Section",
      count: stats.pendingApprovals,
      icon: "✅",
      color: "#10b981",
      path: "/admin/approvals",
      badge: stats.pendingApprovals > 0 ? "Pending" : null,
      priority: 3
    },
    {
      title: "Requesting Party",
      count: stats.requestingParties,
      icon: "👥",
      color: "#059669",
      path: "/admin/requesting-parties",
      priority: 4
    },
    

    
  ];

  return (
    <AdminSidebar 
      admin={admin} 
      activeItem={activeItem} 
      onMenuItemClick={handleMenuItemClick}
    >
      <AdminHeader 
        admin={admin} 
        title="Admin Dashboard"
        subtitle="Overview of system statistics and management"
      />

      <main className="dashboard-content">
        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="dashboard-card"
              onClick={() => handleMenuItemClick(card.title.toLowerCase(), card.path)}
            >
              {card.badge && (
                <div 
                  className="card-badge"
                  style={{ backgroundColor: card.color }}
                >
                  {card.badge}
                </div>
              )}
              <div className="card-header">
                <div 
                  className="card-icon" 
                  style={{ 
                    backgroundColor: `${card.color}15`, 
                    color: card.color,
                    borderColor: `${card.color}30`
                  }}
                >
                  {card.icon}
                </div>
                <div className="card-count">{card.count}</div>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <div className="card-footer">
                <span className="view-text">View Details</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminSidebar>
  );
}

export default AdminDashboard;