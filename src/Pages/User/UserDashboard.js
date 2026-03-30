// UserDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AdminDesign/AdminDashboard.css"; 
import UserSidebar from "../../components/Sidebars/UserSidebar";
import UserCards from "../../components/cards/UserCards";
import UserHeader from "../../components/Headers/UserHeader";
import UserGraph from "../../components/Graph/UserGraph";

function UserDashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [fuelRequests, setFuelRequests] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [tripRecords, setTripRecords] = useState(0);
  const [userData, setUserData] = useState(null); // Add state for user data
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => { 
      try {
        const token = localStorage.getItem("userToken"); 
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/user/check-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        
        // Store user data from the response
        setUserData(response.data.user);

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
      setFuelRequests(5);
      setPendingApprovals(2);
      setTripRecords(8);
    } catch (error) {
      console.error("Error fetching user stats:", error);
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

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.post("http://localhost:8000/api/user/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      localStorage.removeItem("userToken");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("userToken");
      navigate("/");
    }
  };

  const cards = [
    {
      title: "Fuel Request",
      count: fuelRequests,
      icon: "⛽",
      path: "/user/fuel-requests",
      priority: 1,
      thisMonth: 3,
      trend: "positive",
      colorType: "info",
      trendValue: "+2"
    },
    {
      title: "Pending Approval",
      count: pendingApprovals,
      icon: "✅",
      path: "/user/pending-approvals",
      priority: 2,
      thisMonth: 2,
      trend: "warning",
      colorType: "warning",
      trendValue: "+1"
    },
    {
      title: "Trip Records",
      count: tripRecords,
      icon: "🚗",
      path: "/user/trip-records",
      priority: 3,
      thisMonth: 5,
      trend: "positive",
      colorType: "success",
      trendValue: "+3"
    }
  ];

  return (
    <UserSidebar
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        {/* Pass userData to UserHeader */}
        <UserHeader onSignOut={handleSignOut} userData={userData} />
        <div className="dashboard-content-main">
          <UserCards 
            cards={cards} 
            onCardClick={handleCardClick}
          />
          <UserGraph />
        </div>
      </main>
    </UserSidebar>
  );
}

export default UserDashboard;