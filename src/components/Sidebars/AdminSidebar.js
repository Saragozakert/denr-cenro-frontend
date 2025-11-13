import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import {
  TbLayoutDashboard,
  TbCircleCheck,
  TbGasStation,
  TbUserShield,
  TbCar,
  TbSettingsAutomation,
  TbFolderCog,
} from "react-icons/tb";
import '../../assets/Style/Sidebars/AdminSidebar.css';

const AdminSidebar = ({ children, admin, activeItem, onMenuItemClick }) => {
  const [collapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [notificationCount] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    {
      name: "dashboard",
      icon: <TbLayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/admin/dashboard"
    },
    {
      name: "admin",
      icon: <TbFolderCog size={20} />,
      label: "Trip Ticket",
      path: "/admin/dashboard/trip-ticket"
    },
    {
      name: "fuel",
      icon: <TbGasStation size={20} />,
      label: "Gas Slip Request",
      path: "/admin/dashboard/gas-slip-request"
    },
    {
      name: "requesting-party",
      icon: <TbSettingsAutomation size={20} />,
      label: "Requesting Party",
      path: "/admin/dashboard/requesting-party"
    },
    {
      name: "userManagement",
      icon: <TbUserShield size={20} />,
      label: "User Management",
      path: "/admin/dashboard/user-management"
    },
    {
      name: "approve",
      icon: <TbCircleCheck size={20} />,
      label: "Approve Section",
      path: "/admin/dashboard/approve-section"
    },
    {
      name: "typeOfUnit",
      icon: <TbCar size={20} />,
      label: "Type of Unit",
      path: "/admin/dashboard/type-unit"
    }
  ];

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  const handleMenuItemClick = (name, path) => {
    onMenuItemClick(name, path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header">
          <button 
            className="mobile-menu-btn"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <FiMenu size={24} />
          </button>
          
          <button 
            className="mobile-notifications-btn"
            onClick={handleNotifications}
            aria-label="Notifications"
          >
            <FiBell size={20} />
            {notificationCount > 0 && (
              <span className="mobile-notification-count">{notificationCount}</span>
            )}
          </button>
        </div>
      )}

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div 
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`admin-sidebar ${collapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""}`}
        style={{ width: collapsed ? 80 : 250 }}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
        initial={false}
        animate={{
          x: isMobile ? (sidebarOpen ? 0 : -280) : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="sidebar-header">
          {(!collapsed || isHovering || isMobile) && (
            <h2 className="sidebar-title" aria-hidden="true">
            </h2>
          )}
          {isMobile && (
            <button
              className="close-sidebar-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FiX size={20} />
            </button>
          )}
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="menu-item-wrapper"
            >
              <motion.button
                className={`menu-item ${activeItem === item.name ? "active" : ""}`}
                onClick={() => handleMenuItemClick(item.name, item.path)}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="menu-icon">{item.icon}</span>
                {(!collapsed || isHovering || isMobile) && (
                  <span className="menu-label">
                    {item.label}
                  </span>
                )}
                {activeItem === item.name && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
          ))}
        </div>

        <div className="menu-spacer"></div>

        <div className="sidebar-footer">
          <motion.button
            className="notifications-btn"
            onClick={() => handleNotifications()}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="menu-icon"><FiBell size={18} /></span>
            {(!collapsed || isHovering || isMobile) && (
              <span className="menu-label">
                Notifications
              </span>
            )}
            {notificationCount > 0 && (
              <span className="notification-count">{notificationCount}</span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;