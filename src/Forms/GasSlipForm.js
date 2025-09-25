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
    currentUserName
}) {
    const [vehicleOptions, setVehicleOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [allUnits, setAllUnits] = useState([]);
    const [isLoadingUnits, setIsLoadingUnits] = useState(false);

    // Fetch units from the API
    useEffect(() => {
        const fetchUnits = async () => {
            setIsLoadingUnits(true);
            try {
                const token = localStorage.getItem("userToken");
                const response = await axios.get("http://localhost:8000/api/user/units", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (response.data.success) {
                    const units = response.data.units;
                    setAllUnits(units);

                    // Extract unique vehicle types
                    const uniqueVehicleTypes = [...new Set(units.map(unit => unit.type))];
                    const vehicleOptions = uniqueVehicleTypes.map(type => ({
                        value: type,
                        label: type
                    }));
                    setVehicleOptions(vehicleOptions);

                    // Extract models based on selected vehicle type if one is already selected
                    if (formData.vehicleType) {
                        updateModelOptions(units, formData.vehicleType);
                    }
                }
            } catch (error) {
                console.error("Error fetching units:", error);
                // Fallback to default options if API fails
                setVehicleOptions([
                    { value: 'Vehicle', label: 'Vehicle' },
                    { value: 'Motorcycle', label: 'Motorcycle' }
                ]);
            } finally {
                setIsLoadingUnits(false);
            }
        };

        if (showGasSlipForm) {
            fetchUnits();
        }
    }, [showGasSlipForm, formData.vehicleType]);

    const updateModelOptions = (units, vehicleType) => {
        const filteredModels = units
            .filter(unit => unit.type === vehicleType)
            .map(unit => ({
                value: unit.id, // Use the unit ID as value instead of model name
                label: unit.model,
                plateCode: unit.plate_code,
                unitId: unit.id // Store the unit ID for reference
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

        // Find the selected unit to get its plate number
        if (selectedUnitId) {
            const selectedUnit = allUnits.find(unit => unit.id.toString() === selectedUnitId);
            if (selectedUnit) {
                handleInputChange({
                    target: {
                        id: 'plateNo',
                        value: selectedUnit.plate_code
                    }
                });

                // Also set the model name for display purposes if needed
                handleInputChange({
                    target: {
                        id: 'modelNameDisplay',
                        value: selectedUnit.model
                    }
                });
            }
        } else {
            // Clear plate number if no model is selected
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

    return (
        <>
            {showGasSlipForm && (
                <div className="gas-slip-modal-overlay">
                    <div className="gas-slip-add-modal">
                        <div className="gas-slip-modal-header">
                            <h2>Gas Slip Request</h2>
                            <button
                                className="gas-slip-close-btn"
                                onClick={() => setShowGasSlipForm(false)}
                                disabled={loading}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="gas-slip-modal-content">
                            <form className="gas-slip-add-form" onSubmit={handleGasSlipSubmit}>
                                <div className="gas-slip-form-section">
                                    <div className="gas-slip-form-group">
                                        <label htmlFor="vehicleType">Type of Vehicle</label>
                                        <select
                                            id="vehicleType"
                                            className={`gas-slip-form-input ${formErrors.vehicleType ? 'gas-slip-error' : ''}`}
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
                                        {formErrors.vehicleType && <span className="gas-slip-error-text">{formErrors.vehicleType[0]}</span>}
                                    </div>

                                    <div className="gas-slip-form-group">
                                        <label htmlFor="modelName">Model/Unit Name</label>
                                        <select
                                            id="modelName"
                                            className={`gas-slip-form-input ${formErrors.modelName ? 'gas-slip-error' : ''}`}
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
                                        {formErrors.modelName && <span className="gas-slip-error-text">{formErrors.modelName[0]}</span>}
                                    </div>
                                </div>

                                <div className="gas-slip-form-section">
                                    <div className="gas-slip-form-group">
                                        <label htmlFor="plateNo">Plate No.</label>
                                        <input
                                            type="text"
                                            id="plateNo"
                                            placeholder="Plate number will be auto-filled"
                                            className={`gas-slip-form-input ${formErrors.plateNo ? 'gas-slip-error' : ''}`}
                                            value={formData.plateNo}
                                            onChange={handleInputChange}
                                            required
                                            disabled
                                        />
                                        {formErrors.plateNo && <span className="gas-slip-error-text">{formErrors.plateNo[0]}</span>}
                                    </div>

                                    <div className="gas-slip-form-group">
                                        <label htmlFor="section">Section</label>
                                        <input
                                            type="text"
                                            id="section"
                                            placeholder="Enter section"
                                            className={`gas-slip-form-input ${formErrors.section ? 'gas-slip-error' : ''}`}
                                            value={formData.section}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.section && <span className="gas-slip-error-text">{formErrors.section[0]}</span>}
                                    </div>
                                </div>

                                <div className="gas-slip-form-section">
                                    <div className="gas-slip-form-group">
                                        <label htmlFor="office">Office</label>
                                        <input
                                            type="text"
                                            id="office"
                                            placeholder="Enter office"
                                            className={`gas-slip-form-input ${formErrors.office ? 'gas-slip-error' : ''}`}
                                            value={formData.office}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.office && <span className="gas-slip-error-text">{formErrors.office[0]}</span>}
                                    </div>

                                    <div className="gas-slip-form-group">
                                        <label htmlFor="purchasedNo">Purchased No. <span className="optional-field">(Optional)</span></label>
                                        <input
                                            type="text"
                                            id="purchasedNo"
                                            placeholder="Enter purchased number (optional)"
                                            className={`gas-slip-form-input ${formErrors.purchasedNo ? 'gas-slip-error' : ''}`}
                                            value={formData.purchasedNo}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.purchasedNo && <span className="gas-slip-error-text">{formErrors.purchasedNo[0]}</span>}
                                    </div>
                                </div>

                                <div className="gas-slip-form-section">
                                    <div className="gas-slip-form-group">
                                        <label htmlFor="purpose">Purpose</label>
                                        <textarea
                                            id="purpose"
                                            placeholder="Enter purpose"
                                            className={`gas-slip-form-input ${formErrors.purpose ? 'gas-slip-error' : ''}`}
                                            value={formData.purpose}
                                            onChange={handleInputChange}
                                            rows="3"
                                            required
                                        />
                                        {formErrors.purpose && <span className="gas-slip-error-text">{formErrors.purpose[0]}</span>}
                                    </div>
                                </div>

                                <div className="gas-slip-form-section">
                                    <div className="gas-slip-form-group">
                                        <label htmlFor="fuelType">Type of Fuel</label>
                                        <select
                                            id="fuelType"
                                            className={`gas-slip-form-input ${formErrors.fuelType ? 'gas-slip-error' : ''}`}
                                            value={formData.fuelType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Fuel Type</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Gasoline">Gasoline</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {formErrors.fuelType && <span className="gas-slip-error-text">{formErrors.fuelType[0]}</span>}
                                    </div>

                                    <div className="gas-slip-form-group">
                                        <label htmlFor="gasolineAmount">Gasoline Amount</label>
                                        <input
                                            type="number"
                                            id="gasolineAmount"
                                            placeholder="Enter amount"
                                            className={`gas-slip-form-input ${formErrors.gasolineAmount ? 'gas-slip-error' : ''}`}
                                            value={formData.gasolineAmount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.gasolineAmount && <span className="gas-slip-error-text">{formErrors.gasolineAmount[0]}</span>}
                                    </div>
                                </div>

                                <div className="gas-slip-form-section">
                                    <div className="gas-slip-form-group">
                                        <label htmlFor="withdrawnBy">Withdrawn By</label>
                                        <input
                                            type="text"
                                            id="withdrawnBy"
                                            className="gas-slip-form-input"
                                            value={currentUserName}
                                            disabled
                                        />
                                    </div>

                                    <div className="gas-slip-form-group">
                                        <label htmlFor="approvedBy">Approved By</label>
                                        <select
                                            id="approvedBy"
                                            className={`gas-slip-form-input ${formErrors.approvedBy ? 'gas-slip-error' : ''}`}
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
                                        {formErrors.approvedBy && <span className="gas-slip-error-text">{formErrors.approvedBy[0]}</span>}
                                    </div>
                                </div>

                                <div className="gas-slip-form-section">
                                    <div className="gas-slip-form-group">
                                        <label htmlFor="issuedBy">Issued By <span className="optional-field">(Optional)</span></label>
                                        <input
                                            type="text"
                                            id="issuedBy"
                                            placeholder="Enter issuer name (optional)"
                                            className={`gas-slip-form-input ${formErrors.issuedBy ? 'gas-slip-error' : ''}`}
                                            value={formData.issuedBy}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.issuedBy && <span className="gas-slip-error-text">{formErrors.issuedBy[0]}</span>}
                                    </div>
                                </div>

                                <div className="gas-slip-form-actions">
                                    <button
                                        type="button"
                                        className="gas-slip-cancel-btn"
                                        onClick={() => setShowGasSlipForm(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="gas-slip-submit-btn" disabled={loading}>
                                        {loading ? "Submitting..." : "Submit Request"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default GasSlipForm;