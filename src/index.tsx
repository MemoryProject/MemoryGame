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

reportWebVitals();
