import { requestingPartiesApi, employeesApi, fuelRecordsApi } from '../api/GasSlipRequestApi';

export const GasSlipRequestService = {
  async getRequestingParties() {
    try {
      const response = await requestingPartiesApi.getRequestingParties();
      return {
        success: true,
        requestingParties: response.data.requestingParties || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch requesting parties',
        requestingParties: [],
      };
    }
  },

  async getEmployees() {
    try {
      const response = await employeesApi.getEmployees();
      return {
        success: true,
        employees: response.data.employees || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch employees',
        employees: [],
      };
    }
  },

  async getFuelRecords() {
    try {
      const response = await fuelRecordsApi.getFuelRecords();
      return {
        success: true,
        fuelRecords: response.data.fuelRequests || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch fuel records',
        fuelRecords: [],
      };
    }
  },

  async updateFuelAmount(recordId, amount) {
    try {
      await fuelRecordsApi.updateAmount(recordId, amount); 
      return {
        success: true,
        message: "Gasoline amount updated successfully!",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update gasoline amount',
      };
    }
  },

  async updateFuelStatus(recordId, status) {
    try {
      await fuelRecordsApi.updateStatus(recordId, status); 
      return {
        success: true,
        message: status === 'approved' ? "Successfully Approved" : "Successfully Rejected",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to ${status} fuel request`,
      };
    }
  },
};