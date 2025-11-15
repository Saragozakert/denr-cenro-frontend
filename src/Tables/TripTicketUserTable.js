import React, { useState, useMemo } from "react";
import './../assets/Style/TableDesign/TripTicketUserTable.css';

function TripTicketUserTable({
    tripTickets = [],
    isLoading = false,
    searchTerm = "",
    handleEditTicket
}) {
    const [currentPage] = useState(1);
    const itemsPerPage = 5;

    // Format date utility function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Status badge classes
    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'trip-ticket-status-badge pending';
            case 'approved':
                return 'trip-ticket-status-badge approved';
            case 'declined':
                return 'trip-ticket-status-badge declined';
            case 'completed':
                return 'trip-ticket-status-badge completed';
            default:
                return 'trip-ticket-status-badge pending';
        }
    };

    // Status text
    const getStatusText = (status) => {
        if (!status) return 'Pending';
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    // Filter and sort trip tickets
    const processedTripTickets = useMemo(() => {
        let filtered = tripTickets.filter(ticket =>
            ticket.date_requested?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.date_submitted?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.fuel_amount?.toString().includes(searchTerm) ||
            ticket.fuel_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.status?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered;
    }, [tripTickets, searchTerm]);

    // Pagination
    const currentTripTickets = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedTripTickets.slice(startIndex, startIndex + itemsPerPage);
    }, [processedTripTickets, currentPage]);

    if (isLoading) {
        return (
            <div className="trip-ticket-table-loading">
                <div className="trip-ticket-table-spinner"></div>
                <p>Loading trip tickets...</p>
            </div>
        );
    }

    if (tripTickets.length === 0) {
        return (
            <div className="trip-ticket-table-empty">
                <svg className="trip-ticket-table-empty-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <h3>No Trip Tickets Found</h3>
                <p>No trip ticket records available yet.</p>
            </div>
        );
    }

    return (
        <div className="trip-ticket-table-container">
            <div className="trip-ticket-table-wrapper">
                <table className="trip-ticket-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date Requested</th>
                            <th>Fuel Amount</th>
                            <th>Type of Fuel</th>
                            <th>Status</th>
                            <th>Date Submitted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTripTickets.map((ticket, index) => (
                            <tr key={ticket.id}>
                                <td className="trip-ticket-table-number">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="trip-ticket-table-date-requested">
                                    {formatDate(ticket.date_requested)}
                                </td>
                                <td className="trip-ticket-table-fuel-amount">
                                    {ticket.fuel_amount ? `${ticket.fuel_amount} ` : 'N/A'}
                                </td>
                                <td className="trip-ticket-table-fuel-type">
                                    {ticket.fuel_type || 'N/A'}
                                </td>
                                <td className="trip-ticket-table-status">
                                    <span className={getStatusBadgeClass(ticket.status)}>
                                        {getStatusText(ticket.status)}
                                    </span>
                                </td>
                                 <td className="trip-ticket-table-date-submitted">
                                    {formatDate(ticket.date_submitted || ticket.created_at)}
                                </td>
                                <td className="trip-ticket-table-actions">
                                    <div className="trip-ticket-table-action-group">
                                        <button
                                            className="trip-ticket-table-action-btn trip-ticket-table-edit-btn"
                                            onClick={() => handleEditTicket && handleEditTicket(ticket)}
                                            title="Edit Trip Ticket"
                                        >
                                            <svg className="trip-ticket-table-icon-edit" viewBox="0 0 24 24">
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
        </div>
    );
}

export default TripTicketUserTable;