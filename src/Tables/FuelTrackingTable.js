import '../assets/Style/TableDesign/FuelTrackingTable.css';
import { useState } from 'react';

function FuelTrackingTable({
    fuelRecords = [],
    isLoading = false,
    searchTerm = "",
    handleAcceptRecord,
    handleRejectRecord,
    handleUpdateAmount 
}) {

    const [editingId, setEditingId] = useState(null);
    const [editedAmount, setEditedAmount] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        
        try {
            if (dateString.includes('T')) {
                const date = new Date(dateString);
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const year = date.getFullYear();
                return `${month}-${day}-${year}`;
            }
            return dateString; 
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString; 
        }
    };

    const openPurposeModal = (purpose) => {
        setSelectedPurpose(purpose);
        setIsModalOpen(true);
    };

    const closePurposeModal = () => {
        setIsModalOpen(false);
        setSelectedPurpose('');
    };

    const handleEditStart = (record) => {
        setEditingId(record.id);
        setEditedAmount(record.gasoline_amount);
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditedAmount('');
    };

    const handleAmountUpdate = async (recordId) => {
        if (!editedAmount || isNaN(editedAmount) || parseFloat(editedAmount) <= 0) {
            alert('Please enter a valid gasoline amount');
            return;
        }

        setIsUpdating(true);
        try {
            await handleUpdateAmount(recordId, parseFloat(editedAmount));
            setEditingId(null);
            setEditedAmount('');
        } catch (error) {
            console.error('Error updating amount:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const pendingRecords = fuelRecords.filter(record => record.status === 'pending');

    if (isLoading) {
        return (
            <div className="fuel-tracking-table-loading">
                <div className="fuel-tracking-table-spinner"></div>
                <p>Loading fuel records...</p>
            </div>
        );
    }

    if (pendingRecords.length === 0) {
        return (
            <div className="fuel-tracking-table-empty">
                <svg className="fuel-tracking-table-empty-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <h3>No Pending Fuel Requests</h3>
                <p>All fuel requests have been processed or there are no pending requests.</p>
            </div>
        );
    }

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'approved':
                return 'fuel-tracking-status-badge approved';
            case 'rejected':
                return 'fuel-tracking-status-badge rejected';
            default:
                return 'fuel-tracking-status-badge pending';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Approved';
            case 'rejected':
                return 'Rejected';
            default:
                return 'Pending';
        }
    };

    return (
        <div className="fuel-tracking-table-container">
            <table className="fuel-tracking-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Date Requested</th>
                        <th>Model/Unit Name</th>
                        <th>Plate No.</th>
                        <th>Section</th>
                        <th>Office</th>
                        <th>Purpose</th>
                        <th>Type of Fuel</th>
                        <th>Gasoline Amount</th>
                        <th>Withdrawn By</th>
                        <th>Approved By</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingRecords.map((record, index) => (
                        <tr key={record.id}>
                            <td className="fuel-tracking-table-number">{index + 1}</td>
                            <td className="fuel-tracking-table-date highlight-date">
                                {formatDate(record.date)}
                            </td>
                            <td className="fuel-tracking-table-model">{record.model_name}</td>
                            <td className="fuel-tracking-table-plate">{record.plate_no}</td>
                            <td className="fuel-tracking-table-section">{record.section}</td>
                            <td className="fuel-tracking-table-office">{record.office}</td>
                            <td className="fuel-tracking-table-purpose">
                                <div className="fuel-tracking-purpose-content">
                                    {record.purpose ? (
                                        <>
                                            <div className="fuel-tracking-purpose-text">
                                                {record.purpose}
                                            </div>
                                        </>
                                    ) : (
                                        <span className="fuel-tracking-purpose-empty">No purpose provided</span>
                                    )}
                                </div>
                            </td>
                            <td className="fuel-tracking-table-fuel-type">{record.fuel_type}</td>
                            <td className="fuel-tracking-table-amount">
                                {editingId === record.id ? (
                                    <div className="amount-edit-container">
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={editedAmount}
                                            onChange={(e) => setEditedAmount(e.target.value)}
                                            className="amount-edit-input"
                                            disabled={isUpdating}
                                        />
                                        <span>L</span>
                                    </div>
                                ) : (
                                    `${record.gasoline_amount} L`
                                )}
                            </td>
                            <td className="fuel-tracking-table-withdrawn">{record.withdrawn_by}</td>
                            <td className="fuel-tracking-table-approved">{record.approved_by}</td>
                            <td className="fuel-tracking-table-status">
                                <span className={getStatusBadgeClass(record.status)}>
                                    {getStatusText(record.status)}
                                </span>
                            </td>
                            <td className="fuel-tracking-table-actions">
                                {editingId === record.id ? (
                                    <>
                                        <button
                                            className="fuel-tracking-table-action-btn fuel-tracking-table-save-btn"
                                            onClick={() => handleAmountUpdate(record.id)}
                                            disabled={isUpdating}
                                            title="Save Amount"
                                        >
                                            <svg className="fuel-tracking-table-icon-save" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="fuel-tracking-table-action-btn fuel-tracking-table-cancel-btn"
                                            onClick={handleEditCancel}
                                            disabled={isUpdating}
                                            title="Cancel Edit"
                                        >
                                            <svg className="fuel-tracking-table-icon-cancel" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="fuel-tracking-table-action-btn fuel-tracking-table-edit-btn"
                                            onClick={() => handleEditStart(record)}
                                            title="Edit Amount"
                                        >
                                            <svg className="fuel-tracking-table-icon-edit" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="fuel-tracking-table-action-btn fuel-tracking-table-accept-btn"
                                            onClick={() => handleAcceptRecord && handleAcceptRecord(record.id)}
                                            title="Accept Request"
                                        >
                                            <svg className="fuel-tracking-table-icon-accept" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="fuel-tracking-table-action-btn fuel-tracking-table-reject-btn"
                                            onClick={() => handleRejectRecord && handleRejectRecord(record.id)}
                                            title="Reject Request"
                                        >
                                            <svg className="fuel-tracking-table-icon-reject" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Purpose Modal */}
            {isModalOpen && (
                <div className="fuel-tracking-purpose-modal-overlay" onClick={closePurposeModal}>
                    <div className="fuel-tracking-purpose-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="fuel-tracking-purpose-modal-header">
                            <h3>Purpose Details</h3>
                            <button className="fuel-tracking-purpose-modal-close" onClick={closePurposeModal}>
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="fuel-tracking-purpose-modal-content">
                            <p>{selectedPurpose}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FuelTrackingTable;