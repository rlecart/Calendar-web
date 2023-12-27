import * as React from 'react';
import { createRoot } from 'react-dom/client'
import './style/index.css';
import App from './containers/App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);