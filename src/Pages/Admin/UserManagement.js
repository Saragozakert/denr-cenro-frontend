import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import UserManagementTable from "../../Tables/UserManagementTable";
import "../../assets/Style/AdminDesign/UserManagement.css";
import RegisterUser from "../../Forms/RegisterUser";

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
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="20" y1="8" x2="20" y2="14"/>
    <line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

function UserManagement() {
  const [admin, setAdmin] = useState(null);
  const [activeItem, setActiveItem] = useState("userManagement");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    birthday: "",
    username: "",
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
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
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setFetchLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setFetchLoading(false);
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    try {
      await axios.post("http://localhost:8000/api/user/register", {
        full_name: formData.fullName,
        age: parseInt(formData.age),
        birthday: formData.birthday,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      alert("User created successfully!");
      setShowRegisterForm(false);
      setFormData({
        fullName: "",
        age: "",
        birthday: "",
        username: "",
        password: "",
        password_confirmation: ""
      });
      fetchUsers();
    } catch (err) {
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      }
      alert(err.response?.data?.message || "Error creating user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        alert("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        alert("Error deleting user: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:8000/api/admin/users/${userId}/status`, 
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? {...user, status: newStatus} : user
        )
      );
    } catch (error) {
      alert("Error updating user status: " + (error.response?.data?.message || error.message));
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="page-title">User Management</h1>
                <p className="page-subtitle">Manage system users and their access permissions</p>
              </div>
              
              <div className="actions-section">
                {/* Modern Search Bar */}
                <div className="search-container-modern">
                  <div className="search-input-wrapper">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search by name, username, status..."
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

                {/* Modern Register Button */}
                <button 
                  className="register-user-btn-modern"
                  onClick={() => setShowRegisterForm(true)}
                >
                  <AddUserIcon />
                  <span>Add User</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <UserManagementTable
              users={users}
              filteredUsers={filteredUsers}
              fetchLoading={fetchLoading}
              searchTerm={searchTerm}
              handleDeleteUser={handleDeleteUser}
              handleStatusChange={handleStatusChange}
            />
          </div>

          {/* Registration Form Modal */}
          <RegisterUser
            showRegisterForm={showRegisterForm}
            setShowRegisterForm={setShowRegisterForm}
            formData={formData}
            handleInputChange={handleInputChange}
            handleRegisterSubmit={handleRegisterSubmit}
            formErrors={formErrors}
            loading={loading}
          />
        </div>
      </main>
    </AdminSidebar>
  );
}

export default UserManagement;