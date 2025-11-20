import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDashboardService } from './../services/AdminDashboardService';

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/");
          return;
        }

        const result = await AdminDashboardService.checkAuth();
        if (result.success) {
          setAdmin(result.admin);
        } else {
          localStorage.removeItem("adminToken");
          navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
        navigate("/");
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return { admin, authLoading };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    approvedGasSlips: 0,
    submittedTripTickets: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      setError(null);

      const [
        usersResult,
        pendingResult,
        approvedResult,
        tripTicketsResult
      ] = await Promise.all([
        AdminDashboardService.getTotalUsers(),
        AdminDashboardService.getPendingApprovals(),
        AdminDashboardService.getApprovedGasSlips(),
        AdminDashboardService.getSubmittedTripTickets(),
      ]);

      setStats({
        totalUsers: usersResult.count,
        pendingApprovals: pendingResult.count,
        approvedGasSlips: approvedResult.count,
        submittedTripTickets: tripTicketsResult.count,
      });

      // Handle individual errors if needed
      const errors = [
        usersResult.error,
        pendingResult.error,
        approvedResult.error,
        tripTicketsResult.error,
      ].filter(Boolean);

      if (errors.length > 0) {
        setError(errors[0]); // Show first error
      }
    } catch (error) {
      setError('Failed to fetch dashboard statistics');
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  return {
    stats,
    statsLoading,
    error,
    fetchStats,
    refetchStats: fetchStats, // Alias for consistency
  };
};

export const useAdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AdminDashboardService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem("adminToken");
      navigate("/");
    }
  };

  return { handleLogout };
};