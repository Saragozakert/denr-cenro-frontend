import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";
import "../../assets/Style/AdminDesign/AdminDashboard.css";

function RequestingParty() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("requesting-party");
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

  return (
    <AdminSidebar
      admin={admin}
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >

      <AdminHeader
        admin={admin}
        title="Fuel Tracking"
        subtitle="Monitor and manage fuel consumption across all units"
      />

      

      
      <main className="dashboard-content">
        <div>
          <p>Regulating navigation pages</p>
        </div>
      </main>
    </AdminSidebar>
  );
}

export default RequestingParty;