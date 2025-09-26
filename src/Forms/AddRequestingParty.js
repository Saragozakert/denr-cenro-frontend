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
    return (
        <>
            {showAddRequestingPartyForm && (
                <div className="add-requesting-party-modal-overlay">
                    <div className="add-requesting-party-add-modal">
                        <div className="add-requesting-party-modal-header">
                            <h2>Add New Requesting Party</h2>
                            <button
                                className="add-requesting-party-close-btn"
                                onClick={() => setShowAddRequestingPartyForm(false)}
                                disabled={loading}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="add-requesting-party-modal-content">
                            <form className="add-requesting-party-add-form" onSubmit={handleAddRequestingPartySubmit}>
                                <div className="add-requesting-party-form-section">
                                    <div className="add-requesting-party-form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter full name"
                                            className={`add-requesting-party-form-input ${formErrors.name ? 'add-requesting-party-error' : ''}`}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.name && <span className="add-requesting-party-error-text">{formErrors.name[0]}</span>}
                                    </div>
                                </div>

                                <div className="add-requesting-party-form-section">
                                    <div className="add-requesting-party-form-group">
                                        <label htmlFor="division">Division/Section</label>
                                        <input
                                            type="text"
                                            id="division"
                                            placeholder="Enter division or section"
                                            className={`add-requesting-party-form-input ${formErrors.division ? 'add-requesting-party-error' : ''}`}
                                            value={formData.division}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.division && <span className="add-requesting-party-error-text">{formErrors.division[0]}</span>}
                                    </div>

                                    <div className="add-requesting-party-form-group">
                                        <label htmlFor="position">Position</label>
                                        <input
                                            type="text"
                                            id="position"
                                            placeholder="Enter position"
                                            className={`add-requesting-party-form-input ${formErrors.position ? 'add-requesting-party-error' : ''}`}
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.position && <span className="add-requesting-party-error-text">{formErrors.position[0]}</span>}
                                    </div>
                                </div>

                                <div className="add-requesting-party-form-actions">
                                    <button
                                        type="button"
                                        className="add-requesting-party-cancel-btn"
                                        onClick={() => setShowAddRequestingPartyForm(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="add-requesting-party-submit-btn" disabled={loading}>
                                        {loading ? "Adding..." : "Add Requesting Party"}
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

export default AddRequestingParty;