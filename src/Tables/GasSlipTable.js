import '../assets/Style/TableDesign/GasSlipTable.css';
import GasSlipPrint from '../components/Print/GasSlipPrint';
import { formatDate, getStatusBadgeClass, getStatusText } from '../utils/GasSlipUtils';
import { useState, useMemo } from 'react';

function GasSlipTable({
    gasSlips = [],
    isLoading = false,
    searchTerm = "",
    handleEditSlip,
    handleViewSlip,
    handleDeclineSlip
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // fixed value (no setter needed)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

    // Filter and sort gas slips
    const processedGasSlips = useMemo(() => {
        let filtered = gasSlips.filter(slip =>
            slip.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.fuel_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.approved_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slip.status?.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [gasSlips, searchTerm, sortConfig]);

    // Pagination
    const currentGasSlips = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedGasSlips.slice(startIndex, startIndex + itemsPerPage);
    }, [processedGasSlips, currentPage]);

    const handleSort = (key) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
        setCurrentPage(1);
    };

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return <span>↕️</span>;
        return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
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
            <div className="gas-slip-table-wrapper">
                <table className="gas-slip-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')} className="gas-slip-table-sortable">
                                No. <SortIcon columnKey="id" />
                            </th>
                            <th onClick={() => handleSort('date_approved')} className="gas-slip-table-sortable">
                                Date Requested <SortIcon columnKey="date_approved" />
                            </th>
                            <th onClick={() => handleSort('model_name')} className="gas-slip-table-sortable">
                                Model/Unit Name <SortIcon columnKey="model_name" />
                            </th>
                            <th onClick={() => handleSort('plate_no')} className="gas-slip-table-sortable">
                                Plate No. <SortIcon columnKey="plate_no" />
                            </th>
                            {/*<th onClick={() => handleSort('requesting_party')} className="gas-slip-table-sortable">
                                Requesting Party <SortIcon columnKey="requesting_party" />
                            </th>*/}
                            <th onClick={() => handleSort('fuel_type')} className="gas-slip-table-sortable">
                                Type of Fuel <SortIcon columnKey="fuel_type" />
                            </th>
                            <th onClick={() => handleSort('gasoline_amount')} className="gas-slip-table-sortable">
                                Gasoline Amount <SortIcon columnKey="gasoline_amount" />
                            </th>
                            <th onClick={() => handleSort('approved_by')} className="gas-slip-table-sortable">
                                Approved By <SortIcon columnKey="approved_by" />
                            </th>
                            <th onClick={() => handleSort('status')} className="gas-slip-table-sortable">
                                Status <SortIcon columnKey="status" />
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGasSlips.map((slip, index) => (
                            <tr key={slip.id}>
                                <td className="gas-slip-table-number">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="gas-slip-table-date">
                                    {formatDate(slip.date_approved || slip.created_at)}
                                </td>
                                <td className="gas-slip-table-model">{slip.model_name}</td>
                                <td className="gas-slip-table-plate">{slip.plate_no}</td>
                                {/*<td className="gas-slip-table-requesting-party">{slip.requesting_party}</td>*/}
                                <td className="gas-slip-table-fuel-type">{slip.fuel_type}</td>
                                <td className="gas-slip-table-amount">{slip.gasoline_amount}</td>
                                <td className="gas-slip-table-approved">{slip.approved_by}</td>
                                <td className="gas-slip-table-status">
                                    <span className={getStatusBadgeClass(slip.status)}>
                                        {getStatusText(slip.status)}
                                    </span>
                                </td>
                              
                                <td className="gas-slip-table-actions">
                                    <div className="gas-slip-table-action-group">
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
                                                className="gas-slip-table-action-btn gas-slip-table-print-btn"
                                                onClick={() => handleViewWithPrint(slip)}
                                                title="Print Gas Slip"
                                            >
                                                <svg className="gas-slip-table-icon-print" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />
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

export default GasSlipTable;