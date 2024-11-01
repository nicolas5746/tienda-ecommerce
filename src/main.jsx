import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from '@/routes/Router';
import 'tailwindcss/tailwind.css';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
);