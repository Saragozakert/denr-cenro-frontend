import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css"; 
import UserSidebar from "../../components/Sidebars/UserSidebar";


function UserDashboard() {
  const [statsLoading, setStatsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => { 
      try {
        const token = localStorage.getItem("userToken"); 
        if (!token) {
          navigate("/");
          return;
        }

        // Remove the unused response variable
        await axios.get("http://localhost:8000/api/user/check-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

      } catch (error) {
        localStorage.removeItem("userToken");
        navigate("/");
      }
    };

    checkAuth();
    fetchUserStats();
  }, [navigate]);

  const fetchUserStats = async () => {
    try {
      setStatsLoading(true);
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
    <UserSidebar
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >
      
      <main className="dashboard-content">
        <div className="dashboard-stats-container">
          {/* Gas Slips Card */}
          <div className="stat-card">
            <div className="stat-card-icon gas-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 10V8H15V4H9V8H6V10H3V20H21V10H18ZM8 6H12V10H8V6ZM19 18H5V12H19V18Z" fill="currentColor" />
                <path d="M12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z" fill="currentColor" />
              </svg>
            </div>
            <div className="stat-card-content">
              <h3>Gas Slips</h3>
              {statsLoading ? (
                <div className="stat-loading">
                  <div className="stat-loading-spinner"></div>
                </div>
              ) : (
                <span className="stat-number">0</span>
              )}
              <p className="stat-description">Your recent gas slips</p>
            </div>
          </div>

          {/* Trip Tickets Card */}
          <div className="stat-card">
            <div className="stat-card-icon trip-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
              </svg>
            </div>
            <div className="stat-card-content">
              <h3>Trip Tickets</h3>
              <span className="stat-number">0</span>
              <p className="stat-description">Your active trip tickets</p>
            </div>
          </div>

          {/* Vehicle Status Card */}
          <div className="stat-card">
            <div className="stat-card-icon vehicle-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9V5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5S16.67 13 17.5 13 19 13.67 19 14.5 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="currentColor" />
              </svg>
            </div>
            <div className="stat-card-content">
              <h3>Vehicle Status</h3>
              <span className="stat-number">Active</span>
              <p className="stat-description">Current vehicle status</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content-main">
          
        </div>
      </main>
    </UserSidebar>
  );
}

export default UserDashboard;