import './../assets/Style/FormDesign/AddUnit.css';

function AddUnit({
    showAddUnitForm,
    setShowAddUnitForm,
    formData,
    handleInputChange,
    handleAddUnitSubmit,
    formErrors,
    loading
}) {
    return (
        <>
            {showAddUnitForm && (
                <div className="type-unit-modal-overlay">
                    <div className="type-unit-add-modal">
                        <div className="type-unit-modal-header">
                            <h2>Add New Unit</h2>
                            <button
                                className="type-unit-close-btn"
                                onClick={() => setShowAddUnitForm(false)}
                                disabled={loading}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="type-unit-modal-content">
                            <form className="type-unit-add-form" onSubmit={handleAddUnitSubmit}>
                                <div className="type-unit-form-section">
                                    <div className="type-unit-form-group">
                                        <label htmlFor="type">Type of Unit</label>
                                        <select
                                            id="type"
                                            className={`type-unit-form-input ${formErrors.type ? 'type-unit-error' : ''}`}
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Vehicle">Vehicle</option>
                                            <option value="Motorcycle">Motorcycle</option>
                                            <option value="Others">Others</option> {/* Add this line */}
                                        </select>
                                        {formErrors.type && <span className="type-unit-error-text">{formErrors.type[0]}</span>}
                                    </div>

                                    <div className="type-unit-form-group">
                                        <label htmlFor="model">Model/Unit Name</label>
                                        <input
                                            type="text"
                                            id="model"
                                            placeholder="Enter model"
                                            className={`type-unit-form-input ${formErrors.model ? 'type-unit-error' : ''}`}
                                            value={formData.model}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.model && <span className="type-unit-error-text">{formErrors.model[0]}</span>}
                                    </div>
                                </div>

                                <div className="type-unit-form-section">
                                    <div className="type-unit-form-group">
                                        <label htmlFor="plateCode">Plate/Unit Code</label>
                                        <input
                                            type="text"
                                            id="plateCode"
                                            placeholder="Enter plate number"
                                            className={`type-unit-form-input ${formErrors.plateCode ? 'type-unit-error' : ''}`}
                                            value={formData.plateCode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.plateCode && <span className="type-unit-error-text">{formErrors.plateCode[0]}</span>}
                                    </div>

                                    <div className="type-unit-form-group">
                                        <label htmlFor="assignedTo">Assigned To</label>
                                        <input
                                            type="text"
                                            id="assignedTo"
                                            placeholder="Enter assigned person"
                                            className={`type-unit-form-input ${formErrors.assignedTo ? 'type-unit-error' : ''}`}
                                            value={formData.assignedTo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.assignedTo && <span className="type-unit-error-text">{formErrors.assignedTo[0]}</span>}
                                    </div>
                                </div>

                                <div className="type-unit-form-section">
                                    <div className="type-unit-form-group">
                                        <label htmlFor="office">Office/Station</label>
                                        <input
                                            type="text"
                                            id="office"
                                            placeholder="Enter office or station"
                                            className={`type-unit-form-input ${formErrors.office ? 'type-unit-error' : ''}`}
                                            value={formData.office}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.office && <span className="type-unit-error-text">{formErrors.office[0]}</span>}
                                    </div>
                                </div>

                                <div className="type-unit-form-actions">
                                    <button
                                        type="button"
                                        className="type-unit-cancel-btn"
                                        onClick={() => setShowAddUnitForm(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="type-unit-submit-btn" disabled={loading}>
                                        {loading ? "Adding..." : "Add Unit"}
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

export default AddUnit;