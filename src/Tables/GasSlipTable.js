import '../assets/Style/TableDesign/GasSlipTable.css';
import GasSlipPrint from '../components/Print/GasSlipPrint';
import { formatDate, getStatusBadgeClass, getStatusText } from '../utils/GasSlipUtils';
import { useState } from 'react';

function GasSlipTable({
    gasSlips = [],
    isLoading = false,
    searchTerm = "",
    handleEditSlip,
    handleViewSlip,
    handleDeclineSlip
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState('');

    const handlePrintSlip = (slip) => {
        const { handlePrint } = GasSlipPrint({ slip });
        handlePrint();
    };

    const handleViewWithPrint = (slip) => {
        if (handleViewSlip) {
            handleViewSlip(slip);
        }
        handlePrintSlip(slip);
    };

    const openPurposeModal = (purpose) => {
        setSelectedPurpose(purpose);
        setIsModalOpen(true);
    };

    const closePurposeModal = () => {
        setIsModalOpen(false);
        setSelectedPurpose('');
    };

    // Function to truncate text for table display
    const truncateText = (text, maxLength = 80) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (isLoading) {
        return (
            <div className="gas-slip-table-loading">
                <div className="gas-slip-table-spinner"></div>
                <p>Loading gas slips...</p>
            </div>
        );
    }

    if (gasSlips.length === 0) {
        return (
            <div className="gas-slip-table-empty">
                <svg className="gas-slip-table-empty-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <h3>No Gas Slips Found</h3>
                <p>No gas slip records available yet.</p>
            </div>
        );
    }

    return (
        <div className="gas-slip-table-container">
            <table className="gas-slip-table">
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
                    {gasSlips.map((slip, index) => (
                        <tr key={slip.id}>
                            <td className="gas-slip-table-number">{index + 1}</td>
                            <td className="">{formatDate(slip.date_approved || slip.created_at)}</td>
                            <td className="gas-slip-table-model">{slip.model_name}</td>
                            <td className="gas-slip-table-plate">{slip.plate_no}</td>
                            <td className="gas-slip-table-section">{slip.section}</td>
                            <td className="gas-slip-table-office">{slip.office}</td>
                            <td className="gas-slip-table-purpose">
                                <div className="gas-slip-purpose-content">
                                    {slip.purpose ? (
                                        <>
                                            <div className="gas-slip-purpose-text">
                                                {slip.purpose}
                                            </div>
                                        </>
                                    ) : (
                                        <span className="gas-slip-purpose-empty">No purpose provided</span>
                                    )}
                                </div>
                            </td>
                            <td className="gas-slip-table-fuel-type">{slip.fuel_type}</td>
                            <td className="gas-slip-table-amount">{slip.gasoline_amount}</td>
                            <td className="gas-slip-table-withdrawn">{slip.withdrawn_by}</td>
                            <td className="gas-slip-table-approved">{slip.approved_by}</td>
                            <td className="gas-slip-table-status">
                                <span className={getStatusBadgeClass(slip.status)}>
                                    {getStatusText(slip.status)}
                                </span>
                            </td>
                            <td className="gas-slip-table-actions">
                                {slip.status === 'pending' ? (
                                    <button
                                        className="gas-slip-table-action-btn gas-slip-table-edit-btn"
                                        onClick={() => handleEditSlip && handleEditSlip(slip)}
                                        title="Edit Gas Slip"
                                    >
                                        <svg className="gas-slip-table-icon-edit" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        className="gas-slip-table-action-btn gas-slip-table-view-btn"
                                        onClick={() => handleViewWithPrint(slip)}
                                        title="View Gas Slip"
                                    >
                                        <svg className="gas-slip-table-icon-view" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                        </svg>
                                    </button>
                                )}
                                
                                {slip.status === 'pending' && (
                                    <button
                                        className="gas-slip-table-action-btn gas-slip-table-decline-btn"
                                        onClick={() => handleDeclineSlip && handleDeclineSlip(slip.id)}
                                        title="Decline Gas Slip"
                                    >
                                        <svg className="gas-slip-table-icon-decline" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                        </svg>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Purpose Modal */}
            {isModalOpen && (
                <div className="gas-slip-purpose-modal-overlay" onClick={closePurposeModal}>
                    <div className="gas-slip-purpose-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="gas-slip-purpose-modal-header">
                            <h3>Purpose Details</h3>
                            <button className="gas-slip-purpose-modal-close" onClick={closePurposeModal}>
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="gas-slip-purpose-modal-content">
                            <p>{selectedPurpose}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GasSlipTable;