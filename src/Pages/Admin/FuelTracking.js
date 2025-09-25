import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from '../../components/Sidebars/AdminSidebar';
import AdminHeader from '../../components/Headers/AdminHeader';
import FuelTrackingTable from '../../Tables/FuelTrackingTable'; // Import the table
import '../../assets/Style/AdminDesign/AdminDashboard.css';
import '../../assets/Style/AdminDesign/FuelTracking.css';

function FuelTracking() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("fuel");
  const [searchTerm, setSearchTerm] = useState("");
  const [fuelRecords, setFuelRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    fetchFuelRecords(); // Fetch fuel records on component mount
  }, [navigate]);

  const handleUpdateAmount = async (recordId, newAmount) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `http://localhost:8000/api/admin/fuel-requests/${recordId}/amount`,
        { gasoline_amount: newAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Gasoline amount updated successfully!");
        fetchFuelRecords(); // Refresh the records
      }
    } catch (error) {
      alert("Error updating gasoline amount: " + (error.response?.data?.message || error.message));
      throw error; // Re-throw to handle in the table component
    }
  };

  // Fetch fuel records from API
  const fetchFuelRecords = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/fuel-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setFuelRecords(response.data.fuelRequests || []);
      }
    } catch (error) {
      console.error("Error fetching fuel records:", error);
      setFuelRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuItemClick = (itemName, itemPath) => {
    setActiveItem(itemName);
    if (itemPath && itemPath !== "#") {
      navigate(itemPath);
    }
  };

  // Handle accept record
  const handleAcceptRecord = async (recordId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `http://localhost:8000/api/admin/fuel-requests/${recordId}/status`,
        { status: 'approved' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Fuel request approved successfully!");
        fetchFuelRecords();
      }
    } catch (error) {
      alert("Error approving fuel request: " + (error.response?.data?.message || error.message));
    }
  };

  // Handle reject record
  const handleRejectRecord = async (recordId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `http://localhost:8000/api/admin/fuel-requests/${recordId}/status`,
        { status: 'rejected' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Fuel request rejected successfully!");
        fetchFuelRecords();
      }
    } catch (error) {
      alert("Error rejecting fuel request: " + (error.response?.data?.message || error.message));
    }
  };

  // Filter fuel records based on search term
  const filteredFuelRecords = fuelRecords.filter(record =>
    record.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.office?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.date?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="fuel-tracking-container">
          <div className="fuel-tracking-management-header">
            <div className="fuel-tracking-search-container">
              <div className="fuel-tracking-search-box">
                <svg className="fuel-tracking-search-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12,7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search fuel records by unit, driver, date, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="fuel-tracking-search-input"
                />
                {searchTerm && (
                  <button
                    className="fuel-tracking-clear-search"
                    onClick={() => setSearchTerm("")}
                  >
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Fuel Tracking Table */}
          <FuelTrackingTable
            fuelRecords={filteredFuelRecords}
            isLoading={isLoading}
            searchTerm={searchTerm}
            handleAcceptRecord={handleAcceptRecord}
            handleRejectRecord={handleRejectRecord}
            handleUpdateAmount={handleUpdateAmount}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default FuelTracking;