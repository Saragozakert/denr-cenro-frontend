import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import RequestingPartyTable from "../../Tables/RequestingPartyTable";
import AddRequestingParty from "../../Forms/AddRequestingParty";
import "../../assets/Style/AdminDesign/RequestingParty.css";

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

const AddUserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="16" y1="11" x2="22" y2="11"/>
  </svg>
);

function RequestingParty() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("requesting-party");
  const [searchTerm, setSearchTerm] = useState("");
  const [requestingParties, setRequestingParties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [showAddRequestingPartyForm, setShowAddRequestingPartyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    division: "",
    position: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
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
    fetchRequestingParties();
  }, [navigate]);

  const fetchRequestingParties = async () => {
    try {
      setIsLoading(true);
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
      setRequestingParties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    if (formErrors[id]) {
      setFormErrors(prevState => ({
        ...prevState,
        [id]: null
      }));
    }
  };

  const handleAddRequestingPartySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        "http://localhost:8000/api/admin/requesting-parties", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        setFormData({
          name: "",
          division: "",
          position: ""
        });
        setShowAddRequestingPartyForm(false);
        setFormErrors({});
        
        fetchRequestingParties();
        
        alert("Requesting party added successfully!");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        console.error("Error adding requesting party:", error);
        alert("Error adding requesting party. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequestingParty = async (partyId) => {
    if (window.confirm("Are you sure you want to delete this requesting party?")) {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.delete(
          `http://localhost:8000/api/admin/requesting-parties/${partyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.data.success) {
          alert("Requesting party deleted successfully!");
          fetchRequestingParties();
        }
      } catch (error) {
        console.error("Error deleting requesting party:", error);
        alert("Error deleting requesting party. Please try again.");
      }
    }
  };

  const handleMenuItemClick = (itemName, itemPath) => {
    setActiveItem(itemName);
    if (itemPath && itemPath !== "#") {
      navigate(itemPath);
    }
  };

  const handleAddRequestingParty = () => {
    setShowAddRequestingPartyForm(true);
  };

  const filteredRequestingParties = requestingParties.filter(party =>
    party.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    party.division_section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    party.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    party.id?.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar
      admin={admin}
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        <div className="user-management-container">
          {/* Modern Header Section */}
          <div className="management-header-modern">
            <div className="header-content">
              <div className="title-section">
                <h1 className="page-title">Requesting Parties</h1>
                <p className="page-subtitle">Manage department representatives and their information</p>
              </div>
              
              <div className="actions-section">
                {/* Modern Search Bar */}
                <div className="search-container-modern">
                  <div className="search-input-wrapper">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search by name, division, position..."
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

                {/* Modern Add Button */}
                <button 
                  className="add-party-btn-modern"
                  onClick={handleAddRequestingParty}
                >
                  <AddUserIcon />
                  <span>Add Party</span>
                </button>
              </div>
            </div>
          </div>

          <RequestingPartyTable
            requestingParties={filteredRequestingParties}
            fetchLoading={isLoading}
            searchTerm={searchTerm}
            handleDeleteRequestingParty={handleDeleteRequestingParty}
          />

          <AddRequestingParty
            showAddRequestingPartyForm={showAddRequestingPartyForm}
            setShowAddRequestingPartyForm={setShowAddRequestingPartyForm}
            formData={formData}
            handleInputChange={handleInputChange}
            handleAddRequestingPartySubmit={handleAddRequestingPartySubmit}
            formErrors={formErrors}
            loading={loading}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default RequestingParty;