import { useState, useEffect, useRef } from "react"; // ADD useRef
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/Sidebars/UserSidebar";
import TripTicketUserTable from "../../Tables/TripTicketUserTable";
import "./../../assets/Style/UserDesign/UserDashboard.css";
import "./../../assets/Style/UserDesign/TripTicketUser.css";

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

function TripTicketUser() {
    const [user, setUser] = useState(null);
    const [activeItem, setActiveItem] = useState("tripTicket");
    const [searchTerm, setSearchTerm] = useState("");
    const [tripTickets, setTripTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // ADD: useRef to track previously seen ticket IDs
    const previousTicketIds = useRef(new Set());

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const userData = localStorage.getItem("userData");

                if (!token || !userData) {
                    navigate("/");
                    return;
                }

                await axios.get("http://localhost:8000/api/user/check-auth", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                setUser(JSON.parse(userData));
            } catch (error) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userData");
                navigate("/");
            }
        };

        checkAuth();
        fetchTripTickets();
        
        // ADD: Set up interval for polling (no notifications)
        const intervalId = setInterval(fetchTripTickets, 10000); // Check every 10 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [navigate]);

    // UPDATED: fetchTripTickets with polling logic (no notifications)
    const fetchTripTickets = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/user-trip-tickets", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                const newTripTickets = response.data.tripTickets || [];
                
                // POLLING ONLY: Just update the data without showing notifications
                // The data will automatically refresh in the background
                
                // Update the previous ticket IDs for tracking (but no notifications)
                previousTicketIds.current = new Set(newTripTickets.map(ticket => ticket.id));
                setTripTickets(newTripTickets);
            } else {
                setTripTickets([]);
            }
        } catch (error) {
            console.error("Error fetching trip tickets:", error);
            setTripTickets([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMenuItemClick = (itemName, path) => {
        setActiveItem(itemName);
        if (path && path !== "#") {
            navigate(path);
        }
    };

    const handleEditTicket = (ticket) => {
        console.log('Edit ticket:', ticket);
        // Navigate to trip ticket form or show modal
        if (ticket.status === 'Pending') {
            navigate(`/trip-ticket-form/${ticket.fuel_request_id}`);
        } else {
            alert(`Trip ticket already submitted on ${ticket.date_submitted}`);
        }
    };

    const handleRefresh = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/user-trip-tickets", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                setTripTickets(response.data.tripTickets || []);
            }
        } catch (error) {
            console.error("Error refreshing trip tickets:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredTripTickets = tripTickets.filter(ticket =>
        ticket.date_requested?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.fuel_amount?.toString().includes(searchTerm) ||
        ticket.fuel_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.date_submitted?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <UserSidebar
            user={user}
            activeItem={activeItem}
            onMenuItemClick={handleMenuItemClick}
        >
            <main className="dashboard-content">
                <div className="trip-ticket-container">
                    {/* Modern Header Section */}
                    <div className="trip-ticket-header-modern">
                        <div className="header-content">
                            <div className="title-section">
                                <h1 className="page-title">Trip Tickets</h1>
                                <p className="page-subtitle">Manage and track your fuel request tickets</p>
                            </div>
                            
                            <div className="actions-section">
                                {/* Modern Search Bar */}
                                <div className="search-container-modern">
                                    <div className="search-input-wrapper">
                                        <SearchIcon />
                                        <input
                                            type="text"
                                            placeholder="Search by date, fuel amount, type"
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

                                {/* Modern Refresh Button */}
                               
                            </div>
                        </div>
                    </div>

                    <TripTicketUserTable
                        tripTickets={filteredTripTickets}
                        isLoading={isLoading}
                        searchTerm={searchTerm}
                        handleEditTicket={handleEditTicket}
                        onRefresh={handleRefresh}
                    />
                </div>
            </main>
        </UserSidebar>
    );
}

export default TripTicketUser;