import './../assets/Style/TableDesign/ConservativeTable.css';
import { useState, useMemo } from 'react';

function ApproveSectionTable({ 
  employees = [],
  isLoading = false,
  searchTerm = "",
  handleDeleteEmployee,
  handleEditEmployee
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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

  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span>↕️</span>;
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  if (isLoading) {
    return (
      <div className="conservative-table-loading">
        <div className="conservative-table-spinner"></div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="conservative-table-empty">
        <svg className="conservative-table-empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <h3>No Employees Found</h3>
        <p>Get started by adding your first employee.</p>
      </div>
    );
  }

  return (
    <div className="conservative-table-container">
      <div className="conservative-table-wrapper">
        <table className="conservative-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('employee_id')} className="conservative-table-sortable">
                ID No. <SortIcon columnKey="employee_id" />
              </th>
              <th onClick={() => handleSort('name')} className="conservative-table-sortable">
                Full Name <SortIcon columnKey="name" />
              </th>
              <th onClick={() => handleSort('department')} className="conservative-table-sortable">
                Division/Section <SortIcon columnKey="department" />
              </th>
              <th onClick={() => handleSort('position')} className="conservative-table-sortable">
                Position <SortIcon columnKey="position" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td className="conservative-table-id">{employee.employee_id}</td>
                <td className="conservative-table-name">{employee.name}</td>
                <td className="conservative-table-department">{employee.department}</td>
                <td className="conservative-table-position">{employee.position}</td>
                <td className="conservative-table-actions">
                  <div className="conservative-table-action-group">
                    <button
                      className="conservative-table-action-btn conservative-table-edit-btn"
                      onClick={() => handleEditEmployee(employee)}
                      aria-label="Edit employee"
                    >
                      <svg className="conservative-table-icon-edit" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>

                    <button
                      className="conservative-table-action-btn conservative-table-delete-btn"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      aria-label="Delete employee"
                    >
                      <svg className="conservative-table-icon-delete" viewBox="0 0 24 24">
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
      <div className="conservative-table-footer">
        <div className="conservative-table-rows-info">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedEmployees.length)} of {processedEmployees.length} employees
        </div>

        <div className="conservative-table-pagination-controls">
          
          <div className="conservative-table-pagination">
            <button
              className={`conservative-table-pagination-btn ${currentPage === 1 ? 'conservative-table-pagination-disabled' : ''}`}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg className="conservative-table-pagination-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
            </button>

            <span className="conservative-table-pagination-info">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              className={`conservative-table-pagination-btn ${currentPage === totalPages ? 'conservative-table-pagination-disabled' : ''}`}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg className="conservative-table-pagination-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveSectionTable;