import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from '../../components/Sidebars/AdminSidebar';
import GasSlipRequestTable from '../../Tables/GasSlipRequestTable'; 
import GasSlipRequestNotifications from '../../components/Notifications/GasSlipRequestNotifications';
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
          <div className="fuel-tracking-filters">
            <div className="search-filter-container">
              <input
                type="text"
                placeholder="Search fuel records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="status-filter-container">
              <label htmlFor="status-filter">Filter by Status:</label>
              <select 
                id="status-filter"
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="status-filter-select"
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending Only</option>
                <option value="approved">Approved Only</option>
                <option value="rejected">Rejected Only</option>
              </select>
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