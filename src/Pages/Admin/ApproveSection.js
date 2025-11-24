import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import "../../assets/Style/AdminDesign/ApproveSection.css";
import ApproveSectionTable from "../../Tables/ApproveSectionTable";
import AddEmployee from "../../Forms/AddEmployee";

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

const AddEmployeeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="20" y1="8" x2="20" y2="14"/>
    <line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

function ApproveSection() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("approve");
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
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
    fetchEmployees();
  }, [navigate]);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
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
      setEmployees([]);
    } finally {
      setIsLoading(false);
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

  const handleAddEmployeeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post("http://localhost:8000/api/admin/employees", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        alert("Employee created successfully!");
        setShowAddEmployeeForm(false);
        setFormData({
          name: "",
          department: "",
          position: ""
        });
        fetchEmployees(); 
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      }
      alert(err.response?.data?.message || "Error creating employee");
    } finally {
      setLoading(false);
    }
  };

  const handleMenuItemClick = (itemName, itemPath) => {
    setActiveItem(itemName);
    if (itemPath && itemPath !== "#") {
      navigate(itemPath);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar 
      admin={admin} 
      activeItem={activeItem}   
      onMenuItemClick={handleMenuItemClick}
    >
      <main className="dashboard-content">
        <div className="conservative-container">
          {/* Modern Header Section */}
          <div className="management-header-modern">
            <div className="header-content">
              <div className="title-section">
                <h1 className="page-title">Approval Section</h1>
                <p className="page-subtitle">Manage employees with approval authority</p>
              </div>
              
              <div className="actions-section">
                {/* Modern Search Bar */}
                <div className="search-container-modern">
                  <div className="search-input-wrapper">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search by name, department, role..."
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
                  className="add-employee-btn-modern"
                  onClick={() => setShowAddEmployeeForm(true)}
                >
                  <AddEmployeeIcon />
                  <span>Add Employee</span>
                </button>
              </div>
            </div>
          </div>

          <ApproveSectionTable 
            employees={filteredEmployees}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />

          <AddEmployee
            showAddEmployeeForm={showAddEmployeeForm}
            setShowAddEmployeeForm={setShowAddEmployeeForm}
            formData={formData}
            handleInputChange={handleInputChange}
            handleAddEmployeeSubmit={handleAddEmployeeSubmit}
            formErrors={formErrors}
            loading={loading}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default ApproveSection;