import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('dashboardToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('dashboardToken');
    localStorage.removeItem('dashboardUser');
    setIsAuthenticated(false);
    navigate('/');
  };

  const getToken = () => {
    return localStorage.getItem('dashboardToken');
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    getToken,
  };
}
