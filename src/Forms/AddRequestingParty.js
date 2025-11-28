import './../assets/Style/FormDesign/AddRequestingParty.css';

function AddRequestingParty({
    showAddRequestingPartyForm,
    setShowAddRequestingPartyForm,
    formData,
    handleInputChange,
    handleAddRequestingPartySubmit,
    formErrors,
    loading
}) {
    if (!showAddRequestingPartyForm) return null;

    return (
        <div className="enhanced-requesting-party-modal-overlay">
            <div className="enhanced-requesting-party-modal">
                <div className="enhanced-requesting-party-modal-header">
                    <div className="enhanced-requesting-party-header-content">
                        <div className="enhanced-requesting-party-header-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                            </svg>
                        </div>
                        <div className="enhanced-requesting-party-header-text">
                            <h2>Add New Requesting Party</h2>
                            <p>Register a new requesting party</p>
                        </div>
                    </div>
                    <button
                        className="enhanced-requesting-party-close-btn"
                        onClick={() => setShowAddRequestingPartyForm(false)}
                        disabled={loading}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>

                <div className="enhanced-requesting-party-modal-content">
                    <form className="enhanced-requesting-party-form" onSubmit={handleAddRequestingPartySubmit}>
                        {/* Requesting Party Information Section */}
                        <div className="enhanced-requesting-party-form-section">
                            <div className="enhanced-requesting-party-section-header">
                                <div className="enhanced-requesting-party-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                    </svg>
                                </div>
                                <h3>Requesting Party Information</h3>
                            </div>
                            <div className="enhanced-requesting-party-form-grid">
                                <div className="enhanced-requesting-party-form-group full-width">
                                    <label htmlFor="name">
                                        Full Name <span className="enhanced-requesting-party-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter full name"
                                        className={`enhanced-requesting-party-form-input ${formErrors.name ? 'enhanced-requesting-party-error' : ''}`}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.name && <span className="enhanced-requesting-party-error-text">{formErrors.name[0]}</span>}
                                </div>

                                <div className="enhanced-requesting-party-form-group">
                                    <label htmlFor="division">
                                        Division/Section <span className="enhanced-requesting-party-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="division"
                                        placeholder="Enter division or section"
                                        className={`enhanced-requesting-party-form-input ${formErrors.division ? 'enhanced-requesting-party-error' : ''}`}
                                        value={formData.division}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.division && <span className="enhanced-requesting-party-error-text">{formErrors.division[0]}</span>}
                                </div>

                                <div className="enhanced-requesting-party-form-group">
                                    <label htmlFor="position">
                                        Position <span className="enhanced-requesting-party-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="position"
                                        placeholder="Enter position"
                                        className={`enhanced-requesting-party-form-input ${formErrors.position ? 'enhanced-requesting-party-error' : ''}`}
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.position && <span className="enhanced-requesting-party-error-text">{formErrors.position[0]}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="enhanced-requesting-party-form-actions">
                            <button
                                type="button"
                                className="enhanced-requesting-party-cancel-btn"
                                onClick={() => setShowAddRequestingPartyForm(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="enhanced-requesting-party-submit-btn" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="enhanced-requesting-party-spinner" viewBox="0 0 24 24" width="16" height="16">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                                                <animate attributeName="stroke-dashoffset" dur="1s" values="32;0" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                        Adding Requesting Party...
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                        </svg>
                                        Add Requesting Party
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

export default AddRequestingParty;