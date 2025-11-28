import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/Sidebars/UserSidebar";
import GasSlipForm from "../../Forms/GasSlipForm";
import GasSlipTable from "../../Tables/GasSlipTable";
import GasSlipNotifications from '../../components/Notifications/GasSlipNotifications';
import '../../assets/Style/UserDesign/GasSlip.css';

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

const GasSlipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

function GasSlip() {
    const [user, setUser] = useState(null);
    const [activeItem, setActiveItem] = useState("gasSlip");
    const [searchTerm, setSearchTerm] = useState("");
    const [showGasSlipForm, setShowGasSlipForm] = useState(false);
    const [notifications, setNotifications] = useState([]);
    
    const previousApprovedIds = useRef(new Set());

    const [gasSlipFormData, setGasSlipFormData] = useState({
        vehicleType: '',
        modelName: '',
        modelNameDisplay: '',
        plateNo: '',
        requestingParty: '',
        section: '',
        office: '',
        purchasedNo: '',
        purpose: '',
        placesToVisit: '',
        authorizedPassengers: '',
        fuelType: '',
        gasolineAmount: '',
        withdrawnBy: '',
        approvedBy: '',
        issuedBy: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [approvedByOptions, setApprovedByOptions] = useState([]);
    const [requestingPartyOptions, setRequestingPartyOptions] = useState([]);
    const [gasSlips, setGasSlips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const addNotification = useCallback((message, type = "info") => {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            message,
            type,
            timestamp: new Date(),
        };

        setNotifications(prev => [...prev, newNotification]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 4000);
    }, [removeNotification]);

    // SIMPLIFIED: Fetch gas slips without polling
    const fetchGasSlips = useCallback(async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/fuel-requests-with-trip-status", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                const gasSlipsData = response.data.fuelRequests || [];
                
                // CHECK FOR NEWLY APPROVED REQUESTS (one-time check)
                if (previousApprovedIds.current.size > 0) {
                    const newlyApproved = gasSlipsData.filter(record => 
                        !previousApprovedIds.current.has(record.id) && 
                        record.status === 'approved'
                    );
                    
                    // Show notification for each newly approved request
                    newlyApproved.forEach(request => {
                        addNotification('Your fuel request has been approved!', 'success');
                    });
                }

                // Update the previous approved IDs
                previousApprovedIds.current = new Set(gasSlipsData.map(record => record.id));
                setGasSlips(gasSlipsData);
            }
        } catch (error) {
            console.error("Error fetching gas slips:", error);
            // Fallback to original endpoint if new one fails
            try {
                const token = localStorage.getItem("userToken");
                const fallbackResponse = await axios.get("http://localhost:8000/api/user/fuel-requests", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (fallbackResponse.data.success) {
                    const gasSlipsWithDefault = fallbackResponse.data.fuelRequests.map(slip => ({
                        ...slip,
                        has_trip_ticket: false
                    }));
                    
                    // CHECK FOR NEWLY APPROVED IN FALLBACK DATA TOO
                    if (previousApprovedIds.current.size > 0) {
                        const newlyApproved = gasSlipsWithDefault.filter(record => 
                            !previousApprovedIds.current.has(record.id) && 
                            record.status === 'approved'
                        );
                        
                        newlyApproved.forEach(request => {
                            addNotification('Your fuel request has been approved!', 'success');
                        });
                    }
                    
                    // Update the previous approved IDs for fallback data
                    previousApprovedIds.current = new Set(gasSlipsWithDefault.map(record => record.id));
                    setGasSlips(gasSlipsWithDefault || []);
                }
            } catch (fallbackError) {
                console.error("Error fetching gas slips from fallback endpoint:", fallbackError);
                setGasSlips([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [addNotification]);

    const fetchEmployees = useCallback(async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/employees", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                const employees = response.data.employees || [];
                const options = employees.map(employee => ({
                    value: employee.id,
                    label: employee.name
                }));
                setApprovedByOptions(options);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    }, []);

    const fetchRequestingParties = useCallback(async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/requesting-parties", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                const requestingParties = response.data.requestingParties || [];
                const options = requestingParties.map(party => ({
                    value: party.id,
                    label: party.full_name
                }));
                setRequestingPartyOptions(options);
            }
        } catch (error) {
            console.error("Error fetching requesting parties:", error);
            setRequestingPartyOptions([
                { value: 'admin', label: 'Admin' },
                { value: 'operations', label: 'Operations' },
                { value: 'logistics', label: 'Logistics' },
                { value: 'maintenance', label: 'Maintenance' }
            ]);
        }
    }, []);

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
        fetchEmployees();
        fetchRequestingParties();
        fetchGasSlips();
        
        // REMOVED: Polling interval - no more automatic refreshing
        // const intervalId = setInterval(fetchGasSlips, 10000);
        // return () => clearInterval(intervalId);

    }, [navigate, fetchGasSlips, fetchEmployees, fetchRequestingParties]);

    const handleMenuItemClick = (itemName, path) => {
        setActiveItem(itemName);
        if (path && path !== "#") {
            navigate(path);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setGasSlipFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleGasSlipSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        try {
            const token = localStorage.getItem("userToken");

            const selectedEmployee = approvedByOptions.find(
                option => option.value.toString() === gasSlipFormData.approvedBy
            );
            const approvedByName = selectedEmployee ? selectedEmployee.label : gasSlipFormData.approvedBy;

            const selectedRequestingParty = requestingPartyOptions.find(
                option => option.value.toString() === gasSlipFormData.requestingParty
            );
            const requestingPartyName = selectedRequestingParty ? selectedRequestingParty.label : gasSlipFormData.requestingParty;

            const response = await axios.post("http://localhost:8000/api/user/fuel-requests", {
                vehicle_type: gasSlipFormData.vehicleType,
                model_name: gasSlipFormData.modelNameDisplay || gasSlipFormData.modelName,
                plate_no: gasSlipFormData.plateNo,
                requesting_party: requestingPartyName,
                section: gasSlipFormData.section,
                office: gasSlipFormData.office,
                purchased_no: gasSlipFormData.purchasedNo,
                purpose: gasSlipFormData.purpose,
                places_to_visit: gasSlipFormData.placesToVisit,
                authorized_passengers: gasSlipFormData.authorizedPassengers,
                fuel_type: gasSlipFormData.fuelType,
                gasoline_amount: gasSlipFormData.gasolineAmount,
                withdrawn_by: user ? user.full_name : "Current User",
                approved_by: approvedByName,
                issued_by: gasSlipFormData.issuedBy
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                setShowGasSlipForm(false);
                
                // Show success notification
                addNotification('Request submitted!', 'success');

                // Reset form data
                setGasSlipFormData({
                    vehicleType: '',
                    modelName: '',
                    modelNameDisplay: '',
                    plateNo: '',
                    requestingParty: '',
                    section: '',
                    office: '',
                    purchasedNo: '',
                    purpose: '',
                    placesToVisit: '',
                    authorizedPassengers: '',
                    fuelType: '',
                    gasolineAmount: '',
                    withdrawnBy: '',
                    approvedBy: '',
                    issuedBy: ''
                });

                fetchGasSlips(); // Refresh data manually
            }
        } catch (error) {
            console.error('Error submitting fuel request:', error);
            
            // Show error notification
            addNotification('Failed to submit fuel request. Please try again.', 'error');
            
            if (error.response?.data?.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setFormErrors({
                    general: ['Failed to submit fuel request. Please try again.']
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditSlip = (slip) => {
        console.log('Edit slip:', slip);
        addNotification('Edit functionality will be implemented here', 'info');
    };

    const handleDeclineSlip = async (slipId) => {
        if (window.confirm("Are you sure you want to decline this gas slip?")) {
            try {
                const token = localStorage.getItem("userToken");
                const response = await axios.delete(`http://localhost:8000/api/user/fuel-requests/${slipId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (response.data.success) {
                    addNotification("Gas slip declined successfully!", "success");
                    fetchGasSlips(); 
                }
            } catch (error) {
                addNotification("Error declining gas slip: " + (error.response?.data?.message || error.message), "error");
            }
        }
    };

    const filteredGasSlips = gasSlips.filter(slip =>
        !slip.has_trip_ticket && ( // EXCLUDE slips with trip tickets
            slip.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.requesting_party?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.office?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.date?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <UserSidebar
            user={user}
            activeItem={activeItem}
            onMenuItemClick={handleMenuItemClick}
        >
            {/* GasSlipNotifications component */}
            <GasSlipNotifications
                notifications={notifications}
                onRemoveNotification={removeNotification}
            />

            <main className="dashboard-content">
                <div className="gas-slip-container">
                    <div className="gas-slip-header-modern">
                        <div className="header-content">
                            <div className="title-section">
                                <h1 className="page-title">Gas Slips</h1>
                                <p className="page-subtitle">Manage fuel requests and trip ticket assignments</p>
                            </div>
                            
                            <div className="actions-section">
                                {/* Modern Search Bar */}
                                <div className="search-container-modern">
                                    <div className="search-input-wrapper">
                                        <SearchIcon />
                                        <input
                                            type="text"
                                            placeholder="Search by model, plate, requester, driver..."
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

                                {/* Modern Gas Slip Button */}
                                <button 
                                    className="gas-slip-btn-modern"
                                    onClick={() => setShowGasSlipForm(true)}
                                >
                                    <GasSlipIcon />
                                    <span>New Request</span>
                                </button>

                                {/* ADD MANUAL REFRESH BUTTON */}
                                <button 
                                    className="gas-slip-btn-modern refresh-btn"
                                    onClick={fetchGasSlips}
                                    title="Refresh data"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M23 4v6h-6"/>
                                        <path d="M1 20v-6h6"/>
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                                    </svg>
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <GasSlipTable
                        gasSlips={filteredGasSlips}
                        isLoading={isLoading}
                        searchTerm={searchTerm}
                        handleEditSlip={handleEditSlip}
                        handleDeclineSlip={handleDeclineSlip}
                        onTripTicketSubmitted={fetchGasSlips} // Pass refresh function
                    />
                </div>

                <GasSlipForm
                    showGasSlipForm={showGasSlipForm}
                    setShowGasSlipForm={setShowGasSlipForm}
                    formData={gasSlipFormData}
                    handleInputChange={handleInputChange}
                    handleGasSlipSubmit={handleGasSlipSubmit}
                    formErrors={formErrors}
                    loading={loading}
                    approvedByOptions={approvedByOptions}
                    requestingPartyOptions={requestingPartyOptions}
                    currentUserName={user ? user.full_name : "Current User"}
                />
            </main>
        </UserSidebar>
    );
}

export default GasSlip;