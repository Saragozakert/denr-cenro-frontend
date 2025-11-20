import { useState } from "react";
import { FiBell, FiSettings, FiCalendar, FiMessageSquare, FiChevronDown } from "react-icons/fi";
import "../../assets/Style/HeaderDesign/UserHeader.css";

function UserHeader({ onSignOut }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="user-dashboard-top-header">
      <div className="user-header-icons">
        <button 
          className={`user-header-icon-btn ${activeIcon === 'calendar' ? 'active' : ''}`}
          onClick={() => handleIconClick('calendar')}
        >
          <FiCalendar size={18} />
        </button>

        <button 
          className={`user-header-icon-btn ${activeIcon === 'message' ? 'active' : ''}`}
          onClick={() => handleIconClick('message')}
        >
          <FiMessageSquare size={18} />
          <span className="user-notification-badge">2</span>
        </button>

        <button 
          className={`user-header-icon-btn ${activeIcon === 'bell' ? 'active' : ''}`}
          onClick={() => handleIconClick('bell')}
        >
          <FiBell size={18} />
          <span className="user-notification-badge">3</span>
        </button>

        <button 
          className={`user-header-icon-btn ${activeIcon === 'settings' ? 'active' : ''}`}
          onClick={() => handleIconClick('settings')}
          title="Settings"
        >
          <FiSettings size={18} />
        </button>
      </div>

      <div 
        className={`user-user-profile ${isDropdownOpen ? 'active' : ''}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="user-user-info">
          <span className="user-username">User Dashboard</span>
          <span className="user-role">
            Cenro Lianga
            <FiChevronDown size={14} className="user-dropdown-chevron" />
          </span>
        </div>
        <div className="user-avatar">
          U
        </div>

        {isDropdownOpen && (
          <div className="user-dropdown">
            <div className="user-dropdown-item" onClick={onSignOut}>
              <span>Sign Out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHeader;