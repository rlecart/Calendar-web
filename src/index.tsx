import * as React from 'react';
import { createRoot } from 'react-dom/client'
import axios from 'axios';

import './style/index.css';

import App from './App';

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);