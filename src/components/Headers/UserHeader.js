// UserHeader.jsx
import { useState } from "react";
import { FiBell, FiSettings, FiCalendar, FiMessageSquare, FiChevronDown, FiUser } from "react-icons/fi";
import "../../assets/Style/HeaderDesign/UserHeader.css";

function UserHeader({ onSignOut, userData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (userData && userData.full_name) {
      const names = userData.full_name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return 'U';
  };

  // Get user's full name
  const getUserFullName = () => {
    if (userData && userData.full_name) {
      return userData.full_name;
    }
    return 'User Dashboard';
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
          <span className="user-username">{getUserFullName()}</span>
          <span className="user-role">
            Cenro Lianga
            <FiChevronDown size={14} className="user-dropdown-chevron" />
          </span>
        </div>
        <div className="user-avatar">
          {getUserInitials()}
        </div>

        {isDropdownOpen && (
          <div className="user-dropdown">
            {/* Add user info section at the top of dropdown */}
            {userData && (
              <div className="user-dropdown-info">
                <div className="user-dropdown-avatar">
                  {getUserInitials()}
                </div>
                <div className="user-dropdown-details">
                  <span className="user-dropdown-name">{userData.full_name}</span>
                  <span className="user-dropdown-username">@{userData.username}</span>
                </div>
              </div>
            )}
            <div className="user-dropdown-divider"></div>
            <div className="user-dropdown-item" onClick={onSignOut}>
              <FiUser size={16} />
              <span>Sign Out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHeader;