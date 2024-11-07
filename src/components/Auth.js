import { Navigate, useLocation } from 'react-router-dom';

export const setJwToken = (token) => {
  // set token in localStorage
  localStorage.setItem('Token', token);
};

export const fetchToken = () => {
  // fetch the token
  return localStorage.getItem('Token');
};

export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
