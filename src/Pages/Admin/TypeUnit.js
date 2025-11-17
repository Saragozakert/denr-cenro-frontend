import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";
import TypeUnitTable from "../../Tables/TypeUnitTable";
import AddUnit from "../../Forms/AddUnit";
import EditUnit from "../../Forms/EditUnit";
import "./../../assets/Style/AdminDesign/TypeUnit.css";

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
      <AdminHeader
        admin={admin}
        title="Type of Unit"
        subtitle="Manage different types of units in the system"
      />

      <main className="dashboard-content">
        <div className="type-unit-container">
          <div className="type-unit-management-header">
            <div className="type-unit-search-container">
              <div className="type-unit-search-box">
                <svg className="type-unit-search-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12,7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search units by model, plate code, assigned to, or office..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="type-unit-search-input"
                />
                {searchTerm && (
                  <button
                    className="type-unit-clear-search"
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
              className="type-unit-add-btn"
              onClick={() => setShowAddUnitForm(true)}
            >
              <span className="type-unit-btn-icon">+</span>
              Add Unit
            </button>
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
 
          <AddUnit
            showAddUnitForm={showAddUnitForm}
            setShowAddUnitForm={setShowAddUnitForm}
            formData={formData}
            handleInputChange={handleInputChange}
            handleAddUnitSubmit={handleAddUnitSubmit}
            formErrors={formErrors}
            loading={loading}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default TypeUnit;