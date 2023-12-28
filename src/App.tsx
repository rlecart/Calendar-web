import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import NotFound from './Views/NotFound';
import Login from './Views/Login';
import Calendar from './Views/Calendar';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Calendar />,
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  }
]);

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
