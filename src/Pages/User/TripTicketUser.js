import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/Sidebars/UserSidebar";
import UserHeader from "../../components/Headers/UserHeader";
import TripTicketUserTable from "../../Tables/TripTicketUserTable";
import "./../../assets/Style/UserDesign/UserDashboard.css";
import "./../../assets/Style/UserDesign/TripTicketUser.css";

function TripTicketUser() {
    const [user, setUser] = useState(null);
    const [activeItem, setActiveItem] = useState("tripTicket");
    const [searchTerm, setSearchTerm] = useState("");
    const [tripTickets, setTripTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
                    setTripTickets(response.data.tripTickets || []);
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

        checkAuth();
        fetchTripTickets();
    }, [navigate]);

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
            <UserHeader user={user} />

            <main className="dashboard-content">
                <div className="trip-ticket-container">
                    <div className="trip-ticket-management-header">
                        <div className="trip-ticket-search-container">
                            <div className="trip-ticket-search-box">
                                <svg className="trip-ticket-search-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12,7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search trip tickets by date, fuel amount, fuel type, status, or date submitted..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="trip-ticket-search-input"
                                />
                                {searchTerm && (
                                    <button
                                        className="trip-ticket-clear-search"
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