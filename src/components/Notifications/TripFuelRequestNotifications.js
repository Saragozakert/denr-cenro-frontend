import React from 'react';
import '../../assets/Style/NotificationDesign/TripFuelRequestNotifications.css';

const TripFuelRequestNotifications = ({ notifications, onRemoveNotification }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="trip-fuel-notification-icon" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="trip-fuel-notification-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className="trip-fuel-notification-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div className="trip-fuel-notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`trip-fuel-notification trip-fuel-notification-${notification.type}`}
        >
          <div className="trip-fuel-notification-content">
            <div className="trip-fuel-notification-icon-container">
              {getNotificationIcon(notification.type)}
            </div>
            <span className="trip-fuel-notification-message">
              {notification.message}
            </span>
            <button
              className="trip-fuel-notification-close"
              onClick={() => onRemoveNotification(notification.id)}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="trip-fuel-notification-progress"></div>
        </div>
      ))}
    </div>
  );
};

export default TripFuelRequestNotifications;