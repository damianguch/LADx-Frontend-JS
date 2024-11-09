import { Navigate, useLocation } from 'react-router-dom';

export const setJwToken = (token) => {
  // set token in localStorage
  localStorage.setItem('Token', token);
};

// export const fetchToken = () => {
//   // fetch the token
//   return localStorage.getItem('Token');
// };

// Helper function to retrieve a specific cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Fetch token from cookies instead of localStorage
export const fetchToken = () => {
  return getCookie('token');
};

export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
