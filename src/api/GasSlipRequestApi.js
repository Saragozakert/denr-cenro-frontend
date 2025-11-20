import apiClient from '../api/AdminDashboardApi'; 


export const requestingPartiesApi = {
  getRequestingParties: () => apiClient.get("/admin/requesting-parties"),
};


export const employeesApi = {
  getEmployees: () => apiClient.get("/admin/employees"),
};


export const fuelRecordsApi = {
  getFuelRecords: () => apiClient.get("/admin/fuel-requests"),
  updateAmount: (recordId, amount) => 
    apiClient.put(`/admin/fuel-requests/${recordId}/amount`, { gasoline_amount: amount }),
  updateStatus: (recordId, status) => 
    apiClient.put(`/admin/fuel-requests/${recordId}/status`, { status }),
};