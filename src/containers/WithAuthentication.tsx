import * as React from 'react';
import { Navigate } from 'react-router-dom';

interface IWithAuthenticationProps {
  children: React.ReactNode;
}

const WithAuthentication = ({ children }: IWithAuthenticationProps) => {
  const isAuthenticated = localStorage.getItem('authentificated') !== null;

  if (!isAuthenticated)
    return <Navigate to="/login" />

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
};

export default WithAuthentication;