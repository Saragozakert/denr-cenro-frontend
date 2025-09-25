import React from "react";
import './../assets/Style/FormDesign/RegisterUser.css';

function RegisterUser({
  showRegisterForm,
  setShowRegisterForm,
  formData,
  handleInputChange,
  handleRegisterSubmit, 
  formErrors,
  loading
}) {
  return (
    <>
      {showRegisterForm && (
        <div className="modal-overlay">
          <div className="registration-modal">
            <div className="modal-header">
              <h2>Create New User</h2>
              <button 
                className="close-btn"
                onClick={() => setShowRegisterForm(false)}
                disabled={loading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </div>
            
            <div className="modal-content">
              <form className="registration-form" onSubmit={handleRegisterSubmit}>
                <div className="form-section">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        className={`form-input ${formErrors.full_name ? 'error' : ''}`}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.full_name && <span className="error-text">{formErrors.full_name[0]}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="age">Age</label>
                      <input
                        type="number"
                        id="age"
                        placeholder="Age"
                        min="18"
                        max="100"
                        className={`form-input ${formErrors.age ? 'error' : ''}`}
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.age && <span className="error-text">{formErrors.age[0]}</span>}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      type="date"
                      id="birthday"
                      className={`form-input ${formErrors.birthday ? 'error' : ''}`}
                      value={formData.birthday}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.birthday && <span className="error-text">{formErrors.birthday[0]}</span>}
                  </div>
                </div>
                
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Choose a username"
                      className={`form-input ${formErrors.username ? 'error' : ''}`}
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.username && <span className="error-text">{formErrors.username[0]}</span>}
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <div className="password-input-wrapper">
                        <input
                          type="password"
                          id="password"
                          placeholder="Create password"
                          className={`form-input ${formErrors.password ? 'error' : ''}`}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        {formErrors.password && <span className="error-text">{formErrors.password[0]}</span>}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="password_confirmation">Confirm Password</label>
                      <div className="password-input-wrapper">
                        <input
                          type="password"
                          id="password_confirmation"
                          placeholder="Confirm password"
                          className="form-input"
                          value={formData.password_confirmation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowRegisterForm(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Creating..." : "Create User"}
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

export default RegisterUser;