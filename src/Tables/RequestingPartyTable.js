import React, { useState, useMemo, forwardRef } from "react";
import './../assets/Style/TableDesign/RequestingPartyTable.css';

function RequestingPartyTable({
  requestingParties,
  fetchLoading,
  searchTerm,
  handleDeleteRequestingParty
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const processedRequestingParties = useMemo(() => {
    let filtered = requestingParties.filter(party =>
      party.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.division_section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.position?.toLowerCase().includes(searchTerm.toLowerCase())
    );


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
  }, [requestingParties, searchTerm, sortConfig]);

 
  const totalPages = Math.ceil(processedRequestingParties.length / itemsPerPage);
  const currentRequestingParties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedRequestingParties.slice(startIndex, startIndex + itemsPerPage);
  }, [processedRequestingParties, currentPage, itemsPerPage]);

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

  if (fetchLoading) {
    return (
      <div className="requesting-party-table-loading">
        <div className="requesting-party-table-spinner"></div>
        <p>Loading requesting parties...</p>
      </div>
    );
  }

  if (requestingParties.length === 0) {
    return (
      <div className="requesting-party-table-empty">
        <svg className="requesting-party-table-empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <h3>No Requesting Parties Found</h3>
        <p>Get started by adding your first requesting party.</p>
      </div>
    );
  }

  return (
    <div className="requesting-party-table-container">
      <div className="requesting-party-table-wrapper">
        <table className="requesting-party-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="requesting-party-table-sortable">
                No. <SortIcon columnKey="id" />
              </th>
              <th onClick={() => handleSort('full_name')} className="requesting-party-table-sortable">
                Full Name <SortIcon columnKey="full_name" />
              </th>
              <th onClick={() => handleSort('division_section')} className="requesting-party-table-sortable">
                Division/Section <SortIcon columnKey="division_section" />
              </th>
              <th onClick={() => handleSort('position')} className="requesting-party-table-sortable">
                Position <SortIcon columnKey="position" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequestingParties.map((party, index) => (
              <tr key={party.id}>
                <td className="requesting-party-table-number">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="requesting-party-table-name">
                  <div className="requesting-party-table-user-info">
                    {party.full_name}
                  </div>
                </td>
                <td className="requesting-party-table-division">{party.division_section}</td>
                <td className="requesting-party-table-position">{party.position}</td>
                <td className="requesting-party-table-actions">
                  <div className="requesting-party-table-action-group">
                    <button className="requesting-party-table-action-btn requesting-party-table-edit-btn">
                      <svg className="requesting-party-table-icon-edit" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>

                    <button
                      className="requesting-party-table-action-btn requesting-party-table-delete-btn"
                      onClick={() => handleDeleteRequestingParty(party.id)}
                    >
                      <svg className="requesting-party-table-icon-delete" viewBox="0 0 24 24">
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

      <div className="requesting-party-table-footer">
        <div className="requesting-party-table-rows-info">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedRequestingParties.length)} of {processedRequestingParties.length} requesting parties
        </div>

        <div className="requesting-party-table-pagination">
          <button
            className={`requesting-party-table-pagination-btn ${currentPage === 1 ? 'requesting-party-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="requesting-party-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>

          <span className="requesting-party-table-pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            className={`requesting-party-table-pagination-btn ${currentPage === totalPages ? 'requesting-party-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg className="requesting-party-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestingPartyTable;