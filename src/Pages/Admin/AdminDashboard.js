import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);
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
    fetchUserStats();
  }, [navigate]);

  const fetchUserStats = async () => {
    try {
      setStatsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setTotalUsers(response.data.users?.length || 0);
    } catch (error) {
      console.error("Error fetching user stats:", error);
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

  return (
    <AdminSidebar 
      admin={admin} 
      activeItem={activeItem} 
      onMenuItemClick={handleMenuItemClick}
    >
      <AdminHeader 
        admin={admin} 
        title="Admin Dashboard"
        subtitle="Overview of system statistics and user management"
      />

      <main className="dashboard-content">
        <div className="dashboard-stats-container">
          {/* Total Users Card */}
          <div className="stat-card">
            <div className="stat-card-icon users-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-card-content">
              <h3>Total Users</h3>
              {statsLoading ? (
                <div className="stat-loading">
                  <div className="stat-loading-spinner"></div>
                </div>
              ) : (
                <span className="stat-number">{totalUsers}</span>
              )}
              <p className="stat-description">All registered users in the system</p>
            </div>
          </div>
          
          {/* You can add more cards here later */}
          <div className="stat-card">
            <div className="stat-card-icon active-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 15.5L8.5 13.5L5 17L10.5 22.5L22.5 10.5L19 7L10.5 15.5Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-card-content">
              <h3>Active Users</h3>
              <span className="stat-number">0</span>
              <p className="stat-description">Currently active users</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card-icon inactive-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 11.39 4.08 10.79 4.21 10.22L8.99 15V16C8.99 17.1 9.89 18 10.99 18V19.93C7.06 19.43 4 16.07 4 12ZM17.89 17.4C17.63 16.59 16.89 16 15.99 16H14.99V13C14.99 12.45 14.54 12 13.99 12H7.99V10H9.99C10.54 10 10.99 9.55 10.99 9V7H12.99C14.09 7 14.99 6.1 14.99 5V4.59C17.92 5.77 20 8.65 20 12C20 14.08 19.19 15.98 17.89 17.4Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-card-content">
              <h3>Inactive Users</h3>
              <span className="stat-number">0</span>
              <p className="stat-description">Users with inactive status</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-content-main">
          <p>You have successfully logged in to the admin dashboard.</p>
          {/* Your main content will go here */}
        </div>
      </main>
    </AdminSidebar>
  );
}

export default AdminDashboard;