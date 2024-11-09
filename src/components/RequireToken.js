import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequireToken = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Check if the user is authenticated
      try {
        const res = axios.get(
          'https://ladx-backend-ts.onrender.com/api/v1/check-auth',
          {
            withCredentials: true
          }
        );

        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state until authentication is confirmed
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default RequireToken;
