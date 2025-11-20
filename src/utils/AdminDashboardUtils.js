// Navigation utilities
export const NavigationUtils = {
  handleMenuItemClick: (setActiveItem, navigate) => (itemName, itemPath) => {
    setActiveItem(itemName);
    if (itemPath && itemPath !== "#") {
      navigate(itemPath);
    }
  },

  handleCardClick: (setActiveItem, navigate) => (itemName, itemPath) => {
    NavigationUtils.handleMenuItemClick(setActiveItem, navigate)(itemName, itemPath);
  },
};

// Card data utilities
export const CardDataUtils = {
  generateCardsData: (stats) => [
    {
      title: "Trip Tickets",
      count: stats.submittedTripTickets,
      icon: "🚗",
      path: "/admin/dashboard/trip-ticket",
      priority: 1,
      thisMonth: 8,
      trend: "positive",
      colorType: "success",
      trendValue: "+12%"
    },
    {
      title: "Gas Slip Requests",
      count: stats.approvedGasSlips,
      icon: "⛽",
      path: "/admin/gas-slips",
      priority: 2,
      thisMonth: 12,
      trend: "positive",
      colorType: "info",
      trendValue: "+8%"
    },
    {
      title: "Pending Approvals",
      count: stats.pendingApprovals,
      icon: "✅",
      path: "/admin/approvals",
      priority: 3,
      thisMonth: 8,
      trend: "warning",
      colorType: "warning",
      trendValue: "+3%"
    },
    {
      title: "Total Users",
      count: stats.totalUsers,
      icon: "👤",
      path: "/admin/users",
      priority: 4,
      thisMonth: 23,
      trend: "positive",
      colorType: "secondary",
      trendValue: "+15%"
    }
  ],
};

// Error handling utilities
export const ErrorUtils = {
  handleApiError: (error) => {
    console.error('API Error:', error);
    return error.response?.data?.message || 'An unexpected error occurred';
  },

  isUnauthorized: (error) => {
    return error.response?.status === 401;
  },
};

// Local storage utilities
export const StorageUtils = {
  getToken: () => localStorage.getItem("adminToken"),
  setToken: (token) => localStorage.setItem("adminToken", token),
  removeToken: () => localStorage.removeItem("adminToken"),
  clearAuth: () => {
    localStorage.removeItem("adminToken");
  },
};