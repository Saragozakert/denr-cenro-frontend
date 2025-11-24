import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import TripTicketAdminTable from "../../Tables/TripTicketAdminTable";
import "./../../assets/Style/AdminDesign/TripTicketAdmin.css";

// Modern SVG Icons
const SearchIcon = () => (
  <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

function TripTicketAdmin() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("admin");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [tripTickets, setTripTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    fetchTripTickets();
  }, [navigate]);

  const fetchTripTickets = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/trip-tickets-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setTripTickets(response.data.tripTickets || []);
      }
    } catch (error) {
      console.error("Error fetching trip tickets:", error);
      setTripTickets([]);
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

  const handleEditTripTicket = (ticket) => {
    console.log("View trip ticket details:", ticket);
    // You can implement a modal or navigate to details page here
  };

  const filteredTickets = tripTickets.filter(ticket =>
    ticket.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.date_requested?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.date_submitted?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar
      admin={admin}
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        <div className="trip-ticket-admin-container">
          {/* Modern Header Section - Search Only */}
          <div className="management-header-modern">
            <div className="header-content">
              <div className="title-section">
                <h1 className="page-title">Trip Tickets</h1>
                <p className="page-subtitle">Monitor and manage all trip ticket requests</p>
              </div>
              
              <div className="actions-section">
                {/* Modern Search Bar */}
                <div className="search-container-modern">
                  <div className="search-input-wrapper">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search by withdrawn by, section, status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input-modern"
                    />
                    {searchTerm && (
                      <button 
                        className="clear-search-btn"
                        onClick={() => setSearchTerm("")}
                      >
                        <ClearIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TripTicketAdminTable
            tripTickets={filteredTickets}
            isLoading={isLoading}
            searchTerm={searchTerm}
            handleEditTripTicket={handleEditTripTicket}
            onRefresh={fetchTripTickets}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default TripTicketAdmin;