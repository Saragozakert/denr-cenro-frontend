import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from '../../components/Sidebars/AdminSidebar';
import GasSlipRequestTable from '../../Tables/GasSlipRequestTable'; 
import GasSlipRequestNotifications from '../../components/Notifications/GasSlipRequestNotifications';
import { SearchIcon, ChevronDownIcon, CheckIcon, ClearIcon } from '../../components/icons/FilterIcons';
import { useDropdown } from "../../hooks/useDropdown";
import { STATUS_COLORS, STATUS_DISPLAY_TEXTS } from "../../constants/GasSlipRequestConstants";
import '../../assets/Style/AdminDesign/GasSlipRequest.css';
import { useAdminAuth } from "../../hooks/AdminDashboardHooks";
import { 
  useGasSlipRequestData, 
  useFuelRecordActions, 
  useGasSlipRequestFilters, 
  useNotifications 
} from "../../hooks/GasSlipRequestHooks";
import { NavigationUtils, DataEnhancementUtils } from "../../utils/GasSlipRequestUtils";

function GasSlipRequest() {
  const [activeItem, setActiveItem] = useState("fuel");
  const navigate = useNavigate();
  
  // Custom hooks
  const { admin } = useAdminAuth();
  const { 
    isDropdownOpen,
    dropdownRef,
    toggleDropdown,
    closeDropdown
  } = useDropdown();
  
  const { 
    fuelRecords, 
    requestingParties, 
    employees, 
    isLoading, 
    fetchAllData, 
    refetchFuelRecords 
  } = useGasSlipRequestData();
  
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter } = useGasSlipRequestFilters();
  const { notifications, addNotification, removeNotification } = useNotifications();
  const { handleUpdateAmount, handleAcceptRecord, handleRejectRecord } = useFuelRecordActions(refetchFuelRecords, addNotification);

  // Navigation
  const handleMenuItemClick = NavigationUtils.handleMenuItemClick(setActiveItem, navigate);

  useEffect(() => {
    if (admin) {
      fetchAllData();
    }
  }, [admin, fetchAllData]);

  // Data processing
  const enhancedFuelRecords = DataEnhancementUtils.enhanceFuelRecords(fuelRecords, requestingParties, employees);
  const filteredFuelRecords = DataEnhancementUtils.filterFuelRecords(enhancedFuelRecords, searchTerm, statusFilter);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    closeDropdown();
  };

  const getStatusDisplayText = () => STATUS_DISPLAY_TEXTS[statusFilter] || 'All Requests';
  const getStatusColor = (status) => STATUS_COLORS[status] || '#6b7280';

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
          <div className="fuel-tracking-filters-modern">
            {/* Search Bar */}
            <div className="search-container-modern">
              <div className="search-input-wrapper">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search fuel records by vehicle, plate, requester..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input-modern"
                />
                {searchTerm && (
                  <button 
                    className="clear-search-btn"
                    onClick={() => setSearchTerm('')}
                  >
                    <ClearIcon />
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter Dropdown */}
            <div className="status-filter-modern" ref={dropdownRef}>
              <div className="dropdown-container">
                <button 
                  className={`dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                  onClick={toggleDropdown}
                >
                  <span className="selected-option">
                    <span 
                      className="status-dot"
                      style={{ backgroundColor: getStatusColor(statusFilter) }}
                    ></span>
                    {getStatusDisplayText()}
                  </span>
                  <ChevronDownIcon />
                </button>
                
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {Object.entries(STATUS_DISPLAY_TEXTS).map(([status, displayText]) => (
                      <div 
                        key={status}
                        className={`dropdown-item ${statusFilter === status ? 'active' : ''}`}
                        onClick={() => handleStatusChange(status)}
                      >
                        <span className="option-content">
                          <span 
                            className="status-dot" 
                            style={{ backgroundColor: getStatusColor(status) }}
                          ></span>
                          {displayText}
                        </span>
                        {statusFilter === status && (
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
            fuelRecords={filteredFuelRecords}
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