import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


const root = createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
reportWebVitals(sendToVercelAnalytics);
