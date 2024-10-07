// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App/App';
import reportWebVitals from './reportWebVitals';
import NewHomepage from './component/Homepage/NewHomepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/game/:theme" element={<App />} />
                <Route path="/" element={<NewHomepage />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
