import '../assets/Style/TableDesign/GasSlipTable.css';
import GasSlipPrint from '../components/Print/GasSlipPrint';
import TripTicketForm from '../Forms/TripTicketForm';
import { formatDate, getStatusBadgeClass, getStatusText } from '../utils/GasSlipUtils';
import { useState, useMemo } from 'react';
import axios from 'axios';

function GasSlipTable({
    gasSlips = [],
    isLoading = false,
    searchTerm = "",
    handleEditSlip,
    handleViewSlip,
    handleDeclineSlip,
    onTripTicketSubmitted // ADD THIS PROP
}) {
    const [currentPage] = useState(1);
    const itemsPerPage = 5;

    // State for Trip Ticket Form
    const [showTripTicketForm, setShowTripTicketForm] = useState(false);
    const [selectedSlip, setSelectedSlip] = useState(null);
    const [tripTicketFormData, setTripTicketFormData] = useState({
        departureTimeOffice: '',
        arrivalTimeDestination: '',
        departureTimeDestination: '',
        arrivalTimeOffice: '',
        distanceTraveled: '',
        distanceUnit: '',
        gasolineIssuedPurchased: '',
        issuedFromStock: '',
        gearOilUsed: '',
        lubricatingOilUsed: '',
        greaseIssued: '',
        odometerStart: '',
        odometerStartUnit: '',
        odometerEnd: '',
        odometerEndUnit: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    // Handle Trip Ticket button click
    const handleGenerateTripTicket = (slip) => {
        setSelectedSlip(slip);
        setShowTripTicketForm(true);

        // Pre-fill data from the gas slip
        setTripTicketFormData(prev => ({
            ...prev,
            gasolineIssuedPurchased: slip.gasoline_amount || '',
            departureTimeOffice: '',
            arrivalTimeDestination: '',
            departureTimeDestination: '',
            arrivalTimeOffice: '',
            distanceTraveled: '',
            distanceUnit: '',
            issuedFromStock: '',
            gearOilUsed: '',
            lubricatingOilUsed: '',
            greaseIssued: '',
            odometerStart: '',
            odometerStartUnit: '',
            odometerEnd: '',
            odometerEndUnit: ''
        }));
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setTripTicketFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Clear error when user starts typing
        if (formErrors[id]) {
            setFormErrors(prev => ({
                ...prev,
                [id]: null
            }));
        }
    };

    // UPDATED: Handle form submission - refresh gas slips after success
    const handleTripTicketSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        const errors = {};
        if (!tripTicketFormData.departureTimeOffice) errors.departureTimeOffice = ['Departure time is required'];
        if (!tripTicketFormData.arrivalTimeDestination) errors.arrivalTimeDestination = ['Arrival time is required'];
        if (!tripTicketFormData.departureTimeDestination) errors.departureTimeDestination = ['Departure time from destination is required'];
        if (!tripTicketFormData.arrivalTimeOffice) errors.arrivalTimeOffice = ['Arrival time back to office is required'];
        if (!tripTicketFormData.distanceTraveled) errors.distanceTraveled = ['Distance traveled is required'];
        if (!tripTicketFormData.distanceUnit) errors.distanceUnit = ['Distance unit is required'];
        if (!tripTicketFormData.gasolineIssuedPurchased) errors.gasolineIssuedPurchased = ['Gasoline amount is required'];
        if (!tripTicketFormData.issuedFromStock) errors.issuedFromStock = ['Issued from stock amount is required'];
        if (!tripTicketFormData.odometerStart) errors.odometerStart = ['Odometer start reading is required'];
        if (!tripTicketFormData.odometerStartUnit) errors.odometerStartUnit = ['Odometer start unit is required'];
        if (!tripTicketFormData.odometerEnd) errors.odometerEnd = ['Odometer end reading is required'];
        if (!tripTicketFormData.odometerEndUnit) errors.odometerEndUnit = ['Odometer end unit is required'];

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("userToken");

            const response = await axios.post("http://localhost:8000/api/user/trip-tickets", {
                fuel_request_id: selectedSlip.id,
                departure_time_office: tripTicketFormData.departureTimeOffice,
                arrival_time_destination: tripTicketFormData.arrivalTimeDestination,
                departure_time_destination: tripTicketFormData.departureTimeDestination,
                arrival_time_office: tripTicketFormData.arrivalTimeOffice,
                distance_traveled: tripTicketFormData.distanceTraveled,
                distance_unit: tripTicketFormData.distanceUnit,
                gasoline_issued_purchased: tripTicketFormData.gasolineIssuedPurchased,
                issued_from_stock: tripTicketFormData.issuedFromStock,
                gear_oil_used: tripTicketFormData.gearOilUsed || null,
                lubricating_oil_used: tripTicketFormData.lubricatingOilUsed || null,
                grease_issued: tripTicketFormData.greaseIssued || null,
                odometer_start: tripTicketFormData.odometerStart,
                odometer_start_unit: tripTicketFormData.odometerStartUnit,
                odometer_end: tripTicketFormData.odometerEnd,
                odometer_end_unit: tripTicketFormData.odometerEndUnit
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                setShowTripTicketForm(false);
                alert('Trip Ticket submitted successfully!');

                // Reset form
                setTripTicketFormData({
                    departureTimeOffice: '',
                    arrivalTimeDestination: '',
                    departureTimeDestination: '',
                    arrivalTimeOffice: '',
                    distanceTraveled: '',
                    distanceUnit: '',
                    gasolineIssuedPurchased: '',
                    issuedFromStock: '',
                    gearOilUsed: '',
                    lubricatingOilUsed: '',
                    greaseIssued: '',
                    odometerStart: '',
                    odometerStartUnit: '',
                    odometerEnd: '',
                    odometerEndUnit: ''
                });

                // REFRESH THE GAS SLIPS LIST - This will remove the row
                if (onTripTicketSubmitted) {
                    onTripTicketSubmitted();
                }
            }

        } catch (error) {
            console.error('Error generating trip ticket:', error);
            if (error.response?.data?.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                alert('Error generating trip ticket. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Filter and sort gas slips - ONLY show slips without trip tickets
    const processedGasSlips = useMemo(() => {
        let filtered = gasSlips.filter(slip =>
            !slip.has_trip_ticket && ( // ONLY show slips without trip tickets
                slip.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                slip.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                slip.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                slip.fuel_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                slip.approved_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                slip.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                slip.places_to_visit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                slip.authorized_passengers?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        return filtered;
    }, [gasSlips, searchTerm]);

    // Pagination
    const currentGasSlips = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedGasSlips.slice(startIndex, startIndex + itemsPerPage);
    }, [processedGasSlips, currentPage]);

    if (isLoading) {
        return (
            <div className="gas-slip-table-loading">
                <div className="gas-slip-table-spinner"></div>
                <p>Loading gas slips...</p>
            </div>
        );
    }

    if (processedGasSlips.length === 0) {
        return (
            <div className="gas-slip-table-empty">
                <svg className="gas-slip-table-empty-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <h3>No Gas Slips Found</h3>
                <p>No gas slip records available or all slips have been converted to trip tickets.</p>
            </div>
        );
    }

    return (
        <>
            <div className="gas-slip-table-container">
                <div className="gas-slip-table-wrapper">
                    <table className="gas-slip-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Date Requested</th>
                                <th>Model/Unit Name</th>
                                <th>Plate No.</th>
                                <th>Type of Fuel</th>
                                <th>Gasoline Amount</th>
                                <th>Approved By</th>
                                <th>Status</th>
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
                                                <>
                                                    <button
                                                        className="gas-slip-table-action-btn gas-slip-table-edit-btn"
                                                        onClick={() => handleEditSlip && handleEditSlip(slip)}
                                                        title="Edit Gas Slip"
                                                    >
                                                        <svg className="gas-slip-table-icon-edit" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="gas-slip-table-action-btn gas-slip-table-decline-btn"
                                                        onClick={() => handleDeclineSlip && handleDeclineSlip(slip.id)}
                                                        title="Decline Gas Slip"
                                                    >
                                                        <svg className="gas-slip-table-icon-decline" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                                        </svg>
                                                    </button>
                                                </>
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

                                            {slip.status === 'approved' && (
                                                <button
                                                    className="gas-slip-table-action-btn gas-slip-table-trip-ticket-btn"
                                                    onClick={() => handleGenerateTripTicket(slip)}
                                                    title="Generate Trip Ticket"
                                                >
                                                    <svg className="gas-slip-table-icon-trip-ticket" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
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

            {/* Trip Ticket Form Modal */}
            <TripTicketForm
                showTripTicketForm={showTripTicketForm}
                setShowTripTicketForm={setShowTripTicketForm}
                formData={tripTicketFormData}
                handleInputChange={handleInputChange}
                handleTripTicketSubmit={handleTripTicketSubmit}
                formErrors={formErrors}
                loading={loading}
                selectedSlip={selectedSlip}
            />
        </>
    );
}

export default GasSlipTable;