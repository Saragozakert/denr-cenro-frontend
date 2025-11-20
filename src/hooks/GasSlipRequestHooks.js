import { useState, useCallback } from "react";
import { GasSlipRequestService } from '../services/GasSlipRequestService';

export const useGasSlipRequestData = () => {
  const [fuelRecords, setFuelRecords] = useState([]);
  const [requestingParties, setRequestingParties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [fuelResult, partiesResult, employeesResult] = await Promise.all([
        GasSlipRequestService.getFuelRecords(),
        GasSlipRequestService.getRequestingParties(),
        GasSlipRequestService.getEmployees(),
      ]);

      if (fuelResult.success) setFuelRecords(fuelResult.fuelRecords);
      if (partiesResult.success) setRequestingParties(partiesResult.requestingParties);
      if (employeesResult.success) setEmployees(employeesResult.employees);

      const errors = [fuelResult.error, partiesResult.error, employeesResult.error].filter(Boolean);
      if (errors.length > 0) setError(errors[0]);

    } catch (error) {
      setError('Failed to fetch gas slip request data');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchFuelRecords = useCallback(async () => {
    try {
      const result = await GasSlipRequestService.getFuelRecords();
      if (result.success) {
        setFuelRecords(result.fuelRecords);
      }
      return result;
    } catch (error) {
      console.error('Error refetching fuel records:', error);
      return { success: false, error: 'Failed to refetch fuel records' };
    }
  }, []);

  return {
    fuelRecords,
    requestingParties,
    employees,
    isLoading,
    error,
    fetchAllData,
    refetchFuelRecords,
    setFuelRecords,
  };
};

export const useFuelRecordActions = (refetchFuelRecords, addNotification) => {
  const handleUpdateAmount = useCallback(async (recordId, newAmount) => {
    try {
      const result = await GasSlipRequestService.updateFuelAmount(recordId, newAmount);
      if (result.success) {
        addNotification(result.message, "success");
        await refetchFuelRecords();
      } else {
        addNotification(result.error, "error");
      }
      return result;
    } catch (error) {
      const errorMessage = "Error updating gasoline amount: " + (error.response?.data?.message || error.message);
      addNotification(errorMessage, "error");
      throw error;
    }
  }, [refetchFuelRecords, addNotification]);

  const handleAcceptRecord = useCallback(async (recordId) => {
    try {
      const result = await GasSlipRequestService.updateFuelStatus(recordId, 'approved');
      if (result.success) {
        addNotification(result.message, "success");
        await refetchFuelRecords();
      } else {
        addNotification(result.error, "error");
      }
      return result;
    } catch (error) {
      const errorMessage = "Error approving fuel request: " + (error.response?.data?.message || error.message);
      addNotification(errorMessage, "error");
    }
  }, [refetchFuelRecords, addNotification]);

  const handleRejectRecord = useCallback(async (recordId) => {
    try {
      const result = await GasSlipRequestService.updateFuelStatus(recordId, 'rejected');
      if (result.success) {
        addNotification(result.message, "success");
        await refetchFuelRecords();
      } else {
        addNotification(result.error, "error");
      }
      return result;
    } catch (error) {
      const errorMessage = "Error rejecting fuel request: " + (error.response?.data?.message || error.message);
      addNotification(errorMessage, "error");
    }
  }, [refetchFuelRecords, addNotification]);

  return {
    handleUpdateAmount,
    handleAcceptRecord,
    handleRejectRecord,
  };
};

export const useGasSlipRequestFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState('pending');

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
  };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      message,
      type,
      timestamp: new Date(),
    };

    setNotifications(prev => [...prev, newNotification]);


    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  }, [removeNotification]); 
  return {
    notifications,
    addNotification,
    removeNotification,
  };
};