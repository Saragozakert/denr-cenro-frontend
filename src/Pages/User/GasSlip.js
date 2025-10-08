import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/Sidebars/UserSidebar";
import UserHeader from "../../components/Headers/UserHeader";
import GasSlipForm from "../../Forms/GasSlipForm";
import GasSlipTable from "../../Tables/GasSlipTable";
import '../../assets/Style/UserDesign/GasSlip.css';

function GasSlip() {
    const [user, setUser] = useState(null);
    const [activeItem, setActiveItem] = useState("gasSlip");
    const [searchTerm, setSearchTerm] = useState("");
    const [showGasSlipForm, setShowGasSlipForm] = useState(false);

    const [gasSlipFormData, setGasSlipFormData] = useState({
        vehicleType: '',
        modelName: '',
        modelNameDisplay: '',
        plateNo: '',
        requestingParty: '',
        section: '',
        office: '',
        purchasedNo: '',
        purpose: '',
        placesToVisit: '', // Add this
        authorizedPassengers: '', // Add this
        fuelType: '',
        gasolineAmount: '',
        withdrawnBy: '',
        approvedBy: '',
        issuedBy: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [approvedByOptions, setApprovedByOptions] = useState([]);
    const [requestingPartyOptions, setRequestingPartyOptions] = useState([]);
    const [gasSlips, setGasSlips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const userData = localStorage.getItem("userData");

                if (!token || !userData) {
                    navigate("/");
                    return;
                }

                await axios.get("http://localhost:8000/api/user/check-auth", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                setUser(JSON.parse(userData));
            } catch (error) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userData");
                navigate("/");
            }
        };

        checkAuth();
        fetchEmployees();
        fetchRequestingParties();
        fetchGasSlips();
    }, [navigate]);

    const fetchGasSlips = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/fuel-requests", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                setGasSlips(response.data.fuelRequests || []);
            }
        } catch (error) {
            console.error("Error fetching gas slips:", error);
            setGasSlips([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/employees", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                const employees = response.data.employees || [];
                const options = employees.map(employee => ({
                    value: employee.id,
                    label: employee.name
                }));
                setApprovedByOptions(options);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const fetchRequestingParties = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get("http://localhost:8000/api/user/requesting-parties", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                const requestingParties = response.data.requestingParties || [];
                const options = requestingParties.map(party => ({
                    value: party.id,
                    label: party.full_name
                }));
                setRequestingPartyOptions(options);
            }
        } catch (error) {
            console.error("Error fetching requesting parties:", error);
            setRequestingPartyOptions([
                { value: 'admin', label: 'Admin' },
                { value: 'operations', label: 'Operations' },
                { value: 'logistics', label: 'Logistics' },
                { value: 'maintenance', label: 'Maintenance' }
            ]);
        }
    };

    const handleMenuItemClick = (itemName, path) => {
        setActiveItem(itemName);
        if (path && path !== "#") {
            navigate(path);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setGasSlipFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleGasSlipSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        try {
            const token = localStorage.getItem("userToken");

            const selectedEmployee = approvedByOptions.find(
                option => option.value.toString() === gasSlipFormData.approvedBy
            );
            const approvedByName = selectedEmployee ? selectedEmployee.label : gasSlipFormData.approvedBy;

            const selectedRequestingParty = requestingPartyOptions.find(
                option => option.value.toString() === gasSlipFormData.requestingParty
            );
            const requestingPartyName = selectedRequestingParty ? selectedRequestingParty.label : gasSlipFormData.requestingParty;

            const response = await axios.post("http://localhost:8000/api/user/fuel-requests", {
                vehicle_type: gasSlipFormData.vehicleType,
                model_name: gasSlipFormData.modelNameDisplay || gasSlipFormData.modelName,
                plate_no: gasSlipFormData.plateNo,
                requesting_party: requestingPartyName,
                section: gasSlipFormData.section,
                office: gasSlipFormData.office,
                purchased_no: gasSlipFormData.purchasedNo,
                purpose: gasSlipFormData.purpose,
                places_to_visit: gasSlipFormData.placesToVisit, // Add this
                authorized_passengers: gasSlipFormData.authorizedPassengers, // Add this
                fuel_type: gasSlipFormData.fuelType,
                gasoline_amount: gasSlipFormData.gasolineAmount,
                withdrawn_by: user ? user.full_name : "Current User",
                approved_by: approvedByName,
                issued_by: gasSlipFormData.issuedBy
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                setShowGasSlipForm(false);
                alert('Fuel request submitted successfully!');

                // Reset form data including new fields
                setGasSlipFormData({
                    vehicleType: '',
                    modelName: '',
                    modelNameDisplay: '',
                    plateNo: '',
                    requestingParty: '',
                    section: '',
                    office: '',
                    purchasedNo: '',
                    purpose: '',
                    placesToVisit: '', // Add this
                    authorizedPassengers: '', // Add this
                    fuelType: '',
                    gasolineAmount: '',
                    withdrawnBy: '',
                    approvedBy: '',
                    issuedBy: ''
                });

                fetchGasSlips();
            }
        } catch (error) {
            console.error('Error submitting fuel request:', error);
            if (error.response?.data?.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setFormErrors({
                    general: ['Failed to submit fuel request. Please try again.']
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditSlip = (slip) => {
        console.log('Edit slip:', slip);
        alert('Edit functionality will be implemented here');
    };

    const handleDeclineSlip = async (slipId) => {
        if (window.confirm("Are you sure you want to decline this gas slip?")) {
            try {
                const token = localStorage.getItem("userToken");
                const response = await axios.delete(`http://localhost:8000/api/user/fuel-requests/${slipId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (response.data.success) {
                    alert("Gas slip declined successfully!");
                    fetchGasSlips();
                }
            } catch (error) {
                alert("Error declining gas slip: " + (error.response?.data?.message || error.message));
            }
        }
    };

    const filteredGasSlips = gasSlips.filter(slip =>
        slip.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.requesting_party?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.office?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.date?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <UserSidebar
            user={user}
            activeItem={activeItem}
            onMenuItemClick={handleMenuItemClick}
        >
            <UserHeader user={user} />

            <main className="dashboard-content">
                <div className="gas-slip-container">
                    <div className="gas-slip-management-header">
                        <div className="gas-slip-search-container">
                            <div className="gas-slip-search-box">
                                <svg className="gas-slip-search-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12,7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search gas slips by model, plate number, requesting party, driver, or date..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="gas-slip-search-input"
                                />
                                {searchTerm && (
                                    <button
                                        className="gas-slip-clear-search"
                                        onClick={() => setSearchTerm("")}
                                    >
                                        <svg viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <button
                            className="gas-slip-add-btn"
                            onClick={() => setShowGasSlipForm(true)}
                        >
                            <span className="gas-slip-btn-icon">+</span>
                            Gas Slip Form
                        </button>
                    </div>

                    <GasSlipTable
                        gasSlips={filteredGasSlips}
                        isLoading={isLoading}
                        searchTerm={searchTerm}
                        handleEditSlip={handleEditSlip}
                        handleDeclineSlip={handleDeclineSlip}
                    />
                </div>

                <GasSlipForm
                    showGasSlipForm={showGasSlipForm}
                    setShowGasSlipForm={setShowGasSlipForm}
                    formData={gasSlipFormData}
                    handleInputChange={handleInputChange}
                    handleGasSlipSubmit={handleGasSlipSubmit}
                    formErrors={formErrors}
                    loading={loading}
                    approvedByOptions={approvedByOptions}
                    requestingPartyOptions={requestingPartyOptions}
                    currentUserName={user ? user.full_name : "Current User"}
                />
            </main>
        </UserSidebar>
    );
}

export default GasSlip;