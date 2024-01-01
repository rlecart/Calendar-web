import * as React from 'react';
import { createRoot } from 'react-dom/client'
import './style/index.css';
import App from './App';
import axios from 'axios';

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);