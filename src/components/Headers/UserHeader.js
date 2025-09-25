import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FiBell, FiSettings, FiCalendar, FiMessageSquare, FiClock, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import '../../assets/Style/HeaderDesign/AdminHeader.css'; // Reusing the same CSS

function UserHeader({ user, notifications = 3 }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(function () {
        const timer = setInterval(function () {
            setCurrentTime(new Date());
        }, 1000);

        return function () {
            clearInterval(timer);
        };
    }, []);

    
    const getPageTitle = () => {
        const path = location.pathname;

        if (path.includes('/user/gas-slip')) {
            return "Gas Slip Management";
        } else if (path.includes('/user/trip-ticket')) {
            return "Trip Ticket Management";
        } else if (path.includes('/user/dashboard')) {
            return `Welcome back, ${user?.full_name || "User"}!`;
        }

        return `Welcome back, ${user?.full_name || "User"}!`;
    };

   
    const getPageSubtitle = () => {
        const path = location.pathname;

        if (path.includes('/user/gas-slip')) {
            return "Manage and track your gas slips";
        } else if (path.includes('/user/trip-ticket')) {
            return "Create and monitor your trip tickets";
        } else if (path.includes('/user/dashboard')) {
            return "Here's what's happening with your account today";
        }

        return "Here's what's happening with your account today";
    };

    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem("userToken");

            
            await axios.post("http://localhost:8000/api/user/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

           
            localStorage.removeItem("userToken");

            
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
            localStorage.removeItem("userToken");
            navigate("/");
        }
    };

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1 className="welcome-text">{getPageTitle()}</h1>
                <p className="welcome-subtext">{getPageSubtitle()}</p>
            </div>

            <div className="header-right">
                <div className="time-display">
                    <div className="time-icon">
                        <FiClock size={18} />
                    </div>
                    <div className="time-info">
                        <div className="current-time">{formatTime(currentTime)}</div>
                        <div className="current-date">{formatDate(currentTime)}</div>
                    </div>
                </div>

                <div className="header-actions">
                    <button className="header-btn">
                        <FiCalendar size={18} />
                    </button>

                    <button className="header-btn">
                        <FiMessageSquare size={18} />
                        <span className="notification-badge">2</span>
                    </button>

                    <button className="header-btn notification-btn">
                        <FiBell size={18} />
                        {notifications > 0 && <span className="notification-badge">{notifications}</span>}
                    </button>

                    <button className="header-btn" title="Settings">
                        <FiSettings size={18} />
                    </button>
                </div>

                <div
                    className={`user-profile ${isDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    ref={dropdownRef}
                >
                    <div className="user-info">
                        <span className="username">@{user?.username || user?.full_name || "loading..."}</span>
                        <span className="user-role">
                            User
                            <FiChevronDown size={14} className="dropdown-chevron" />
                        </span>
                    </div>
                    <div className="user-avatar">
                        {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="profile-dropdown">
                            <div className="dropdown-item">
                                <FiUser size={16} />
                                <span>Profile</span>
                            </div>
                            <div className="dropdown-item">
                                <FiSettings size={16} />
                                <span>Settings</span>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item sign-out gradient" onClick={handleSignOut}>
                                <FiLogOut size={16} />
                                <span>Sign Out</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default UserHeader;