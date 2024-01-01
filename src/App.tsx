import * as React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css';

import Login from './Views/Login';
import Calendar from './Views/Calendar';
import SignUp from './Views/SignUp';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
