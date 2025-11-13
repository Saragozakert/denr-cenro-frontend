import React, { useState, useMemo } from 'react';
import './../assets/Style/TableDesign/TripTicketAdminTable.css';

function TripTicketAdminTable({
  tripTickets = [],
  isLoading = false,
  searchTerm = "",
  handleEditTripTicket
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const processedTickets = useMemo(() => {
    let filtered = tripTickets.filter(ticket =>
      ticket.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.date_requested?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.date_submitted?.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [tripTickets, searchTerm, sortConfig]);

  const totalPages = Math.ceil(processedTickets.length / itemsPerPage);
  const currentTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedTickets.slice(startIndex, startIndex + itemsPerPage);
  }, [processedTickets, currentPage, itemsPerPage]);

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
      <div className="trip-ticket-admin-table-loading">
        <div className="trip-ticket-admin-table-spinner"></div>
        <p>Loading trip tickets...</p>
      </div>
    );
  }

  if (tripTickets.length === 0) {
    return (
      <div className="trip-ticket-admin-table-empty">
        <svg className="trip-ticket-admin-table-empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <h3>No Trip Tickets Found</h3>
        <p>Get started by adding your first trip ticket.</p>
      </div>
    );
  }

  return (
    <div className="trip-ticket-admin-table-container">
      <div className="trip-ticket-admin-table-wrapper">
        <table className="trip-ticket-admin-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="trip-ticket-admin-table-sortable">
                No. <SortIcon columnKey="id" />
              </th>
              <th onClick={() => handleSort('date_requested')} className="trip-ticket-admin-table-sortable">
                Date Requested <SortIcon columnKey="date_requested" />
              </th>
              <th onClick={() => handleSort('withdrawn_by')} className="trip-ticket-admin-table-sortable">
                Withdrawn By <SortIcon columnKey="withdrawn_by" />
              </th>
              <th onClick={() => handleSort('section')} className="trip-ticket-admin-table-sortable">
                Section <SortIcon columnKey="section" />
              </th>
              <th onClick={() => handleSort('status')} className="trip-ticket-admin-table-sortable">
                Status <SortIcon columnKey="status" />
              </th>
              <th onClick={() => handleSort('date_submitted')} className="trip-ticket-admin-table-sortable">
                Date Submitted <SortIcon columnKey="date_submitted" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket, index) => (
              <tr key={ticket.id}>
                <td className="trip-ticket-admin-table-number">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="trip-ticket-admin-table-date-requested">{ticket.date_requested}</td>
                <td className="trip-ticket-admin-table-withdrawn">{ticket.withdrawn_by}</td>
                <td className="trip-ticket-admin-table-section">{ticket.section}</td>
                <td className="trip-ticket-admin-table-status">
                  <span className={`trip-ticket-admin-status-badge ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="trip-ticket-admin-table-date-submitted">{ticket.date_submitted}</td>
                <td className="trip-ticket-admin-table-actions">
                  <div className="trip-ticket-admin-table-action-group">
                    <button
                      className="trip-ticket-admin-table-action-btn trip-ticket-admin-table-edit-btn"
                      onClick={() => handleEditTripTicket(ticket)}
                      aria-label="Edit trip ticket"
                    >
                      <svg className="trip-ticket-admin-table-icon-edit" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="trip-ticket-admin-table-footer">
        <div className="trip-ticket-admin-table-rows-info">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedTickets.length)} of {processedTickets.length} trip tickets
        </div>

        <div className="trip-ticket-admin-table-pagination">
          <button
            className={`trip-ticket-admin-table-pagination-btn ${currentPage === 1 ? 'trip-ticket-admin-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="trip-ticket-admin-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>

          <span className="trip-ticket-admin-table-pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            className={`trip-ticket-admin-table-pagination-btn ${currentPage === totalPages ? 'trip-ticket-admin-table-pagination-disabled' : ''}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg className="trip-ticket-admin-table-pagination-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripTicketAdminTable;