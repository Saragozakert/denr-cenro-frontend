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
    return (
        <>
            {showAddEmployeeForm && (
                <div className="add-employee-modal-overlay">
                    <div className="add-employee-add-modal">
                        <div className="add-employee-modal-header">
                            <h2>Add New Employee</h2>
                            <button
                                className="add-employee-close-btn"
                                onClick={() => setShowAddEmployeeForm(false)}
                                disabled={loading}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="add-employee-modal-content">
                            <form className="add-employee-add-form" onSubmit={handleAddEmployeeSubmit}>
                                <div className="add-employee-form-section">
                                    <div className="add-employee-form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter full name"
                                            className={`add-employee-form-input ${formErrors.name ? 'add-employee-error' : ''}`}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.name && <span className="add-employee-error-text">{formErrors.name[0]}</span>}
                                    </div>
                                </div>

                                <div className="add-employee-form-section">
                                    <div className="add-employee-form-group">
                                        <label htmlFor="department">Division/Section</label>
                                        <input
                                            type="text"
                                            id="department"
                                            placeholder="Enter division or section"
                                            className={`add-employee-form-input ${formErrors.department ? 'add-employee-error' : ''}`}
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.department && <span className="add-employee-error-text">{formErrors.department[0]}</span>}
                                    </div>

                                    <div className="add-employee-form-group">
                                        <label htmlFor="position">Position</label>
                                        <input
                                            type="text"
                                            id="position"
                                            placeholder="Enter position"
                                            className={`add-employee-form-input ${formErrors.position ? 'add-employee-error' : ''}`}
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formErrors.position && <span className="add-employee-error-text">{formErrors.position[0]}</span>}
                                    </div>
                                </div>

                                <div className="add-employee-form-actions">
                                    <button
                                        type="button"
                                        className="add-employee-cancel-btn"
                                        onClick={() => setShowAddEmployeeForm(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="add-employee-submit-btn" disabled={loading}>
                                        {loading ? "Adding..." : "Add Employee"}
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

export default AddEmployee;