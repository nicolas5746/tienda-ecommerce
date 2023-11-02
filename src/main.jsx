import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from '@routes/Router';
import '@styles/global.sass';
import 'tailwindcss/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);