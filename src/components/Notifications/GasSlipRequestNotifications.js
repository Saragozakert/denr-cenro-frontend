import React from 'react';
import '../../assets/Style/NotificationDesign/GasSlipRequestNotifications.css';

const GasSlipRequestNotifications = ({ notifications, onRemoveNotification }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="gas-slip-notification-icon" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="gas-slip-notification-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className="gas-slip-notification-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div className="gas-slip-notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`gas-slip-notification gas-slip-notification-${notification.type}`}
        >
          <div className="gas-slip-notification-content">
            <div className="gas-slip-notification-icon-container">
              {getNotificationIcon(notification.type)}
            </div>
            <span className="gas-slip-notification-message">
              {notification.message}
            </span>
            <button
              className="gas-slip-notification-close"
              onClick={() => onRemoveNotification(notification.id)}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GasSlipRequestNotifications;