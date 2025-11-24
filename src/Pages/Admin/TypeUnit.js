import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import TypeUnitTable from "../../Tables/TypeUnitTable";
import "./../../assets/Style/AdminDesign/TypeUnit.css";
import AddUnit from "../../Forms/AddUnit";
import EditUnit from "../../Forms/EditUnit";

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

const AddUnitIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 3H1V16H16V3Z"/>
    <path d="M16 8H20L23 11V16H16V8Z"/>
    <circle cx="5.5" cy="17.5" r="2.5"/>
    <circle cx="18.5" cy="17.5" r="2.5"/>
  </svg>
);

function TypeUnit() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("typeOfUnit");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUnitForm, setShowAddUnitForm] = useState(false);
  const [showEditUnitForm, setShowEditUnitForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    model: "",
    plate_code: "",
    assigned_to: "",
    office: ""
  });

  const [editFormData, setEditFormData] = useState({ 
    id: "",
    type: "",
    model: "",
    plate_code: "",
    assigned_to: "",
    office: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false); 

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
    fetchUnits();
  }, [navigate]);

  const handleEditUnit = (unit) => {
    setEditFormData({
      id: unit.id,
      type: unit.type,
      model: unit.model,
      plate_code: unit.plate_code,
      assigned_to: unit.assigned_to,
      office: unit.office
    });
    setShowEditUnitForm(true);
  };

  const handleEditInputChange = (e) => {
    const { id, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (editFormErrors[id]) {
      setEditFormErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleEditUnitSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditFormErrors({});

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `http://localhost:8000/api/admin/units/${editFormData.id}`,
        editFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Unit updated successfully!");
        setShowEditUnitForm(false);
        setEditFormData({
          id: "",
          type: "",
          model: "",
          plate_code: "",
          assigned_to: "",
          office: ""
        });
        fetchUnits(); 
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setEditFormErrors(err.response.data.errors);
      }
      alert(err.response?.data?.message || "Error updating unit");
    } finally {
      setEditLoading(false);
    }
  };
  

  const fetchUnits = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/units", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setUnits(response.data.units || []);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
      setUnits([]);
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleAddUnitSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post("http://localhost:8000/api/admin/units", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        alert("Unit created successfully!");
        setShowAddUnitForm(false);
        setFormData({
          type: "",
          model: "",
          plateCode: "",
          assignedTo: "",
          office: ""
        });
        fetchUnits(); 
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      }
      alert(err.response?.data?.message || "Error creating unit");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUnit = async (unitId) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.delete(`http://localhost:8000/api/admin/units/${unitId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.data.success) {
          alert("Unit deleted successfully!");
          fetchUnits();
        }
      } catch (error) {
        alert("Error deleting unit: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const filteredUnits = units.filter(unit =>
    unit.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.plate_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.assigned_to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar
      admin={admin}
      activeItem={activeItem}
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        <div className="type-unit-container">
          {/* Modern Header Section */}
          <div className="management-header-modern">
            <div className="header-content">
              <div className="title-section">
                <h1 className="page-title">Vehicle Units</h1>
                <p className="page-subtitle">Manage fleet vehicles and their assignments</p>
              </div>
              
              <div className="actions-section">
                {/* Modern Search Bar */}
                <div className="search-container-modern">
                  <div className="search-input-wrapper">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search by model, plate, assigned to..."
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

                {/* Modern Add Button with Purple Gradient */}
                <button 
                  className="add-unit-btn-modern"
                  onClick={() => setShowAddUnitForm(true)}
                >
                  <AddUnitIcon />
                  <span>Add Unit</span>
                </button>
              </div>
            </div>
          </div>

          <TypeUnitTable
            units={filteredUnits}
            isLoading={isLoading}
            searchTerm={searchTerm}
            handleDeleteUnit={handleDeleteUnit}
            handleEditUnit={handleEditUnit}
          />

          <AddUnit
            showAddUnitForm={showAddUnitForm}
            setShowAddUnitForm={setShowAddUnitForm}
            formData={formData}
            handleInputChange={handleInputChange}
            handleAddUnitSubmit={handleAddUnitSubmit}
            formErrors={formErrors}
            loading={loading}
          />

          <EditUnit
            showEditUnitForm={showEditUnitForm}
            setShowEditUnitForm={setShowEditUnitForm}
            formData={editFormData}
            handleInputChange={handleEditInputChange}
            handleEditUnitSubmit={handleEditUnitSubmit}
            formErrors={editFormErrors}
            loading={editLoading}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default TypeUnit;