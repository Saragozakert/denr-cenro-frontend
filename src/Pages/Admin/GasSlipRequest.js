import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from '../../components/Sidebars/AdminSidebar';
import GasSlipRequestTable from '../../Tables/GasSlipRequestTable'; 
import GasSlipRequestNotifications from '../../components/Notifications/GasSlipRequestNotifications';
import '../../assets/Style/AdminDesign/GasSlipRequest.css';

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

const ChevronDown = () => (
  <svg className="chevron-down" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function GasSlipRequest() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("fuel");
  const [searchTerm, setSearchTerm] = useState("");
  const [fuelRecords, setFuelRecords] = useState([]);
  const [requestingParties, setRequestingParties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
    fetchFuelRecords();
    fetchRequestingParties();
    fetchEmployees();
  }, [navigate]);

  const fetchRequestingParties = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/requesting-parties", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setRequestingParties(response.data.requestingParties || []);
      }
    } catch (error) {
      console.error("Error fetching requesting parties:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setEmployees(response.data.employees || []);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

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

  // Enhanced fuel records with correct position data
  const enhancedFuelRecords = fuelRecords.map(record => {
    // For requesting party position
    let requestingPosition = record.position;
    if (!requestingPosition) {
      const requestingParty = requestingParties.find(
        party => party.full_name === record.requesting_party
      );
      requestingPosition = requestingParty ? requestingParty.position : 'N/A';
    }

    // For approve section position - find by approved_by name instead of withdrawn_by
    let approveSectionPosition = record.approve_section_position;
    if (!approveSectionPosition || approveSectionPosition === 'N/A') {
      const employee = employees.find(
        emp => emp.name === record.approved_by
      );
      approveSectionPosition = employee ? employee.position : 'N/A';
    }

    return {
      ...record,
      position: requestingPosition,
      approve_section_position: approveSectionPosition
    };
  });

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
        addNotification("Gasoline amount updated successfully!", "success");
        fetchFuelRecords();
      }
    } catch (error) {
      addNotification("Error updating gasoline amount: " + (error.response?.data?.message || error.message), "error");
      throw error;
    }
  };

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
        addNotification("Successfully Approved", "success");
        fetchFuelRecords();
      }
    } catch (error) {
      addNotification("Error approving fuel request: " + (error.response?.data?.message || error.message), "error");
    }
  };

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
        addNotification("Successfully Rejected", "success");
        fetchFuelRecords();
      }
    } catch (error) {
      addNotification("Error rejecting fuel request: " + (error.response?.data?.message || error.message), "error");
    }
  };

  const filteredFuelRecords = enhancedFuelRecords.filter(record =>
    record.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.requesting_party?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.office?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.approve_section_position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by status
  const statusFilteredRecords = statusFilter === 'all' 
    ? filteredFuelRecords 
    : filteredFuelRecords.filter(record => record.status === statusFilter);

  // Status options with colors and icons
  const statusOptions = [
    { value: 'all', label: 'All Requests', color: '#6b7280', bgColor: '#f3f4f6', textColor: '#6b7280' },
    { value: 'pending', label: 'Pending Only', color: '#f59e0b', bgColor: '#fef3c7', textColor: '#d97706' },
    { value: 'approved', label: 'Approved Only', color: '#10b981', bgColor: '#d1fae5', textColor: '#065f46' },
    { value: 'rejected', label: 'Rejected Only', color: '#ef4444', bgColor: '#fee2e2', textColor: '#dc2626' }
  ];

  const getCurrentStatusOption = () => {
    return statusOptions.find(option => option.value === statusFilter) || statusOptions[0];
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setIsDropdownOpen(false);
  };

  // Notification functions
  const addNotification = (message, type = "info") => {
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
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

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
      <GasSlipRequestNotifications 
        notifications={notifications}
        onRemoveNotification={removeNotification}
      />

      <main className="dashboard-content">
        <div className="fuel-tracking-container">
          {/* Modern Filters Section */}
          <div className="fuel-tracking-filters-modern">
            {/* Modern Search Bar */}
            <div className="search-container-modern">
              <div className="search-input-wrapper">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search by model, plate no, requesting party..."
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

            {/* Modern Status Filter Dropdown */}
            <div className="status-filter-modern">
              <div className="dropdown-container">
                <div 
                  className={`dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="selected-option">
                    <span 
                      className="status-dot"
                      style={{ backgroundColor: getCurrentStatusOption().color }}
                    ></span>
                    <span>{getCurrentStatusOption().label}</span>
                  </div>
                  <ChevronDown />
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {statusOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`dropdown-item ${statusFilter === option.value ? 'active' : ''}`}
                        onClick={() => handleStatusChange(option.value)}
                      >
                        <div className="option-content">
                          <span 
                            className="status-dot"
                            style={{ backgroundColor: option.color }}
                          ></span>
                          <span>{option.label}</span>
                        </div>
                        {statusFilter === option.value && (
                          <div className="check-indicator">
                            <CheckIcon />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <GasSlipRequestTable
            fuelRecords={statusFilteredRecords}
            isLoading={isLoading}
            searchTerm={searchTerm}
            statusFilter={statusFilter} 
            handleAcceptRecord={handleAcceptRecord}
            handleRejectRecord={handleRejectRecord}
            handleUpdateAmount={handleUpdateAmount}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default GasSlipRequest;