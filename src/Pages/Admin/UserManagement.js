import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import AdminHeader from "../../components/Headers/AdminHeader";
import UserManagementTable from "../../Tables/UserManagementTable";
import RegisterUser from "../../Forms/RegisterUser";
import "../../assets/Style/AdminDesign/UserManagement.css";

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
      <AdminHeader 
        admin={admin} 
        title="User Management"
        subtitle="Manage user accounts, permissions, and status"
      />
      
      <main className="dashboard-content">
        <div className="user-management-container">
          <div className="management-header">
            <div className="search-container">
              <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search users by name, username, or status..."
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
              onClick={() => setShowRegisterForm(true)}
            >
              <span className="btn-icon">+</span>
              Register User
            </button>
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