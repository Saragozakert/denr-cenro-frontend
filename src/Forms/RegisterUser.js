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
  if (!showRegisterForm) return null;

  return (
    <div className="enhanced-gas-slip-modal-overlay">
      <div className="enhanced-gas-slip-modal">
        <div className="enhanced-gas-slip-modal-header">
          <div className="enhanced-gas-slip-header-content">
            <div className="enhanced-gas-slip-header-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>
            </div>
            <div className="enhanced-gas-slip-header-text">
              <h2>Create New User</h2>
              <p>Register a new user account</p>
            </div>
          </div>
          <button
            className="enhanced-gas-slip-close-btn"
            onClick={() => setShowRegisterForm(false)}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>

        <div className="enhanced-gas-slip-modal-content">
          <form className="enhanced-gas-slip-form" onSubmit={handleRegisterSubmit}>
            {/* Personal Information Section */}
            <div className="enhanced-form-section">
              <div className="enhanced-section-header">
                <div className="enhanced-section-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                </div>
                <h3>Personal Information</h3>
              </div>
              <div className="enhanced-form-grid">
                <div className="enhanced-form-group">
                  <label htmlFor="fullName">
                    Full Name <span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter full name"
                    className={`enhanced-form-input ${formErrors.full_name ? 'enhanced-error' : ''}`}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.full_name && <span className="enhanced-error-text">{formErrors.full_name[0]}</span>}
                </div>

                <div className="enhanced-form-group">
                  <label htmlFor="age">
                    Age <span className="required-field">*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    placeholder="Enter age"
                    min="18"
                    max="100"
                    className={`enhanced-form-input ${formErrors.age ? 'enhanced-error' : ''}`}
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.age && <span className="enhanced-error-text">{formErrors.age[0]}</span>}
                </div>

                <div className="enhanced-form-group full-width">
                  <label htmlFor="birthday">
                    Birthday <span className="required-field">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    className={`enhanced-form-input ${formErrors.birthday ? 'enhanced-error' : ''}`}
                    value={formData.birthday}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.birthday && <span className="enhanced-error-text">{formErrors.birthday[0]}</span>}
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="enhanced-form-section">
              <div className="enhanced-section-header">
                <div className="enhanced-section-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                  </svg>
                </div>
                <h3>Account Information</h3>
              </div>
              <div className="enhanced-form-grid">
                <div className="enhanced-form-group full-width">
                  <label htmlFor="username">
                    Username <span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Choose a username"
                    className={`enhanced-form-input ${formErrors.username ? 'enhanced-error' : ''}`}
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.username && <span className="enhanced-error-text">{formErrors.username[0]}</span>}
                </div>

                <div className="enhanced-form-group">
                  <label htmlFor="password">
                    Password <span className="required-field">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Create password"
                    className={`enhanced-form-input ${formErrors.password ? 'enhanced-error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.password && <span className="enhanced-error-text">{formErrors.password[0]}</span>}
                </div>

                <div className="enhanced-form-group">
                  <label htmlFor="password_confirmation">
                    Confirm Password <span className="required-field">*</span>
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    placeholder="Confirm password"
                    className="enhanced-form-input"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="enhanced-form-actions">
              <button
                type="button"
                className="enhanced-cancel-btn"
                onClick={() => setShowRegisterForm(false)}
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
                    Creating User...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                    </svg>
                    Create User
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

export default RegisterUser;