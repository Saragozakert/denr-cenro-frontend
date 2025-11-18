import { useState } from "react";
import { FiBell, FiSettings, FiCalendar, FiMessageSquare, FiChevronDown } from "react-icons/fi";
import "../../assets/Style/HeaderDesign/AdminHeader.css";

function AdminHeader({ onSignOut }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="dashboard-top-header">
      <div className="header-icons">
        <button 
          className={`header-icon-btn ${activeIcon === 'calendar' ? 'active' : ''}`}
          onClick={() => handleIconClick('calendar')}
        >
          <FiCalendar size={18} />
        </button>

        <button 
          className={`header-icon-btn ${activeIcon === 'message' ? 'active' : ''}`}
          onClick={() => handleIconClick('message')}
        >
          <FiMessageSquare size={18} />
          <span className="notification-badge">2</span>
        </button>

        <button 
          className={`header-icon-btn ${activeIcon === 'bell' ? 'active' : ''}`}
          onClick={() => handleIconClick('bell')}
        >
          <FiBell size={18} />
          <span className="notification-badge">3</span>
        </button>

        <button 
          className={`header-icon-btn ${activeIcon === 'settings' ? 'active' : ''}`}
          onClick={() => handleIconClick('settings')}
          title="Settings"
        >
          <FiSettings size={18} />
        </button>
      </div>

      <div 
        className={`admin-user-profile ${isDropdownOpen ? 'active' : ''}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="admin-user-info">
          <span className="admin-username">Administrator</span>
          <span className="admin-role">
            Cenro Lianga
            <FiChevronDown size={14} className="dropdown-chevron" />
          </span>
        </div>
        <div className="admin-avatar">
          A
        </div>

        {isDropdownOpen && (
          <div className="admin-dropdown">
            <div className="dropdown-item" onClick={onSignOut}>
              <span>Sign Out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHeader;