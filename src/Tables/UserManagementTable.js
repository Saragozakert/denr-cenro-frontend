import React, { useState, useMemo } from "react";
import './../assets/Style/TableDesign/UserManagementTable.css';

function UserManagementTable({
  users,
  filteredUsers,
  fetchLoading,
  searchTerm,
  handleDeleteUser,
  handleStatusChange
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter and sort users - use filteredUsers instead of users for the actual data
  const processedUsers = useMemo(() => {
    let filtered = filteredUsers.filter(user =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [filteredUsers, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);
  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [processedUsers, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  // eslint-disable-next-line no-unused-vars
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

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

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span>↕️</span>;
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  if (fetchLoading) {
    return (
      <div className="user-management-table-loading">
        <div className="user-management-table-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="user-management-table-empty">
        <svg className="user-management-table-empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <h3>No Users Found</h3>
        <p>Get started by registering your first user.</p>
      </div>
    );
  }

  return (
    <div className="user-management-table-container">

      {/* Table Controls 
      <div className="user-management-table-controls">
        <div className="user-management-table-results">
          Showing {Math.min(processedUsers.length, currentPage * itemsPerPage)} of {processedUsers.length} users
        </div>
        <div className="user-management-table-items-per-page">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="user-management-table-select"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>*/}

      <div className="user-management-table-wrapper">
        <table className="user-management-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="user-management-table-sortable">
                No. <SortIcon columnKey="id" />
              </th>
              <th onClick={() => handleSort('full_name')} className="user-management-table-sortable">
                Full Name <SortIcon columnKey="full_name" />
              </th>
              <th onClick={() => handleSort('age')} className="user-management-table-sortable">
                Age <SortIcon columnKey="age" />
              </th>
              <th onClick={() => handleSort('birthday')} className="user-management-table-sortable">
                Birthday <SortIcon columnKey="birthday" />
              </th>
              <th onClick={() => handleSort('username')} className="user-management-table-sortable">
                Username <SortIcon columnKey="username" />
              </th>
              {/*<th>Password</th>*/}
              <th onClick={() => handleSort('status')} className="user-management-table-sortable">
                Status <SortIcon columnKey="status" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="user-management-table-number">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="user-management-table-name">
                  <div className="user-management-table-user-info">
                    <div className="user-management-table-avatar">
                      {user.full_name.charAt(0)}
                    </div>
                    {user.full_name}
                  </div>
                </td>
                <td className="user-management-table-age">{user.age}</td>
                <td className="user-management-table-birthday">{formatDate(user.birthday)}</td>
                <td className="user-management-table-username">@{user.username}</td>
                {/*<td className="user-management-table-password">••••••••</td>*/}
                <td>
                  <span className={`user-management-table-status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td className="user-management-table-actions">
                  <div className="user-management-table-action-group">
                    <button className="user-management-table-action-btn user-management-table-edit-btn">
                      <svg className="user-management-table-icon-edit" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>

                    <button
                      className="user-management-table-action-btn user-management-table-delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <svg className="user-management-table-icon-delete" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                    </button>

                    <div className="user-management-table-dropdown-container">
                      <button
                        className="user-management-table-dropdown-trigger"
                        onClick={() => toggleDropdown(user.id)}
                      >
                        <svg className="user-management-table-dropdown-icon" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                        </svg>
                      </button>

                      {activeDropdown === user.id && (
                        <div className="user-management-table-status-dropdown-menu">
                          <div
                            className={`user-management-table-dropdown-item ${user.status === 'Active' ? 'active' : ''}`}
                            onClick={() => handleStatusSelect(user.id, 'Active')}
                          >
                            <div className="user-management-table-status-indicator active"></div>
                            <span>Active</span>
                            {user.status === 'Active' && (
                              <svg className="user-management-table-check-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                              </svg>
                            )}
                          </div>

                          <div
                            className={`user-management-table-dropdown-item ${user.status === 'Inactive' ? 'active' : ''}`}
                            onClick={() => handleStatusSelect(user.id, 'Inactive')}
                          >
                            <div className="user-management-table-status-indicator inactive"></div>
                            <span>Inactive</span>
                            {user.status === 'Inactive' && (
                              <svg className="user-management-table-check-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                              </svg>
                            )}
                          </div>

                          <div
                            className={`user-management-table-dropdown-item ${user.status === 'Suspended' ? 'active' : ''}`}
                            onClick={() => handleStatusSelect(user.id, 'Suspended')}
                          >
                            <div className="user-management-table-status-indicator suspended"></div>
                            <span>Suspended</span>
                            {user.status === 'Suspended' && (
                              <svg className="user-management-table-check-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="user-management-table-footer">
        <div className="user-management-table-rows-info">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedUsers.length)} of {processedUsers.length} users
        </div>

        <div className="user-management-table-pagination">
          <button
            className={`user-management-table-pagination-btn ${currentPage === 1 ? 'user-management-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="user-management-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>

          <span className="user-management-table-pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            className={`user-management-table-pagination-btn ${currentPage === totalPages ? 'user-management-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg className="user-management-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserManagementTable;
