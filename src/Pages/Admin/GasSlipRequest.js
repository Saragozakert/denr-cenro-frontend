import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from '../../components/Sidebars/AdminSidebar';
import AdminHeader from '../../components/Headers/AdminHeader';
import GasSlipRequestTable from '../../Tables/GasSlipRequestTable'; 
import '../../assets/Style/AdminDesign/GasSlipRequest.css';

function GasSlipRequest() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("fuel");
  const [searchTerm, setSearchTerm] = useState("");
  const [fuelRecords, setFuelRecords] = useState([]);
  const [requestingParties, setRequestingParties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('pending'); 
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

  // FIXED: Enhanced fuel records with correct position data
  const enhancedFuelRecords = fuelRecords.map(record => {
    // For requesting party position
    let requestingPosition = record.position;
    if (!requestingPosition) {
      const requestingParty = requestingParties.find(
        party => party.full_name === record.requesting_party
      );
      requestingPosition = requestingParty ? requestingParty.position : 'N/A';
    }

    // FIXED: For approve section position - find by approved_by name instead of withdrawn_by
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
        alert("Gasoline amount updated successfully!");
        fetchFuelRecords(); 
      }
    } catch (error) {
      alert("Error updating gasoline amount: " + (error.response?.data?.message || error.message));
      throw error; 
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

  const handleMenuItemClick = (itemName, itemPath) => {
    setActiveItem(itemName);
    if (itemPath && itemPath !== "#") {
      navigate(itemPath);
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
        alert("Fuel request approved successfully!");
        fetchFuelRecords();
      }
    } catch (error) {
      alert("Error approving fuel request: " + (error.response?.data?.message || error.message));
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
        alert("Fuel request rejected successfully!");
        fetchFuelRecords();
      }
    } catch (error) {
      alert("Error rejecting fuel request: " + (error.response?.data?.message || error.message));
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