import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import RequestingPartyTable from "../../Tables/RequestingPartyTable";
import AddRequestingParty from "../../Forms/AddRequestingParty";
import "../../assets/Style/AdminDesign/RequestingParty.css";

function RequestingParty() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("requesting-party");
  const [searchTerm, setSearchTerm] = useState("");
  const [requestingParties, setRequestingParties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for AddRequestingParty modal
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

  // Fetch requesting parties data
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

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors(prevState => ({
        ...prevState,
        [id]: null
      }));
    }
  };

  // Handle form submission
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
        // Reset form and close modal
        setFormData({
          name: "",
          division: "",
          position: ""
        });
        setShowAddRequestingPartyForm(false);
        setFormErrors({});
        
        // Refresh the requesting parties list
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

  // Handler for deleting a requesting party
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

  // Filter requesting parties based on search term
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
          <div className="management-header">
            <div className="search-container">
              <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12,7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search requesting parties by name, division, position, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button 
                    className="clear-search"
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
              className="register-user-btn"
              onClick={handleAddRequestingParty}
            >
              <span className="btn-icon">+</span>
              Add Requesting Party
            </button>
          </div>

          {/* Requesting Party Table Component */}
          <RequestingPartyTable
            requestingParties={filteredRequestingParties}
            fetchLoading={isLoading}
            searchTerm={searchTerm}
            handleDeleteRequestingParty={handleDeleteRequestingParty}
          />

          {/* Add Requesting Party Modal */}
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