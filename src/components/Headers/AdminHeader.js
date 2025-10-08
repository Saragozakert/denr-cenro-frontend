import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FiBell, FiSettings, FiCalendar, FiMessageSquare, FiClock, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import '../../assets/Style/HeaderDesign/AdminHeader.css';

function AdminHeader({ admin, notifications = 3 }) {
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

        if (path.includes('/admin/dashboard/user-management')) {
            return "User Management";
        } else if (path.includes('/admin/dashboard/requesting-party')) {
            return "Requesting Party";
        } else if (path.includes('/admin/dashboard/gas-slip-request')) {
            return "Gas Slip Request";
        } else if (path.includes('/admin/dashboard/type-of-unit')) {
            return "Type of Unit";
        } else if (path.includes('/admin/dashboard')) {
            return "Welcome back, Admin!";
        }

        return "Welcome back, " + (admin?.name || "Admin") + "!";
    };

   
    const getPageSubtitle = () => {
        const path = location.pathname;

        if (path.includes('/admin/dashboard/user-management')) {
            return "Manage user accounts, permissions and status";
        } else if (path.includes('/admin/dashboard/requesting-party')) {
            return "All Employees";
        } else if (path.includes('/admin/dashboard/gas-slip-request')) {
            return "Track Incoming Requests";
        } else if (path.includes('/admin/dashboard/type-of-unit')) {
            return "Manage different types of units in the system";
        } else if (path.includes('/admin/dashboard')) {
            return "Here's what's happening with your dashboard todays";
        }

        return "Here's what's happening with your dashboard today";
    };

    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            
            await axios.post("http://localhost:8000/api/admin/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

           
            localStorage.removeItem("adminToken");

            
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
            localStorage.removeItem("adminToken");
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
                        <span className="username">{admin?.username || "Loading..."}</span>
                        <span className="user-role">
                            Administrator
                            <FiChevronDown size={14} className="dropdown-chevron" />
                        </span>
                    </div>
                    <div className="user-avatar">
                        {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
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

export default AdminHeader;