import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/Sidebars/UserSidebar";
import UserHeader from "../../components/Headers/UserHeader";
import TripTicketUserTable from "../../Tables/TripTicketUserTable";
import "./../../assets/Style/UserDesign/UserDashboard.css";
import "./../../assets/Style/UserDesign/TripTicketUser.css";

// Sample data moved outside the component - this never changes
const sampleTripTickets = [
    {
        id: 1,
        date_requested: "2024-01-15",
        fuel_amount: 50,
        fuel_type: "Premium Gasoline",
        status: "pending",
        requesting_party: "John Doe",
        vehicle_type: "SUV",
        plate_no: "ABC123",
        purpose: "Client Meeting",
        created_at: "2024-01-15T08:30:00Z"
    },
    {
        id: 2,
        date_requested: "2024-01-16",
        fuel_amount: 35,
        fuel_type: "Diesel",
        status: "approved",
        requesting_party: "John Doe",
        vehicle_type: "Sedan",
        plate_no: "XYZ789",
        purpose: "Site Inspection",
        created_at: "2024-01-16T09:15:00Z"
    },
    {
        id: 3,
        date_requested: "2024-01-17",
        fuel_amount: 60,
        fuel_type: "Premium Gasoline",
        status: "completed",
        requesting_party: "Jane Smith",
        vehicle_type: "Van",
        plate_no: "DEF456",
        purpose: "Equipment Delivery",
        created_at: "2024-01-17T10:00:00Z"
    },
    {
        id: 4,
        date_requested: "2024-01-18",
        fuel_amount: 45,
        fuel_type: "Diesel",
        status: "declined",
        requesting_party: "Mike Johnson",
        vehicle_type: "Truck",
        plate_no: "GHI789",
        purpose: "Material Transport",
        created_at: "2024-01-18T11:20:00Z"
    }
];

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
                const response = await axios.get("http://localhost:8000/api/user/trip-tickets", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (response.data.success) {
                    setTripTickets(response.data.tripTickets || []);
                } else {
                    // Use sample data if API fails or returns no data
                    console.log("Using sample data for demonstration");
                    setTripTickets(sampleTripTickets);
                }
            } catch (error) {
                console.error("Error fetching trip tickets:", error);
                // Use sample data when API is not available
                console.log("API not available, using sample data");
                setTripTickets(sampleTripTickets);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
        fetchTripTickets();
    }, [navigate]); // Only navigate as dependency

    const handleMenuItemClick = (itemName, path) => {
        setActiveItem(itemName);
        if (path && path !== "#") {
            navigate(path);
        }
    };

    const handleEditTicket = (ticket) => {
        console.log('Edit ticket:', ticket);
        alert(`Edit functionality for ${ticket.requesting_party}'s trip ticket (ID: ${ticket.id}) will be implemented here`);
    };

    const filteredTripTickets = tripTickets.filter(ticket =>
        ticket.date_requested?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.fuel_amount?.toString().includes(searchTerm) ||
        ticket.fuel_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.requesting_party?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.purpose?.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    placeholder="Search trip tickets by date, fuel amount, fuel type, status, requesting party, plate no, or purpose..."
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
                        <button
                            className="trip-ticket-add-btn"
                            onClick={() => alert('Add Trip Ticket Form will be implemented here')}
                        >
                            <span className="trip-ticket-btn-icon">+</span>
                            Add Trip Ticket
                        </button>
                    </div>

                    <TripTicketUserTable
                        tripTickets={filteredTripTickets}
                        isLoading={isLoading}
                        searchTerm={searchTerm}
                        handleEditTicket={handleEditTicket}
                    />
                </div>
            </main>
        </UserSidebar>
    );
}

export default TripTicketUser;