import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance with common config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  checkAuth: () => apiClient.get("/admin/check-auth"),
  logout: () => apiClient.post("/admin/logout"),
};

// Users API
export const usersApi = {
  getUsers: () => apiClient.get("/admin/users"),
};

// Fuel Requests API
export const fuelRequestsApi = {
  getFuelRequests: () => apiClient.get("/admin/fuel-requests"),
};

// Trip Tickets API
export const tripTicketsApi = {
  getTripTickets: () => apiClient.get("/admin/trip-tickets-admin"),
};

export default apiClient;