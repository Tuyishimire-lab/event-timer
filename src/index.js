import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'))
root.render(<App/>)
reportWebVitals(sendToVercelAnalytics);
