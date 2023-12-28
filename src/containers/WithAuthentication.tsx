import * as React from 'react';
import { Navigate } from 'react-router-dom';

interface WithAuthenticationProps {
  children: React.ReactNode;
}

const WithAuthentication = ({ children }: WithAuthenticationProps) => {
  const isAuthenticated = localStorage.getItem('jwt') !== null;

  if (!isAuthenticated)
    return <Navigate to="/login" />

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
};

export default WithAuthentication;