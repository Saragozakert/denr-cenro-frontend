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
    if (!showAddUnitForm) return null;

    return (
        <div className="enhanced-unit-modal-overlay">
            <div className="enhanced-unit-modal">
                <div className="enhanced-unit-modal-header">
                    <div className="enhanced-unit-header-content">
                        <div className="enhanced-unit-header-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z" />
                            </svg>
                        </div>
                        <div className="enhanced-unit-header-text">
                            <h2>Add New Unit</h2>
                            <p>Register a new vehicle or equipment unit</p>
                        </div>
                    </div>
                    <button
                        className="enhanced-unit-close-btn"
                        onClick={() => setShowAddUnitForm(false)}
                        disabled={loading}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>

                <div className="enhanced-unit-modal-content">
                    <form className="enhanced-unit-form" onSubmit={handleAddUnitSubmit}>
                        {/* Unit Information Section */}
                        <div className="enhanced-unit-form-section">
                            <div className="enhanced-unit-section-header">
                                <div className="enhanced-unit-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z" />
                                    </svg>
                                </div>
                                <h3>Unit Information</h3>
                            </div>
                            <div className="enhanced-unit-form-grid">
                                <div className="enhanced-unit-form-group">
                                    <label htmlFor="type">
                                        Type of Unit <span className="enhanced-unit-required-field">*</span>
                                    </label>
                                    <select
                                        id="type"
                                        className={`enhanced-unit-form-input ${formErrors.type ? 'enhanced-unit-error' : ''}`}
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Vehicle">Vehicle</option>
                                        <option value="Motorcycle">Motorcycle</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {formErrors.type && <span className="enhanced-unit-error-text">{formErrors.type[0]}</span>}
                                </div>

                                <div className="enhanced-unit-form-group">
                                    <label htmlFor="model">
                                        Model/Unit Name <span className="enhanced-unit-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="model"
                                        placeholder="Enter model"
                                        className={`enhanced-unit-form-input ${formErrors.model ? 'enhanced-unit-error' : ''}`}
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.model && <span className="enhanced-unit-error-text">{formErrors.model[0]}</span>}
                                </div>

                                <div className="enhanced-unit-form-group">
                                    <label htmlFor="plateCode">
                                        Plate/Unit Code <span className="enhanced-unit-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="plateCode"
                                        placeholder="Enter plate number"
                                        className={`enhanced-unit-form-input ${formErrors.plateCode ? 'enhanced-unit-error' : ''}`}
                                        value={formData.plateCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.plateCode && <span className="enhanced-unit-error-text">{formErrors.plateCode[0]}</span>}
                                </div>

                                <div className="enhanced-unit-form-group">
                                    <label htmlFor="assignedTo">
                                        Assigned To <span className="enhanced-unit-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="assignedTo"
                                        placeholder="Enter assigned person"
                                        className={`enhanced-unit-form-input ${formErrors.assignedTo ? 'enhanced-unit-error' : ''}`}
                                        value={formData.assignedTo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.assignedTo && <span className="enhanced-unit-error-text">{formErrors.assignedTo[0]}</span>}
                                </div>

                                <div className="enhanced-unit-form-group full-width">
                                    <label htmlFor="office">
                                        Office/Station <span className="enhanced-unit-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="office"
                                        placeholder="Enter office or station"
                                        className={`enhanced-unit-form-input ${formErrors.office ? 'enhanced-unit-error' : ''}`}
                                        value={formData.office}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.office && <span className="enhanced-unit-error-text">{formErrors.office[0]}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="enhanced-unit-form-actions">
                            <button
                                type="button"
                                className="enhanced-unit-cancel-btn"
                                onClick={() => setShowAddUnitForm(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="enhanced-unit-submit-btn" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="enhanced-unit-spinner" viewBox="0 0 24 24" width="16" height="16">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                                                <animate attributeName="stroke-dashoffset" dur="1s" values="32;0" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                        Adding Unit...
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                        </svg>
                                        Add Unit
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

export default AddUnit;