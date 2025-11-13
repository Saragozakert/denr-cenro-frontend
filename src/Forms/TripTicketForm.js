import React from "react";
import './../assets/Style/FormDesign/TripTicketForm.css';

function TripTicketForm({
    showTripTicketForm,
    setShowTripTicketForm,
    formData,
    handleInputChange,
    handleTripTicketSubmit,
    formErrors,
    loading
}) {
    if (!showTripTicketForm) return null;

    return (
        <div className="enhanced-trip-ticket-modal-overlay">
            <div className="enhanced-trip-ticket-modal">
                <div className="enhanced-trip-ticket-modal-header">
                    <div className="enhanced-trip-ticket-header-content">
                        <div className="enhanced-trip-ticket-header-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                            </svg>
                        </div>
                        <div className="enhanced-trip-ticket-header-text">
                            <h2>Trip Ticket Form</h2>
                            <p>To be filled by the Driver</p>
                        </div>
                    </div>
                    <button
                        className="enhanced-trip-ticket-close-btn"
                        onClick={() => setShowTripTicketForm(false)}
                        disabled={loading}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>

                <div className="enhanced-trip-ticket-modal-content">
                    <form className="enhanced-trip-ticket-form" onSubmit={handleTripTicketSubmit}>
                        {/* Time Tracking Section */}
                        <div className="enhanced-form-section">
                            <div className="enhanced-section-header">
                                <div className="enhanced-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                                    </svg>
                                </div>
                                <h3>Time Tracking</h3>
                            </div>
                            <div className="enhanced-form-grid">
                                <div className="enhanced-form-group">
                                    <label htmlFor="departureTimeOffice">
                                        Time of Departure from the office/garage <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        id="departureTimeOffice"
                                        className={`enhanced-form-input ${formErrors.departureTimeOffice ? 'enhanced-error' : ''}`}
                                        value={formData.departureTimeOffice}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.departureTimeOffice && <span className="enhanced-error-text">{formErrors.departureTimeOffice[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="arrivalTimeDestination">
                                        Time of arrival at Item No. 4 above <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        id="arrivalTimeDestination"
                                        className={`enhanced-form-input ${formErrors.arrivalTimeDestination ? 'enhanced-error' : ''}`}
                                        value={formData.arrivalTimeDestination}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.arrivalTimeDestination && <span className="enhanced-error-text">{formErrors.arrivalTimeDestination[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="departureTimeDestination">
                                        Time of departure from Item No. 4 above <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        id="departureTimeDestination"
                                        className={`enhanced-form-input ${formErrors.departureTimeDestination ? 'enhanced-error' : ''}`}
                                        value={formData.departureTimeDestination}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.departureTimeDestination && <span className="enhanced-error-text">{formErrors.departureTimeDestination[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="arrivalTimeOffice">
                                        Time of arrival back to the office/garage <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        id="arrivalTimeOffice"
                                        className={`enhanced-form-input ${formErrors.arrivalTimeOffice ? 'enhanced-error' : ''}`}
                                        value={formData.arrivalTimeOffice}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.arrivalTimeOffice && <span className="enhanced-error-text">{formErrors.arrivalTimeOffice[0]}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Distance and Fuel Section */}
                        <div className="enhanced-form-section">
                            <div className="enhanced-section-header">
                                <div className="enhanced-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.5,8L11,13.5L7.5,10L6,11.5L11,16.5Z" />
                                    </svg>
                                </div>
                                <h3>Distance and Fuel Information</h3>
                            </div>
                            <div className="enhanced-form-grid">
                                <div className="enhanced-form-group">
                                    <label htmlFor="distanceTraveled">
                                        Approximate distance traveled to & from <span className="required-field">*</span>
                                    </label>
                                    <div className="distance-input-group">
                                        <input
                                            type="number"
                                            id="distanceTraveled"
                                            placeholder="Enter distance"
                                            className={`enhanced-form-input ${formErrors.distanceTraveled ? 'enhanced-error' : ''}`}
                                            value={formData.distanceTraveled}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <select
                                            id="distanceUnit"
                                            className={`enhanced-form-input unit-select ${formErrors.distanceUnit ? 'enhanced-error' : ''}`}
                                            value={formData.distanceUnit}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Unit</option>
                                            <option value="KM">KM</option>
                                            <option value="M">M</option>
                                        </select>
                                    </div>
                                    {formErrors.distanceTraveled && <span className="enhanced-error-text">{formErrors.distanceTraveled[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="gasolineIssuedPurchased">
                                        Gasoline/Diesel issued/purchased and used <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="gasolineIssuedPurchased"
                                        placeholder="Enter amount (e.g., 45.86)"
                                        className={`enhanced-form-input ${formErrors.gasolineIssuedPurchased ? 'enhanced-error' : ''}`}
                                        value={formData.gasolineIssuedPurchased}
                                        onChange={handleInputChange}
                                        required
                                        step="0.01"
                                    />
                                    {formErrors.gasolineIssuedPurchased && <span className="enhanced-error-text">{formErrors.gasolineIssuedPurchased[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="issuedFromStock">
                                        Issued by the office from stock <span className="required-field">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="issuedFromStock"
                                        placeholder="Enter amount"
                                        className={`enhanced-form-input ${formErrors.issuedFromStock ? 'enhanced-error' : ''}`}
                                        value={formData.issuedFromStock}
                                        onChange={handleInputChange}
                                        required
                                        step="0.01"
                                    />
                                    {formErrors.issuedFromStock && <span className="enhanced-error-text">{formErrors.issuedFromStock[0]}</span>}
                                </div>

                                {/* REMOVED: Add: purchased during the trip (to from) field */}

                                <div className="enhanced-form-group">
                                    <label htmlFor="gearOilUsed">
                                        Gear oil used <span className="optional-field">(Optional)</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="gearOilUsed"
                                        placeholder="Enter amount"
                                        className={`enhanced-form-input ${formErrors.gearOilUsed ? 'enhanced-error' : ''}`}
                                        value={formData.gearOilUsed}
                                        onChange={handleInputChange}
                                        step="0.01"
                                    />
                                    {formErrors.gearOilUsed && <span className="enhanced-error-text">{formErrors.gearOilUsed[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="lubricatingOilUsed">
                                        Lubricating oils used <span className="optional-field">(Optional)</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="lubricatingOilUsed"
                                        placeholder="Enter amount"
                                        className={`enhanced-form-input ${formErrors.lubricatingOilUsed ? 'enhanced-error' : ''}`}
                                        value={formData.lubricatingOilUsed}
                                        onChange={handleInputChange}
                                        step="0.01"
                                    />
                                    {formErrors.lubricatingOilUsed && <span className="enhanced-error-text">{formErrors.lubricatingOilUsed[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="greaseIssued">
                                        Grease issued/purchased <span className="optional-field">(Optional)</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="greaseIssued"
                                        placeholder="Enter amount"
                                        className={`enhanced-form-input ${formErrors.greaseIssued ? 'enhanced-error' : ''}`}
                                        value={formData.greaseIssued}
                                        onChange={handleInputChange}
                                        step="0.01"
                                    />
                                    {formErrors.greaseIssued && <span className="enhanced-error-text">{formErrors.greaseIssued[0]}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Odometer Reading Section */}
                        <div className="enhanced-form-section">
                            <div className="enhanced-section-header">
                                <div className="enhanced-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.09 4.8,16 6.11,17.41L9.88,9.88L17.41,6.11C16,4.8 14.09,4 12,4M12,20A8,8 0 0,0 20,12C20,9.91 19.2,8 17.89,6.59L14.12,14.12L6.59,17.89C8,19.2 9.91,20 12,20M12,12L11.23,11.23L9.7,14.3L12,12M12,12L14.3,9.7L11.23,11.23L12,12Z" />
                                    </svg>
                                </div>
                                <h3>Odometer Reading</h3>
                            </div>
                            <div className="enhanced-form-grid">
                                <div className="enhanced-form-group">
                                    <label htmlFor="odometerStart">
                                        At the beginning of the trip <span className="required-field">*</span>
                                    </label>
                                    <div className="distance-input-group">
                                        <input
                                            type="number"
                                            id="odometerStart"
                                            placeholder="Enter reading"
                                            className={`enhanced-form-input ${formErrors.odometerStart ? 'enhanced-error' : ''}`}
                                            value={formData.odometerStart}
                                            onChange={handleInputChange}
                                            required
                                            step="0.01"
                                        />
                                        <select
                                            id="odometerStartUnit"
                                            className={`enhanced-form-input unit-select ${formErrors.odometerStartUnit ? 'enhanced-error' : ''}`}
                                            value={formData.odometerStartUnit}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Unit</option>
                                            <option value="KM">KM</option>
                                            <option value="M">M</option>
                                        </select>
                                    </div>
                                    {formErrors.odometerStart && <span className="enhanced-error-text">{formErrors.odometerStart[0]}</span>}
                                </div>

                                <div className="enhanced-form-group">
                                    <label htmlFor="odometerEnd">
                                        At the end of the trip <span className="required-field">*</span>
                                    </label>
                                    <div className="distance-input-group">
                                        <input
                                            type="number"
                                            id="odometerEnd"
                                            placeholder="Enter reading"
                                            className={`enhanced-form-input ${formErrors.odometerEnd ? 'enhanced-error' : ''}`}
                                            value={formData.odometerEnd}
                                            onChange={handleInputChange}
                                            required
                                            step="0.01"
                                        />
                                        <select
                                            id="odometerEndUnit"
                                            className={`enhanced-form-input unit-select ${formErrors.odometerEndUnit ? 'enhanced-error' : ''}`}
                                            value={formData.odometerEndUnit}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Unit</option>
                                            <option value="KM">KM</option>
                                            <option value="M">M</option>
                                        </select>
                                    </div>
                                    {formErrors.odometerEnd && <span className="enhanced-error-text">{formErrors.odometerEnd[0]}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="enhanced-form-actions">
                            <button
                                type="button"
                                className="enhanced-cancel-btn"
                                onClick={() => setShowTripTicketForm(false)}
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
                                        Submit Trip Ticket
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

export default TripTicketForm;