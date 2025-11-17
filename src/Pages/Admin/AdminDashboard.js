import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
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

  const cards = [
    {
      title: "Trip Tickets",
      count: 24,
      icon: "🚗",
      path: "/admin/dashboard/trip-ticket",
      priority: 1,
      thisMonth: 8,
      trend: "positive",
      colorType: "success" 
    },
    {
      title: "Gas Slip Requests",
      count: 18,
      icon: "⛽",
      path: "/admin/gas-slips",
      priority: 2,
      thisMonth: 12,
      trend: "positive", 
      colorType: "info" 
    },
    {
      title: "Pending Approvals",
      count: 8,
      icon: "✅",
      path: "/admin/approvals",
      priority: 3,
      thisMonth: 8,
      trend: "warning",
      colorType: "warning" 
    },
    {
      title: "Total Users",
      count: 156,
      icon: "👤",
      path: "/admin/users",
      priority: 4,
      thisMonth: 23,
      trend: "positive",
      colorType: "secondary" 
    }
  ];

  const getCardType = (card) => {
    return card.colorType;
  };

  const getTrendText = (trend, count, thisMonth) => {
    const difference = count - thisMonth;
    if (trend === "positive") return `+${difference} from last month`;
    if (trend === "negative") return `-${Math.abs(difference)} from last month`;
    return `No change from last month`;
  };

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
          {cards.map((card, index) => {
            const cardType = getCardType(card);
            
            return (
              <div 
                key={index} 
                className={`dashboard-card ${cardType}`}
                onClick={() => handleMenuItemClick(card.title.toLowerCase(), card.path)}
              >
                <div className="card-header">
                  <h3 className="card-title">{card.title}</h3>
                  <div className="card-icon">
                    {card.icon}
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-main-value">{card.count}</div>
                  <div className="card-main-label">Total Count</div>
                  
                  <div className="status-indicator">
                    <div className={`status-dot status-${cardType}`}></div>
                    <span className={`status-text status-${cardType}`}>
                      {getTrendText(card.trend, card.count, card.thisMonth)}
                    </span>
                  </div>
                </div>

                <div className="card-comparison">
                  <div className="comparison-item">
                    <span className="comparison-label">This Month</span>
                    <span className="comparison-value">{card.thisMonth}</span>
                  </div>
                  
                  <div className="comparison-item">
                    <span className="comparison-label">Status</span>
                    <div className={`comparison-badge badge-${cardType}`}>
                      {card.trend === "positive" ? "On Track" : 
                       card.trend === "warning" ? "Attention" : 
                       card.trend === "negative" ? "Needs Review" : "Stable"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </AdminSidebar>
  );
}

export default AdminDashboard;