import '../assets/Style/TableDesign/FuelTrackingTable.css';
import { useState, useMemo } from 'react';
import GasSlipPrint from '../components/Print/GasSlipPrint';

function FuelTrackingTable({
    fuelRecords = [],
    isLoading = false,
    searchTerm = "",
    statusFilter = "all",
    handleAcceptRecord,
    handleRejectRecord,
    handleUpdateAmount
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [editingId, setEditingId] = useState(null);
    const [editedAmount, setEditedAmount] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState('');

    // Filter and sort records
    const processedRecords = useMemo(() => {
        let filtered = fuelRecords.filter(record => {
            const matchesSearch =
                record.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.fuel_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.date?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

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
    }, [fuelRecords, searchTerm, sortConfig, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(processedRecords.length / itemsPerPage);
    const currentRecords = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedRecords.slice(startIndex, startIndex + itemsPerPage);
    }, [processedRecords, currentPage, itemsPerPage]);

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
        if (sortConfig.key !== columnKey) return <span>↕️</span>;
        return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
    };

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

    // Handle print function
    const handlePrint = (record) => {
        const { handlePrint } = GasSlipPrint({ slip: record });
        handlePrint();
    };

    if (isLoading) {
        return (
            <div className="fuel-tracking-table-loading">
                <div className="fuel-tracking-table-spinner"></div>
                <p>Loading fuel records...</p>
            </div>
        );
    }

    if (processedRecords.length === 0) {
        return (
            <div className="fuel-tracking-table-empty">
                <svg className="fuel-tracking-table-empty-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <h3>No Records Found</h3>
                <p>No fuel requests match your current filters.</p>
            </div>
        );
    }

    return (
        <div className="fuel-tracking-table-container">
            <div className="fuel-tracking-table-wrapper">
                <table className="fuel-tracking-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('date')} className="fuel-tracking-table-sortable">
                                Date Requested <SortIcon columnKey="date" />
                            </th>
                            <th onClick={() => handleSort('model_name')} className="fuel-tracking-table-sortable">
                                Model/Unit Name <SortIcon columnKey="model_name" />
                            </th>
                            <th onClick={() => handleSort('plate_no')} className="fuel-tracking-table-sortable">
                                Plate No. <SortIcon columnKey="plate_no" />
                            </th>
                            <th onClick={() => handleSort('section')} className="fuel-tracking-table-sortable">
                                Section <SortIcon columnKey="section" />
                            </th>
                            <th onClick={() => handleSort('fuel_type')} className="fuel-tracking-table-sortable">
                                Type of Fuel <SortIcon columnKey="fuel_type" />
                            </th>
                            <th onClick={() => handleSort('gasoline_amount')} className="fuel-tracking-table-sortable">
                                Gasoline Amount <SortIcon columnKey="gasoline_amount" />
                            </th>
                            <th onClick={() => handleSort('withdrawn_by')} className="fuel-tracking-table-sortable">
                                Withdrawn By <SortIcon columnKey="withdrawn_by" />
                            </th>
                            <th onClick={() => handleSort('status')} className="fuel-tracking-table-sortable">
                                Status <SortIcon columnKey="status" />
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {currentRecords.map((record, index) => (
                            <tr key={record.id}>
                                <td className="fuel-tracking-table-date highlight-date">
                                    {formatDate(record.date)}
                                </td>
                                <td className="fuel-tracking-table-model">{record.model_name}</td>
                                <td className="fuel-tracking-table-plate">{record.plate_no}</td>
                                <td className="fuel-tracking-table-section">{record.section}</td>
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
                                        </div>
                                    ) : (
                                        `${record.gasoline_amount}`
                                    )}
                                </td>
                                <td className="fuel-tracking-table-withdrawn">{record.withdrawn_by}</td>
                                <td className="fuel-tracking-table-status">
                                    <span className={getStatusBadgeClass(record.status)}>
                                        {getStatusText(record.status)}
                                    </span>
                                </td>
                                <td className="fuel-tracking-table-actions">
                                    <div className="fuel-tracking-table-action-group">
                                        {record.status === 'pending' ? (
                                            <>
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
                                            </>
                                        ) : record.status === 'approved' ? (
                                            // Show print button for approved records - using same design as GasSlipTable
                                            <button
                                                className="fuel-tracking-table-action-btn fuel-tracking-table-print-btn"
                                                onClick={() => handlePrint(record)}
                                                title="Print Gas Slip"
                                            >
                                                <svg className="fuel-tracking-table-icon-print" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />
                                                </svg>
                                            </button>
                                        ) : (
                                            // For rejected records, show no actions
                                            <span className="no-actions-available">
                                                No actions available
                                            </span>
                                        )}
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

export default FuelTrackingTable;