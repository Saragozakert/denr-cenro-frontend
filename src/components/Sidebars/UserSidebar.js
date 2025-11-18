import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiBell } from "react-icons/fi";
import {
  TbLayoutDashboard,
  TbGasStation,
  TbCar
} from "react-icons/tb";
import '../../assets/Style/Sidebars/AdminSidebar.css';

const UserSidebar = ({ children, activeItem, onMenuItemClick }) => {
  const [collapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [notificationCount] = useState(10);

  const menuItems = [
    {
      name: "dashboard",
      icon: <TbLayoutDashboard size={20} />, 
      label: "Dashboard",
      path: "/user/dashboard"
    },
    {
      name: "gasSlip",
      icon: <TbGasStation size={20} />,
      label: "Trip Fuel Request",
      path: "/user/dashboard/gas-slip"
    },
    {
      name: "tripTicket",
      icon: <TbCar size={20} />,
      label: "Trip Records",
      path: "/user/dashboard/trip-ticket"
    }
  ];

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  return (
    <div className="admin-dashboard-container">
      <div
        className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}
        style={{ width: collapsed ? 80 : 250 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="sidebar-header">
          {(!collapsed || isHovering) && (
            <h2 className="sidebar-title" aria-hidden="true">
            </h2>
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
                onClick={() => onMenuItemClick(item.name, item.path)}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="menu-icon">{item.icon}</span>
                {(!collapsed || isHovering) && (
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
            {(!collapsed || isHovering) && (
              <span className="menu-label">
                Notifications
              </span>
            )}
            {notificationCount > 0 && (
              <span className="notification-count">{notificationCount}</span>
            )}
          </motion.button>
        </div>
      </div>

      
      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
};

export default UserSidebar;