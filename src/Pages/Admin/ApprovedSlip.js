import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from '../../components/Sidebars/AdminSidebar';
import AdminHeader from '../../components/Headers/AdminHeader';
import '../../assets/Style/AdminDesign/AdminDashboard.css';
// Import any additional CSS or components you need for ApprovedSlip

function ApprovedSlip() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("approved-slip"); // Set active item to match the menu
  const [searchTerm, setSearchTerm] = useState("");
  const [approvedSlips, setApprovedSlips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    fetchApprovedSlips(); // Fetch your approved slips data
  }, [navigate]);

  // Fetch approved slips from API
  const fetchApprovedSlips = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/approved-slips", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setApprovedSlips(response.data.approvedSlips || []);
      }
    } catch (error) {
      console.error("Error fetching approved slips:", error);
      setApprovedSlips([]);
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

  // Add any additional functions specific to ApprovedSlip
  const handleViewDetails = (slipId) => {
    // Handle viewing slip details
    console.log("View details for slip:", slipId);
  };

  const handlePrintSlip = (slipId) => {
    // Handle printing slip
    console.log("Print slip:", slipId);
  };

  // Filter approved slips based on search term
  const filteredApprovedSlips = approvedSlips.filter(slip =>
    slip.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.requesting_party?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.office?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.date?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar
      admin={admin}
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >
      <AdminHeader
        admin={admin}
        title="Approved Slips"
        subtitle="View and manage all approved fuel slips"
      />

      <main className="dashboard-content">
        
      </main>
    </AdminSidebar>
  );
}

export default ApprovedSlip;