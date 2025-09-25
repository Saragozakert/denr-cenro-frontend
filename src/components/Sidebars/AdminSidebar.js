import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiBell } from "react-icons/fi";
import {
  TbLayoutDashboard,
  TbCircleCheck,
  TbGasStation,
  TbUserShield,
  TbCar,
  TbSettingsAutomation,
  TbFolderCog
} from "react-icons/tb";
import '../../assets/Style/Sidebars/AdminSidebar.css';

const AdminSidebar = ({ children, admin, activeItem, onMenuItemClick }) => {
  const [collapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [notificationCount] = useState(10);

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
      path: ""
    },

    /*
    {
      name: "enforcement",
      icon: <TbKey size={20} />,
      label: "Enforcement Section",
      path: "#"
    },
    */

    {
      name: "fuel",
      icon: <TbGasStation size={20} />,
      label: "Gas Slip Request",
      path: "/admin/dashboard/fuel-tracking"
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

export default AdminSidebar;