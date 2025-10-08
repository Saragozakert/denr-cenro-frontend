import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalApprovers, setTotalApprovers] = useState(0);
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
    fetchApproverStats();
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

  const fetchApproverStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setTotalApprovers(response.data.employees?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching approver stats:", error);
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
          
          {/* Approval Officers Card */}
          <div className="stat-card">
            <div className="stat-card-icon approval-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-card-content">
              <h3>Approval Officers</h3>
              <span className="stat-number">{totalApprovers}</span>
              <p className="stat-description">Employees who can approve tickets</p>
            </div>
          </div>
          
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
        </div>
      </main>
    </AdminSidebar>
  );
}

export default AdminDashboard;