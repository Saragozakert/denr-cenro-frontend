import React, { useState } from "react";
import './../assets/Style/TableDesign/UserManagementTable.css';

function UserManagementTable({ 
  users, 
  filteredUsers, 
  fetchLoading, 
  searchTerm, 
  handleDeleteUser, 
  handleStatusChange 
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const toggleDropdown = (userId) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  const handleStatusSelect = (userId, status) => {
    handleStatusChange(userId, status);
    setActiveDropdown(null);
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <h3>No Users Found</h3>
        <p>Get started by registering your first user.</p>
      </div>
    );
  }

  return (
    <div className="tb-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Birthday</th>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="number-cell">{index + 1}</td>
              <td className="name-cell">
                <div className="user-info-cell">
                  <div className="avatar-small">
                    {user.full_name.charAt(0)}
                  </div>
                  {user.full_name}
                </div>
              </td>
              <td className="age-cell">{user.age}</td>
              <td className="birthday-cell">{formatDate(user.birthday)}</td>
              <td className="username-cell">@{user.username}</td>
              <td className="password-cell">••••••••</td>
              <td>
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td className="actions-cell">
                <button className="action-btn edit-btn">
                  <svg className="icon-edit" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                  </svg>
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDeleteUser(user.id)}>
                  <svg className="icon-delete" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                </button>
                
                <button className="action-btn view-btn">
                  <svg className="icon-view" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                  </svg>
                </button>
                         
                <div className="dropdown-container">
                  <button 
                    className="dropdown-trigger"
                    onClick={() => toggleDropdown(user.id)}
                  >
                    <svg className="dropdown-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                    </svg>
                  </button>
                  
                  {activeDropdown === user.id && (
                    <div className="status-dropdown-menu">
                      <div 
                        className={`dropdown-item ${user.status === 'Active' ? 'active' : ''}`}
                        onClick={() => handleStatusSelect(user.id, 'Active')}
                      >
                        <div className="status-indicator active"></div>
                        <span>Active</span>
                        {user.status === 'Active' && (
                          <svg className="check-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                          </svg>
                        )}
                      </div>
                      
                      <div 
                        className={`dropdown-item ${user.status === 'Inactive' ? 'active' : ''}`}
                        onClick={() => handleStatusSelect(user.id, 'Inactive')}
                      >
                        <div className="status-indicator inactive"></div>
                        <span>Inactive</span>
                        {user.status === 'Inactive' && (
                          <svg className="check-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                          </svg>
                        )}
                      </div>
                      
                      <div 
                        className={`dropdown-item ${user.status === 'Suspended' ? 'active' : ''}`}
                        onClick={() => handleStatusSelect(user.id, 'Suspended')}
                      >
                        <div className="status-indicator suspended"></div>
                        <span>Suspended</span>
                        {user.status === 'Suspended' && (
                          <svg className="check-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="table-footer">
        <div className="rows-info">Showing {filteredUsers.length} of {users.length} users</div>
        <div className="pagination">
          <button className="pagination-btn disabled">
            <svg className="pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>
          <span className="pagination-page">Page 1 of 1</span>
          <button className="pagination-btn disabled">
            <svg className="pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserManagementTable;