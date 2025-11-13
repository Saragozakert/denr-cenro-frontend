import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";
import TripTicketAdminTable from "../../Tables/TripTicketAdminTable";
import "./../../assets/Style/AdminDesign/AdminDashboard.css";
import "./../../assets/Style/AdminDesign/TripTicketAdmin.css";

function TripTicketAdmin() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("admin");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for design purposes only
  const [tripTickets] = useState([
    {
      id: 1,
      date_requested: "2024-01-15",
      withdrawn_by: "John Doe",
      section: "IT Department",
      status: "Pending",
      date_submitted: "2024-01-14"
    },
    {
      id: 2,
      date_requested: "2024-01-16",
      withdrawn_by: "Jane Smith",
      section: "HR Department",
      status: "Approved",
      date_submitted: "2024-01-15"
    },
    {
      id: 3,
      date_requested: "2024-01-17",
      withdrawn_by: "Mike Johnson",
      section: "Finance",
      status: "Rejected",
      date_submitted: "2024-01-16"
    }
  ]);

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

  // Mock functions for design purposes
  const handleEditTripTicket = (ticket) => {
    console.log("Edit ticket:", ticket);
  };

  const filteredTickets = tripTickets.filter(ticket =>
    ticket.withdrawn_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar
      admin={admin}
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >
      <AdminHeader
        admin={admin}
        title="Trip Ticket"
        subtitle="Manage trip tickets in the system"
      />

      <main className="dashboard-content">
        <div className="trip-ticket-admin-container">
          <div className="trip-ticket-admin-management-header">
            <div className="trip-ticket-admin-search-container">
              <div className="trip-ticket-admin-search-box">
                <svg className="trip-ticket-admin-search-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12,7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search trip tickets by withdrawn by, section, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="trip-ticket-admin-search-input"
                />
                {searchTerm && (
                  <button
                    className="trip-ticket-admin-clear-search"
                    onClick={() => setSearchTerm("")}
                  >
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <button
              className="trip-ticket-admin-add-btn"
              onClick={() => console.log("Add new trip ticket")}
            >
              <span className="trip-ticket-admin-btn-icon">+</span>
              Add Trip Ticket
            </button>
          </div>

          <TripTicketAdminTable
            tripTickets={filteredTickets}
            isLoading={false}
            searchTerm={searchTerm}
            handleEditTripTicket={handleEditTripTicket}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default TripTicketAdmin;