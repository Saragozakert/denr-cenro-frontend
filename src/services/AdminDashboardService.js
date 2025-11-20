import { authApi, usersApi, fuelRequestsApi, tripTicketsApi } from '../api/AdminDashboardApi';

export const AdminDashboardService = {
  // Auth services
  async checkAuth() {
    try {
      const response = await authApi.checkAuth();
      return {
        success: true,
        admin: response.data.admin,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Authentication failed',
      };
    }
  },

  async logout() {
    try {
      await authApi.logout();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Logout failed',
      };
    }
  },

  // Data services
  async getTotalUsers() {
    try {
      const response = await usersApi.getUsers();
      return {
        success: true,
        count: response.data.users?.length || 0,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch users',
        count: 0,
      };
    }
  },

  async getPendingApprovals() {
    try {
      const response = await fuelRequestsApi.getFuelRequests();
      if (response.data.success) {
        const pendingCount = response.data.fuelRequests?.filter(
          request => request.status === 'pending'
        ).length || 0;
        return {
          success: true,
          count: pendingCount,
        };
      }
      return { success: false, count: 0 };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch pending approvals',
        count: 0,
      };
    }
  },

  async getApprovedGasSlips() {
    try {
      const response = await fuelRequestsApi.getFuelRequests();
      if (response.data.success) {
        const approvedCount = response.data.fuelRequests?.filter(
          request => request.status === 'approved'
        ).length || 0;
        return {
          success: true,
          count: approvedCount,
        };
      }
      return { success: false, count: 0 };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch approved gas slips',
        count: 0,
      };
    }
  },

  async getSubmittedTripTickets() {
    try {
      const response = await tripTicketsApi.getTripTickets();
      if (response.data.success) {
        const submittedCount = response.data.tripTickets?.filter(
          ticket => ticket.status?.toLowerCase() === 'submitted'
        ).length || 0;
        return {
          success: true,
          count: submittedCount,
        };
      }
      return { success: false, count: 0 };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch submitted trip tickets',
        count: 0,
      };
    }
  },
};