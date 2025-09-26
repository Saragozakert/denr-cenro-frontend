import './../assets/Style/TableDesign/TypeUnitTable.css';
import { useState, useMemo } from 'react';

function TypeUnitTable({
  units = [],
  isLoading = false,
  searchTerm = "",
  handleDeleteUnit,
  handleEditUnit
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Fixed value instead of state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filter and sort units
  const processedUnits = useMemo(() => {
    let filtered = units.filter(unit =>
      unit.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.plate_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.assigned_to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.office?.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [units, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(processedUnits.length / itemsPerPage);
  const currentUnits = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedUnits.slice(startIndex, startIndex + itemsPerPage);
  }, [processedUnits, currentPage, itemsPerPage]);

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
      <div className="type-unit-table-loading">
        <div className="type-unit-table-spinner"></div>
        <p>Loading units...</p>
      </div>
    );
  }

  if (units.length === 0) {
    return (
      <div className="type-unit-table-empty">
        <svg className="type-unit-table-empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <h3>No Units Found</h3>
        <p>Get started by adding your first unit.</p>
      </div>
    );
  }

  return (
    <div className="type-unit-table-container">
      <div className="type-unit-table-wrapper">
        <table className="type-unit-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="type-unit-table-sortable">
                No. <SortIcon columnKey="id" />
              </th>
              <th onClick={() => handleSort('type')} className="type-unit-table-sortable">
                Type of Vehicle <SortIcon columnKey="type" />
              </th>
              <th onClick={() => handleSort('model')} className="type-unit-table-sortable">
                Model/Unit Name <SortIcon columnKey="model" />
              </th>
              <th onClick={() => handleSort('plate_code')} className="type-unit-table-sortable">
                Plate/Unit Code <SortIcon columnKey="plate_code" />
              </th>
              <th onClick={() => handleSort('assigned_to')} className="type-unit-table-sortable">
                Assigned To <SortIcon columnKey="assigned_to" />
              </th>
              <th onClick={() => handleSort('office')} className="type-unit-table-sortable">
                Office/Station <SortIcon columnKey="office" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUnits.map((unit, index) => (
              <tr key={unit.id}>
                <td className="type-unit-table-number">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="type-unit-table-type">{unit.type}</td>
                <td className="type-unit-table-model">{unit.model}</td>
                <td className="type-unit-table-plate">{unit.plate_code}</td>
                <td className="type-unit-table-assigned">{unit.assigned_to}</td>
                <td className="type-unit-table-office">{unit.office}</td>

                <td className="type-unit-table-actions">
                  <div className="type-unit-table-action-group">
                    <button
                      className="type-unit-table-action-btn type-unit-table-edit-btn"
                      onClick={() => handleEditUnit(unit)}
                      aria-label="Edit unit"
                    >
                      <svg className="type-unit-table-icon-edit" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>

                    <button
                      className="type-unit-table-action-btn type-unit-table-delete-btn"
                      onClick={() => handleDeleteUnit(unit.id)}
                      aria-label="Delete unit"
                    >
                      <svg className="type-unit-table-icon-delete" viewBox="0 0 24 24">
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
      <div className="type-unit-table-footer">
        <div className="type-unit-table-rows-info">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedUnits.length)} of {processedUnits.length} units
        </div>

        <div className="type-unit-table-pagination">
          <button
            className={`type-unit-table-pagination-btn ${currentPage === 1 ? 'type-unit-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="type-unit-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>

          <span className="type-unit-table-pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            className={`type-unit-table-pagination-btn ${currentPage === totalPages ? 'type-unit-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg className="type-unit-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TypeUnitTable;