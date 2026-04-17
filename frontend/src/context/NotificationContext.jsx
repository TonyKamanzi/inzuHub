import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Add new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      read: false,
      ...notification,
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification for immediate feedback
    if (notification.showToast !== false) {
      toast.success(notification.message || notification.title);
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // Remove notification
  const removeNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get notifications by type
  const getNotificationsByType = (type) => {
    return notifications.filter(n => n.type === type);
  };

  // Trigger booking-specific notifications
  const triggerBookingNotification = (type, data) => {
    const notificationTemplates = {
      booking_created: {
        type: "booking_created",
        title: "New Booking Request",
        message: `New booking request for ${data.houseTitle}`,
        icon: "calendar",
        color: "blue",
      },
      booking_approved: {
        type: "booking_approved",
        title: "Booking Approved",
        message: `Your booking for ${data.houseTitle} has been approved!`,
        icon: "check-circle",
        color: "green",
      },
      booking_rejected: {
        type: "booking_rejected",
        title: "Booking Rejected",
        message: `Your booking for ${data.houseTitle} was not approved`,
        icon: "x-circle",
        color: "red",
      },
    };

    const template = notificationTemplates[type];
    if (template) {
      addNotification({
        ...template,
        ...data,
      });
    }
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    getNotificationsByType,
    triggerBookingNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
