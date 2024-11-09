import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequireToken = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      // Check if the user is authenticated
      axios
        .get('https://ladx-backend-ts.onrender.com/api/v1/check-auth', {
          withCredentials: true
        })
        .then((res) => {
          if (res.data.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            navigate('/login'); // Redirect to login if not authenticated
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          navigate('/login'); // Redirect to login if any error occurs
        });
    };

    checkAuth();

    // Add listener for login status changes
    window.addEventListener('authChange', checkAuth);

    // Clean up the event listener
    return () => window.removeEventListener('authChange', checkAuth);
  }, [navigate]);

  // Show loading state until authentication is confirmed
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? children : null;
};

export default RequireToken;
