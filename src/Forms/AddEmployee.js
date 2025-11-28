import './../assets/Style/FormDesign/AddEmployee.css';

function AddEmployee({
    showAddEmployeeForm,
    setShowAddEmployeeForm,
    formData,
    handleInputChange,
    handleAddEmployeeSubmit,
    formErrors,
    loading
}) {
    if (!showAddEmployeeForm) return null;

    return (
        <div className="enhanced-employee-modal-overlay">
            <div className="enhanced-employee-modal">
                <div className="enhanced-employee-modal-header">
                    <div className="enhanced-employee-header-content">
                        <div className="enhanced-employee-header-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                            </svg>
                        </div>
                        <div className="enhanced-employee-header-text">
                            <h2>Add New Employee</h2>
                            <p>Register a new employee in the system</p>
                        </div>
                    </div>
                    <button
                        className="enhanced-employee-close-btn"
                        onClick={() => setShowAddEmployeeForm(false)}
                        disabled={loading}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>

                <div className="enhanced-employee-modal-content">
                    <form className="enhanced-employee-form" onSubmit={handleAddEmployeeSubmit}>
                        {/* Employee Information Section */}
                        <div className="enhanced-employee-form-section">
                            <div className="enhanced-employee-section-header">
                                <div className="enhanced-employee-section-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                    </svg>
                                </div>
                                <h3>Employee Information</h3>
                            </div>
                            <div className="enhanced-employee-form-grid">
                                <div className="enhanced-employee-form-group full-width">
                                    <label htmlFor="name">
                                        Full Name <span className="enhanced-employee-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter full name"
                                        className={`enhanced-employee-form-input ${formErrors.name ? 'enhanced-employee-error' : ''}`}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.name && <span className="enhanced-employee-error-text">{formErrors.name[0]}</span>}
                                </div>

                                <div className="enhanced-employee-form-group">
                                    <label htmlFor="department">
                                        Division/Section <span className="enhanced-employee-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="department"
                                        placeholder="Enter division or section"
                                        className={`enhanced-employee-form-input ${formErrors.department ? 'enhanced-employee-error' : ''}`}
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.department && <span className="enhanced-employee-error-text">{formErrors.department[0]}</span>}
                                </div>

                                <div className="enhanced-employee-form-group">
                                    <label htmlFor="position">
                                        Position <span className="enhanced-employee-required-field">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="position"
                                        placeholder="Enter position"
                                        className={`enhanced-employee-form-input ${formErrors.position ? 'enhanced-employee-error' : ''}`}
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.position && <span className="enhanced-employee-error-text">{formErrors.position[0]}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="enhanced-employee-form-actions">
                            <button
                                type="button"
                                className="enhanced-employee-cancel-btn"
                                onClick={() => setShowAddEmployeeForm(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="enhanced-employee-submit-btn" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="enhanced-employee-spinner" viewBox="0 0 24 24" width="16" height="16">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                                                <animate attributeName="stroke-dashoffset" dur="1s" values="32;0" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                        Adding Employee...
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                        </svg>
                                        Add Employee
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

export default AddEmployee;