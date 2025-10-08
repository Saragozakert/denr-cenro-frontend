import React, { useState, useEffect } from "react";
import axios from "axios";
import './../assets/Style/FormDesign/GasSlipForm.css';

function GasSlipForm({
    showGasSlipForm,
    setShowGasSlipForm,
    formData,
    handleInputChange,
    handleGasSlipSubmit,
    formErrors,
    loading,
    approvedByOptions,
    requestingPartyOptions,
    currentUserName
}) {
    const [vehicleOptions, setVehicleOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [allUnits, setAllUnits] = useState([]);
    const [isLoadingUnits, setIsLoadingUnits] = useState(false);
    const [isLoadingRequestingParties, setIsLoadingRequestingParties] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingUnits(true);
            setIsLoadingRequestingParties(true);

            try {
                const token = localStorage.getItem("userToken");

                const unitsResponse = await axios.get("http://localhost:8000/api/user/units", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (unitsResponse.data.success) {
                    const units = unitsResponse.data.units;
                    setAllUnits(units);

                    const uniqueVehicleTypes = [...new Set(units.map(unit => unit.type))];
                    const vehicleOptions = uniqueVehicleTypes.map(type => ({
                        value: type,
                        label: type
                    }));
                    setVehicleOptions(vehicleOptions);

                    if (formData.vehicleType) {
                        updateModelOptions(units, formData.vehicleType);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);

                setVehicleOptions([
                    { value: 'Vehicle', label: 'Vehicle' },
                    { value: 'Motorcycle', label: 'Motorcycle' }
                ]);
            } finally {
                setIsLoadingUnits(false);
                setIsLoadingRequestingParties(false);
            }
        };

        if (showGasSlipForm) {
            fetchData();
        }
    }, [showGasSlipForm, formData.vehicleType]);

    const updateModelOptions = (units, vehicleType) => {
        const filteredModels = units
            .filter(unit => unit.type === vehicleType)
            .map(unit => ({
                value: unit.id,
                label: unit.model,
                plateCode: unit.plate_code,
                unitId: unit.id
            }));
        setModelOptions(filteredModels);
    };

    const handleVehicleTypeChange = (e) => {
        const { value } = e.target;
        handleInputChange(e);

        // Clear dependent fields
        handleInputChange({
            target: {
                id: 'modelName',
                value: ''
            }
        });
        handleInputChange({
            target: {
                id: 'plateNo',
                value: ''
            }
        });

        if (value) {
            updateModelOptions(allUnits, value);
        } else {
            setModelOptions([]);
        }
    };

    const handleModelChange = (e) => {
        const selectedUnitId = e.target.value;
        handleInputChange({
            target: {
                id: 'modelName',
                value: selectedUnitId
            }
        });

        if (selectedUnitId) {
            const selectedUnit = allUnits.find(unit => unit.id.toString() === selectedUnitId);
            if (selectedUnit) {
                handleInputChange({
                    target: {
                        id: 'plateNo',
                        value: selectedUnit.plate_code
                    }
                });

                handleInputChange({
                    target: {
                        id: 'modelNameDisplay',
                        value: selectedUnit.model
                    }
                });
            }
        } else {
            handleInputChange({
                target: {
                    id: 'plateNo',
                    value: ''
                }
            });
            handleInputChange({
                target: {
                    id: 'modelNameDisplay',
                    value: ''
                }
            });
        }
    };

    if (!showGasSlipForm) return null;

    return (
        <div className="enhanced-gas-slip-modal-overlay">
            <div className="enhanced-gas-slip-modal">
                <div className="enhanced-gas-slip-modal-header">
                    <div className="enhanced-gas-slip-header-content">
                        <div className="enhanced-gas-slip-header-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M3,13.5L2.25,12H7.5L6.9,10.5H2L1.25,9H9.05L8.45,7.5H1.11L0.25,6H4A2,2 0 0,1 6,4H18V8H21L24,12V17H22A3,3 0 0,1 19,20A3,3 0 0,1 16,17H12A3,3 0 0,1 9,20A3,3 0 0,1 6,17H4V13.5H3M19,18.5A1.5,1.5 0 0,0 20.5,17A1.5,1.5 0 0,0 19,15.5A1.5,1.5 0 0,0 17.5,17A1.5,1.5 0 0,0 19,18.5M20.5,9.5H18V12H20.5V9.5M12,18.5A1.5,1.5 0 0,0 13.5,17A1.5,1.5 0 0,0 12,15.5A1.5,1.5 0 0,0 10.5,17A1.5,1.5 0 0,0 12,18.5Z" />
                            </svg>
                        </div>
                        <div className="enhanced-gas-slip-header-text">
                            <h2>Fuel Request Form</h2>
                            <p>Submit your gas slip request</p>
                        </div>
                    </div>
                    <button
                        className="enhanced-gas-slip-close-btn"
                        onClick={() => setShowGasSlipForm(false)}
                        disabled={loading}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>

                <div className="enhanced-gas-slip-modal-content">
                    <form className="enhanced-gas-slip-form" onSubmit={handleGasSlipSubmit}>
                        {/* Vehicle Information Section */}
                        <div className="enhanced-form-section">
                            <div className="enhanced-section-header">
                                <div className="enhanced-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
                                    </svg>
                                </div>
                                <h3>Vehicle Information</h3>
                            </div>
                            <div className="enhanced-form-grid">
                                <div className="enhanced-form-group">
                                    <label htmlFor="vehicleType">
                                        Type of Vehicle <span className="required-field">*</span>
                                    </label>
                                    <select
                                        id="vehicleType"
                                        className={`enhanced-form-input ${formErrors.vehicleType ? 'enhanced-error' : ''}`}
                                        value={formData.vehicleType}
                                        onChange={handleVehicleTypeChange}
                                        required
                                        disabled={isLoadingUnits}
                                    >
                                        <option value="">Select Vehicle Type</option>
                                        {vehicleOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.vehicleType && <span className="enhanced-error-text">{formErrors.vehicleType[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="modelName">
                                        Model/Unit Name <span className="required-field">*</span>
                                    </label>
                                    <select
                                        id="modelName"
                                        className={`enhanced-form-input ${formErrors.modelName ? 'enhanced-error' : ''}`}
                                        value={formData.modelName}
                                        onChange={handleModelChange}
                                        required
                                        disabled={!formData.vehicleType || isLoadingUnits}
                                    >
                                        <option value="">Select Model/Unit</option>
                                        {modelOptions.map(option => (
                                            <option key={option.unitId} value={option.unitId}>
                                                {option.label} - {option.plateCode}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.modelName && <span className="enhanced-error-text">{formErrors.modelName[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="plateNo">
                                        Plate Number <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="plateNo"
                                        placeholder="Auto-filled from model selection"
                                        className={`enhanced-form-input ${formErrors.plateNo ? 'enhanced-error' : ''}`}
                                        value={formData.plateNo}
                                        onChange={handleInputChange}
                                        required
                                        disabled
                                    />
                                    {formErrors.plateNo && <span className="enhanced-error-text">{formErrors.plateNo[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="requestingParty">
                                        Requesting Party <span className="required-field">*</span>
                                    </label>
                                    <select
                                        id="requestingParty"
                                        className={`enhanced-form-input ${formErrors.requestingParty ? 'enhanced-error' : ''}`}
                                        value={formData.requestingParty}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoadingRequestingParties}
                                    >
                                        <option value="">Select Requesting Party</option>
                                        {requestingPartyOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.requestingParty && <span className="enhanced-error-text">{formErrors.requestingParty[0]}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Department Information Section */}
                        <div className="enhanced-form-section">
                            <div className="enhanced-section-header">
                                <div className="enhanced-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,14.5 12,18 12,18C12,18 8.2,14.5 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M12,10A1.5,1.5 0 0,0 10.5,11.5A1.5,1.5 0 0,0 12,13A1.5,1.5 0 0,0 13.5,11.5A1.5,1.5 0 0,0 12,10Z" />
                                    </svg>
                                </div>
                                <h3>Department Information</h3>
                            </div>
                            <div className="enhanced-form-grid">
                                <div className="enhanced-form-group">
                                    <label htmlFor="section">
                                        Section <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="section"
                                        placeholder="Enter section"
                                        className={`enhanced-form-input ${formErrors.section ? 'enhanced-error' : ''}`}
                                        value={formData.section}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.section && <span className="enhanced-error-text">{formErrors.section[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="office">
                                        Office <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="office"
                                        placeholder="Enter office"
                                        className={`enhanced-form-input ${formErrors.office ? 'enhanced-error' : ''}`}
                                        value={formData.office}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.office && <span className="enhanced-error-text">{formErrors.office[0]}</span>}
                                </div>

                                <div className="enhanced-form-group full-width">
                                    <label htmlFor="purchasedNo">
                                        Purchase Number <span className="optional-field">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="purchasedNo"
                                        placeholder="Enter purchase number (optional)"
                                        className={`enhanced-form-input ${formErrors.purchasedNo ? 'enhanced-error' : ''}`}
                                        value={formData.purchasedNo}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.purchasedNo && <span className="enhanced-error-text">{formErrors.purchasedNo[0]}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Request Details Section */}
                        <div className="enhanced-form-section">
                            <div className="enhanced-section-header">
                                <div className="enhanced-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                    </svg>
                                </div>
                                <h3>Request Details</h3>
                            </div>
                            <div className="enhanced-form-grid">
                                <div className="enhanced-form-group full-width">
                                    <label htmlFor="purpose">
                                        Purpose <span className="required-field">*</span>
                                    </label>
                                    <textarea
                                        id="purpose"
                                        placeholder="Enter the purpose of fuel request"
                                        className={`enhanced-form-input ${formErrors.purpose ? 'enhanced-error' : ''}`}
                                        value={formData.purpose}
                                        onChange={handleInputChange}
                                        rows="3"
                                        required
                                    />
                                    {formErrors.purpose && <span className="enhanced-error-text">{formErrors.purpose[0]}</span>}
                                </div>

                                {/* NEW FIELD: Places to be visited/inspected */}
                                <div className="enhanced-form-group full-width">
                                    <label htmlFor="placesToVisit">
                                        Places to be visited/inspected <span className="optional-field">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="placesToVisit"
                                        placeholder="Enter places to be visited or inspected"
                                        className={`enhanced-form-input ${formErrors.placesToVisit ? 'enhanced-error' : ''}`}
                                        value={formData.placesToVisit}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                    {formErrors.placesToVisit && <span className="enhanced-error-text">{formErrors.placesToVisit[0]}</span>}
                                </div>

                                {/* NEW FIELD: Name of authorized passengers */}
                                <div className="enhanced-form-group full-width">
                                    <label htmlFor="authorizedPassengers">
                                        Name of authorized passengers <span className="optional-field">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="authorizedPassengers"
                                        placeholder="Enter names of authorized passengers"
                                        className={`enhanced-form-input ${formErrors.authorizedPassengers ? 'enhanced-error' : ''}`}
                                        value={formData.authorizedPassengers}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                    {formErrors.authorizedPassengers && <span className="enhanced-error-text">{formErrors.authorizedPassengers[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="fuelType">
                                        Type of Fuel <span className="required-field">*</span>
                                    </label>
                                    <select
                                        id="fuelType"
                                        className={`enhanced-form-input ${formErrors.fuelType ? 'enhanced-error' : ''}`}
                                        value={formData.fuelType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Fuel Type</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Gasoline">Gasoline</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {formErrors.fuelType && <span className="enhanced-error-text">{formErrors.fuelType[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="gasolineAmount">
                                        Fuel Amount <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="gasolineAmount"
                                        placeholder="Enter amount"
                                        className={`enhanced-form-input ${formErrors.gasolineAmount ? 'enhanced-error' : ''}`}
                                        value={formData.gasolineAmount}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.gasolineAmount && <span className="enhanced-error-text">{formErrors.gasolineAmount[0]}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Authorization Section */}
                        <div className="enhanced-form-section">
                            <div className="enhanced-section-header">
                                <div className="enhanced-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.5C16,17.1 15.4,17.7 14.8,17.7H9.2C8.6,17.7 8,17.1 8,16.5V12.6C8,12 8.6,11.4 9.2,11.4V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                                    </svg>
                                </div>
                                <h3>Authorization</h3>
                            </div>
                            <div className="enhanced-form-grid">
                                <div className="enhanced-form-group">
                                    <label htmlFor="withdrawnBy">Withdrawn By</label>
                                    <input
                                        type="text"
                                        id="withdrawnBy"
                                        className="enhanced-form-input"
                                        value={currentUserName}
                                        disabled
                                    />
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="approvedBy">
                                        Approved By <span className="required-field">*</span>
                                    </label>
                                    <select
                                        id="approvedBy"
                                        className={`enhanced-form-input ${formErrors.approvedBy ? 'enhanced-error' : ''}`}
                                        value={formData.approvedBy}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Approver</option>
                                        {approvedByOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.approvedBy && <span className="enhanced-error-text">{formErrors.approvedBy[0]}</span>}
                                </div>

                                <div className="enhanced-form-group full-width">
                                    <label htmlFor="issuedBy">
                                        Issued By <span className="optional-field">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="issuedBy"
                                        placeholder="Enter issuer name (optional)"
                                        className={`enhanced-form-input ${formErrors.issuedBy ? 'enhanced-error' : ''}`}
                                        value={formData.issuedBy}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.issuedBy && <span className="enhanced-error-text">{formErrors.issuedBy[0]}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="enhanced-form-actions">
                            <button
                                type="button"
                                className="enhanced-cancel-btn"
                                onClick={() => setShowGasSlipForm(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="enhanced-submit-btn" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="enhanced-spinner" viewBox="0 0 24 24" width="16" height="16">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                                                <animate attributeName="stroke-dashoffset" dur="1s" values="32;0" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                                        </svg>
                                        Submit Request
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GasSlipForm;