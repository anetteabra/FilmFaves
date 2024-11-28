import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/project1">
        <RouterConfig />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Navbar from './components/Navbar/index.tsx'
import Footer from './components/Footer/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) */
