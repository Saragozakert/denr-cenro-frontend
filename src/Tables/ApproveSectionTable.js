import './../assets/Style/TableDesign/ApproveSectionTable.css';
import { useState, useMemo } from 'react';

function ApproveSectionTable({
  employees = [],
  isLoading = false,
  searchTerm = "",
  handleDeleteEmployee,
  handleEditEmployee
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const processedEmployees = useMemo(() => {
    let filtered = employees.filter(employee =>
      employee.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [employees, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(processedEmployees.length / itemsPerPage);
  const currentEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [processedEmployees, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span>↓</span>;
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  if (isLoading) {
    return (
      <div className="approve-section-table-loading">
        <div className="modern-spinner"></div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="approve-section-table-empty">
        <svg className="approve-section-table-empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <h3>No Employees Found</h3>
        <p>Get started by adding your first employee.</p>
      </div>
    );
  }

  return (
    <div className="approve-section-table-container">
      <div className="approve-section-table-wrapper">
        <table className="approve-section-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('no')} className="approve-section-table-sortable">
                No. <SortIcon columnKey="no" />
              </th>
              <th onClick={() => handleSort('employee_id')} className="approve-section-table-sortable">
                ID Number <SortIcon columnKey="employee_id" />
              </th>
              <th onClick={() => handleSort('name')} className="approve-section-table-sortable">
                Full Name <SortIcon columnKey="name" />
              </th>
              <th onClick={() => handleSort('department')} className="approve-section-table-sortable">
                Division/Section <SortIcon columnKey="department" />
              </th>
              <th onClick={() => handleSort('position')} className="approve-section-table-sortable">
                Position <SortIcon columnKey="position" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td className="approve-section-table-number">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="approve-section-table-id">
                  <span className="approve-section-table-id-badge">{employee.employee_id}</span>
                </td>
                <td className="approve-section-table-name">
                  <div className="approve-section-table-user-info">{employee.name}</div>
                </td>
                <td className="approve-section-table-department">{employee.department}</td>
                <td className="approve-section-table-position">{employee.position}</td>
                <td className="approve-section-table-actions">
                  <div className="approve-section-table-action-group">
                    <button
                      className="approve-section-table-action-btn approve-section-table-edit-btn"
                      onClick={() => handleEditEmployee(employee)}
                      title="Edit employee"
                    >
                      <svg className="approve-section-table-icon-edit" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>

                    <button
                      className="approve-section-table-action-btn approve-section-table-delete-btn"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      title="Delete employee"
                    >
                      <svg className="approve-section-table-icon-delete" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="approve-section-table-footer">
        <div className="approve-section-table-rows-info">
          Showing {processedEmployees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, processedEmployees.length)} of {processedEmployees.length} employees
        </div>

        <div className="approve-section-table-pagination">
          <button
            className={`approve-section-table-pagination-btn ${currentPage === 1 ? 'approve-section-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="approve-section-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>

          <span className="approve-section-table-pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong>
          </span>

          <button
            className={`approve-section-table-pagination-btn ${currentPage === totalPages || totalPages === 0 ? 'approve-section-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <svg className="approve-section-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApproveSectionTable;